"use client";

import { useState, useEffect } from "react";
import MobileLayout from "./components/MobileLayout";
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
import fileSystem from "./data/fileSystem";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [openWindows, setOpenWindows] = useState(["about"]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [activeWindow, setActiveWindow] = useState("about");
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  if (isMobile) {
    return <MobileLayout />;
  }

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

  const desktopIcons = Object.entries(
    fileSystem["C:\\"].children.Desktop.children
  ).map(([key, item]) => {
    const icon = {
      type: item.appType || key.toLowerCase(),
      icon: item.icon,
      label: item.name,
    };

    if (item.type === "link") {
      icon.url = item.url;
      icon.isLink = true;
    } else if (item.type === "application") {
      switch (item.appType) {
        case "about":
          icon.children = <HeroSection handleOpenWindow={handleOpenWindow} />;
          break;
        case "skills":
          icon.children = <Skills />;
          break;
        case "projects":
          icon.children = <ProjectsPreview />;
          break;
        case "contact":
          icon.children = <Contact />;
          break;
        case "cmd":
          icon.children = <CMD />;
          break;
        case "browser":
          icon.children = <Browser />;
          break;
      }
    }

    return icon;
  });

  // Add system icons
  desktopIcons.unshift(
    {
      type: "computer",
      icon: fileSystem["C:\\"].icon,
      label: fileSystem["C:\\"].name,
      children: (
        <Computer handleOpenWindow={handleOpenWindow} isMaximized={false} />
      ),
    },
    {
      type: "explorer",
      icon: "/dir.png",
      label: "Dosya Gezgini",
      children: <Explorer />,
    }
  );

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
