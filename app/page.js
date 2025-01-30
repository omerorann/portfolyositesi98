"use client";

import { useState } from "react";
import DesktopIcon from "./components/DesktopIcon";
import Window from "./components/Window";
import TaskBar from "./components/Taskbar";
import HeroSection from "./components/Hero";
import ProjectsPreview from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Browser from "./components/Browser";
import ContextMenu from "./components/ContextMenu";
import LoadingScreen from "./components/LoadingScreen";
import CMD from "./components/CMD";
import Computer from "./components/Computer";
import Explorer from "./components/Explorer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenWindow = (type, path) => {
    const icon = desktopIcons.find((icon) => icon.type === type);
    if (icon) {
      icon.initialPath = path;
    }
    if (!openWindows.includes(type)) {
      setOpenWindows((prev) => [...prev, type]);
    }
    setMinimizedWindows((prev) => prev.filter((w) => w !== type));
    setActiveWindow(type);
  };

  const desktopIcons = [
    {
      type: "computer",
      icon: "/computer_explorer_cool-5.png",
      label: "My Computer",
      children: (
        <Computer handleOpenWindow={handleOpenWindow} isMaximized={false} />
      ),
    },
    {
      type: "explorer",
      icon: "/dir.png",
      label: "Windows Explorer",
      children: <Explorer />,
    },
    {
      type: "about",
      icon: "/user_world-1.png",
      label: "About Me",
      children: <HeroSection />,
    },
    {
      type: "cmd",
      icon: "/console_prompt-0.png",
      label: "Command Prompt",
      children: <CMD />,
    },
    {
      type: "skills",
      icon: "/skills.png",
      label: "Skills",
      children: <Skills />,
    },
    {
      type: "projects",
      icon: "/web_file_set-4.png",
      label: "Projects",
      children: <ProjectsPreview />,
    },
    {
      type: "contact",
      icon: "/contact.png",
      label: "Contact",
      children: <Contact />,
    },
    {
      type: "browser",
      icon: "/msie1-1.png",
      label: "Internet Explorer",
      children: <Browser />,
    },
    {
      type: "github",
      icon: "/github.svg",
      label: "Github",
      url: "http://github.com/omerorann",
      isLink: true,
    },
    {
      type: "linkedin",
      icon: "/linkedin.svg",
      label: "LinkedIn",
      url: "http://linkedin.com/in/omeroran/",
      isLink: true,
    },
  ];

  const [openWindows, setOpenWindows] = useState(["about"]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [activeWindow, setActiveWindow] = useState("about");
  const [minimizedWindows, setMinimizedWindows] = useState([]);

  const handleIconClick = (type, e) => {
    e.stopPropagation();
    setSelectedIcon(type);
  };

  const handleIconDoubleClick = (type, e) => {
    e.stopPropagation();
    const icon = desktopIcons.find((icon) => icon.type === type);
    if (icon.isLink && icon.url) {
      window.open(icon.url, "_blank", "noopener,noreferrer");
      return;
    }

    handleOpenWindow(type);
  };

  const handleCloseWindow = (type) => {
    setOpenWindows((prev) => prev.filter((window) => window !== type));
    setMinimizedWindows((prev) => prev.filter((w) => w !== type));
    if (activeWindow === type) {
      const remainingWindows = openWindows.filter((w) => w !== type);
      setActiveWindow(remainingWindows[remainingWindows.length - 1] || null);
    }
  };

  const handleMinimizeWindow = (type) => {
    setMinimizedWindows((prev) => [...prev, type]);
    setActiveWindow(null);
  };

  const handleWindowFocus = (type) => {
    if (minimizedWindows.includes(type)) {
      setMinimizedWindows((prev) => prev.filter((w) => w !== type));
      setActiveWindow(type);
    } else {
      setActiveWindow(type);
    }
  };

  const handleBackgroundClick = () => {
    setSelectedIcon(null);
  };

  const openWindowsData = openWindows
    .map((type) => {
      const icon = desktopIcons.find((icon) => icon.type === type);
      if (!icon) {
        console.error("Icon not found for type:", type);
        return null;
      }
      return {
        id: icon.type,
        icon: icon.icon,
        title: icon.label,
        isMinimized: minimizedWindows.includes(type),
      };
    })
    .filter(Boolean);

  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.pageX,
      y: e.pageY,
    });
  };

  const contextMenuItems = [
    {
      label: "View",
      icon: "/window.svg",
      onClick: () => handleOpenWindow(selectedIcon),
      disabled: !selectedIcon,
    },
    {
      label: "Refresh",
      icon: "/window.svg",
      onClick: () => window.location.reload(),
    },
  ];

  return (
    <>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <div
            className="relative h-screen overflow-hidden cursor-default select-none"
            onClick={handleBackgroundClick}
            onContextMenu={handleContextMenu}
          >
            {/* Desktop Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 p-2 w-fit">
              {desktopIcons.map((icon) => (
                <div
                  key={icon.type}
                  onClick={(e) => handleIconClick(icon.type, e)}
                  className="w-24"
                >
                  <DesktopIcon
                    icon={icon.icon}
                    label={icon.label}
                    isSelected={selectedIcon === icon.type}
                    onDoubleClick={(e) => handleIconDoubleClick(icon.type, e)}
                  />
                </div>
              ))}
            </div>

            {contextMenu.show && (
              <ContextMenu
                x={contextMenu.x}
                y={contextMenu.y}
                onClose={() => setContextMenu({ show: false, x: 0, y: 0 })}
                menuItems={contextMenuItems}
              />
            )}

            {/* Windows */}
            {openWindows.map((type) => {
              const window = desktopIcons.find((icon) => icon.type === type);
              return (
                <Window
                  key={type}
                  title={window.label}
                  icon={window.icon}
                  isActive={activeWindow === type}
                  onClose={() => handleCloseWindow(type)}
                  onFocus={() => handleWindowFocus(type)}
                  onMinimize={() => handleMinimizeWindow(type)}
                  showMaximize={!["about", "contact"].includes(type)}
                  isMinimized={minimizedWindows.includes(type)}
                  type={type}
                  isFirstWindow={type === "about"}
                  className="transform transition-transform"
                >
                  {type === "explorer" ? (
                    <Explorer
                      handleOpenWindow={handleOpenWindow}
                      initialPath={window.initialPath || "C:\\"}
                    />
                  ) : (
                    window.children
                  )}
                </Window>
              );
            })}
          </div>

          {/* TaskBar */}
          <TaskBar
            openWindows={openWindowsData}
            activeWindow={activeWindow}
            onWindowClick={handleOpenWindow}
          />
        </>
      )}
    </>
  );
}
