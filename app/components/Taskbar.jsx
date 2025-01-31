"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import fileSystem from "../data/fileSystem";

export default function TaskBar({
  openWindows = [],
  activeWindow,
  onWindowClick,
}) {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const startMenuRef = useRef(null);

  const fileSystemData = fileSystem["C:\\"].children.Desktop.children;

  const desktopApps = Object.values(fileSystemData)
    .filter((item) => item.type === "application" && item.appType !== "browser")
    .map((app) => ({
      id: app.appType,
      title: app.name,
      icon: app.icon,
    }));

  const systemApps = Object.values(fileSystemData)
    .filter((item) => item.type === "link" || item.appType === "browser")
    .map((app) => ({
      id: app.type === "link" ? app.name.toLowerCase() : app.appType,
      title: app.name,
      icon: app.icon,
      url: app.url,
    }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        startMenuRef.current &&
        !startMenuRef.current.contains(event.target) &&
        !event.target.closest("button[data-start-button]")
      ) {
        setIsStartMenuOpen(false);
      }
    };

    if (isStartMenuOpen) {
      // Bir frame bekleyip sonra event listener'ı ekle
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isStartMenuOpen]);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#c0c0c0] border-t-2 border-[#ffffff] shadow-[inset_-1px_-1px_#000000] flex items-center p-1 gap-1 z-[9999]">
      {/* Start Button */}
      <button
        data-start-button
        onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
        className={`h-[90%] px-2 flex items-center gap-1 bg-[#c0c0c0] border-2 select-none
          transition-colors duration-75
          ${
            isStartMenuOpen
              ? "border-t-[#808080] border-l-[#808080] border-b-[#ffffff] border-r-[#ffffff] bg-[#808080] shadow-[inset_1px_1px_#000000,inset_-1px_-1px_#ffffff]"
              : "border-t-[#ffffff] border-l-[#ffffff] border-b-[#000000] border-r-[#000000] hover:active:border-t-[#808080] hover:active:border-l-[#808080] hover:active:border-b-[#ffffff] hover:active:border-r-[#ffffff] hover:active:shadow-[inset_1px_1px_#000000,inset_-1px_-1px_#ffffff]"
          }`}
      >
        <Image
          src="/windows-0.png"
          alt="Windows 98"
          width={16}
          height={16}
          className="select-none"
        />
        <span className="font-bold">Start</span>
      </button>

      {/* Start Menu */}
      {isStartMenuOpen && (
        <div
          ref={startMenuRef}
          className="win98-start-menu absolute left-0 bottom-12 w-64 bg-gradient-to-r from-[#000080] to-[#1084d0] border-2 border-t-[#ffffff] border-l-[#ffffff] border-b-[#000000] border-r-[#000000] shadow-win98-out z-[9999] origin-bottom"
          style={{
            animation: "slideUp 100ms ease-out",
          }}
        >
          <div className="w-8 bg-gradient-to-b from-[#808080] to-[#c0c0c0] absolute left-0 top-0 bottom-0 border-r border-r-[#000000] flex flex-col justify-between py-2">
            <Image
              src="/user_computer-1.png"
              alt="Windows 98"
              width={24}
              height={24}
              className="mx-auto"
            />
            <Image
              src="/menu.png"
              alt="Menu"
              width={24}
              height={24}
              className="mx-auto"
            />
          </div>
          <div className="pl-10 py-1 divide-y divide-[#808080]">
            <div className="pb-2">
              {desktopApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    onWindowClick(app.id);
                    setIsStartMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-1 flex items-center gap-3 hover:bg-[#000080] hover:text-white active:bg-[#000080] active:text-white focus:outline-none transition-colors duration-75 ${
                    activeWindow === app.id
                      ? "bg-[#000080] text-white"
                      : "text-white"
                  }`}
                >
                  <div className="w-5 h-5 relative flex-shrink-0">
                    <Image src={app.icon} alt="" fill className="select-none" />
                  </div>
                  <span className="whitespace-nowrap">{app.title}</span>
                </button>
              ))}
            </div>
            <div className="py-2">
              {systemApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    if (app.url) {
                      window.open(app.url, "_blank");
                    } else {
                      onWindowClick(app.id);
                    }
                    setIsStartMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-1 flex items-center gap-3 hover:bg-[#000080] hover:text-white text-white"
                >
                  <div className="w-5 h-5 relative flex-shrink-0">
                    <Image src={app.icon} alt="" fill className="select-none" />
                  </div>
                  <span className="whitespace-nowrap">{app.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="h-full border-l-2 border-[#808080] mx-1"></div>

      {/* Open Windows */}
      <div className="flex gap-1 overflow-x-auto">
        {openWindows?.map((window) => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={`h-[90%] px-2 flex items-center gap-1 min-w-[150px] max-w-[200px] select-none
              ${
                window.isMinimized
                  ? "opacity-50"
                  : activeWindow === window.id
                  ? "bg-[#808080]"
                  : "bg-[#c0c0c0]"
              }
              border-2 transition-all duration-75 ${
                window.isMinimized
                  ? "border-t-[#ffffff] border-l-[#ffffff] border-b-[#000000] border-r-[#000000]"
                  : activeWindow === window.id
                  ? "border-t-[#808080] border-l-[#808080] border-b-[#ffffff] border-r-[#ffffff] shadow-[inset_1px_1px_#000000,inset_-1px_-1px_#ffffff]"
                  : "border-t-[#ffffff] border-l-[#ffffff] border-b-[#000000] border-r-[#000000] hover:active:border-t-[#808080] hover:active:border-l-[#808080] hover:active:border-b-[#ffffff] hover:active:border-r-[#ffffff] hover:active:shadow-[inset_1px_1px_#000000,inset_-1px_-1px_#ffffff]"
              }`}
          >
            <Image
              src={window.icon}
              alt=""
              width={16}
              height={16}
              className="select-none"
            />
            <span className="truncate">{window.title}</span>
          </button>
        ))}
      </div>

      {/* Clock */}
      <div className="h-[90%] px-2 ml-auto flex items-center border-2 border-t-[#808080] border-l-[#808080] border-b-[#ffffff] border-r-[#ffffff] bg-[#c0c0c0] text-sm">
        {currentTime.toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
}
