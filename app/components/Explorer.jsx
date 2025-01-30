"use client";

import { useState } from "react";
import Image from "next/image";
import fileSystem from "../data/fileSystem";

export default function Explorer({
  isMaximized,
  initialPath = "C:\\",
  handleOpenWindow,
}) {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const urlParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const pathFromUrl = urlParams?.get("path");

  const getCurrentDirectory = () => {
    if (currentPath === "C:\\") {
      return fileSystem["C:\\"].children;
    }

    const parts = currentPath.split("\\").filter(Boolean);
    let current = fileSystem["C:\\"];

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (!current.children || !current.children[part]) {
        console.error(`Invalid path: ${part} not found or has no children`);
        return {};
      }
      current = current.children[part];
    }
    return current.children || {};
  };

  const handleNavigate = (item) => {
    if (item.type === "directory") {
      setCurrentPath(`${currentPath}${item.name}\\`);
    } else if (item.type === "link" && item.url) {
      window.open(item.url, "_blank");
    } else if (
      item.type === "application" &&
      item.appType &&
      handleOpenWindow
    ) {
      handleOpenWindow(item.appType);
    }
  };

  const handleBack = () => {
    const parts = currentPath.split("\\").filter(Boolean);
    if (parts.length > 0) {
      parts.pop();
      setCurrentPath(`${parts.join("\\")}\\`);
    }
  };

  const currentItems = getCurrentDirectory();

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#c0c0c0] border-b border-win98-border-dark p-2 flex items-center gap-2">
        <button
          onClick={handleBack}
          disabled={currentPath === "C:\\"}
          className={`win98-button px-3 py-1 ${
            currentPath === "C:\\" ? "opacity-50" : ""
          }`}
        >
          Back
        </button>
        <span className="px-2 border-2 border-win98-border-dark bg-white flex-grow">
          {currentPath}
        </span>
      </div>

      <div
        className="flex-grow p-2 overflow-auto"
        style={{
          height: isMaximized ? "calc(100vh - 116px)" : "500px",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(currentItems).map(([name, item]) => (
            <div
              key={name}
              onClick={() => handleNavigate(item)}
              className="flex items-center gap-2 p-2 hover:bg-[#000080] hover:text-white cursor-pointer"
            >
              <Image
                src={item.icon}
                alt=""
                width={32}
                height={32}
                className="select-none"
              />
              <div>
                <span>{item.name}</span>
                <div className="text-sm">{item.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#c0c0c0] border-t border-win98-border-dark p-1 text-sm">
        {Object.keys(currentItems).length} items
      </div>
    </div>
  );
}
