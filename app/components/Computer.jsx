"use client";

import { useState } from "react";
import Image from "next/image";
import fileSystem, { systemInfo } from "../data/fileSystem";

export default function Computer({ isMaximized, handleOpenWindow }) {
  const [currentPath, setCurrentPath] = useState("C:\\");

  const getCurrentDirectory = () => {
    if (currentPath === "C:\\") {
      return fileSystem;
    }

    const parts = currentPath.split("\\").filter(Boolean);
    let current = fileSystem[parts[0] + "\\"];

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

  const handleFolderClick = (item) => {
    if (item.type === "directory") {
      if (
        !item.children ||
        Object.keys(item.children).length === 0 ||
        (currentPath === "C:\\" && item.name === "Bu Bilgisayar")
      ) {
        return;
      }
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

  const currentItems = getCurrentDirectory();

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#c0c0c0] border-b border-win98-border-dark p-2 flex items-center gap-2">
        <button
          onClick={() => setCurrentPath("C:\\")}
          className="win98-button px-16 py-1 flex items-center gap-2"
        >
          <Image
            src="/computer_explorer_cool-5.png"
            alt=""
            width={16}
            height={16}
            className="select-none"
          />
          Bu Bilgisayar
        </button>
      </div>

      <div
        className="flex-grow p-2 overflow-auto"
        style={{
          height: isMaximized ? "calc(100vh - 116px)" : "500px",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Drives Section */}
          <div className="win98-window">
            <div className="win98-title-bar">
              <div className="flex items-center gap-2">
                <Image
                  src="/computer_explorer_cool-5.png"
                  alt=""
                  width={16}
                  height={16}
                  className="select-none"
                />
                <span>Drives and Folders</span>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="mb-4">
                <button
                  onClick={() => {
                    const parts = currentPath.split("\\").filter(Boolean);
                    if (parts.length > 0) {
                      parts.pop();
                      const newPath =
                        parts.length === 0 ? "C:\\" : `${parts.join("\\")}\\`;
                      setCurrentPath(newPath);
                    }
                  }}
                  disabled={currentPath === "C:\\"}
                  className={`win98-button px-2 py-1 ${
                    currentPath === "C:\\" ? "opacity-50" : ""
                  }`}
                >
                  ↑ Back
                </button>
              </div>
              {Object.entries(currentItems).map(([name, item]) => (
                <div key={name} onClick={() => handleFolderClick(item)}>
                  <div className="flex items-start gap-3 p-2 hover:bg-[#000080] hover:text-white cursor-pointer">
                    <Image
                      src={item.icon}
                      alt=""
                      width={32}
                      height={32}
                      className="select-none"
                    />
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm">
                        {item.type}
                        {item.totalSpace &&
                          ` - ${item.freeSpace} free of ${item.totalSpace}`}
                      </p>
                      {item.status && <p className="text-sm">{item.status}</p>}
                    </div>
                  </div>
                  {item.children && Object.keys(item.children).length > 0 ? (
                    <div className="ml-8 border-l-2 border-win98-border-dark pl-4">
                      {Object.entries(item.children).map(
                        ([childName, child]) => (
                          <div
                            key={childName}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFolderClick(child);
                            }}
                            className="flex items-start gap-3 p-2 hover:bg-[#000080] hover:text-white cursor-pointer"
                          >
                            <Image
                              src={child.icon}
                              alt=""
                              width={32}
                              height={32}
                              className="select-none"
                            />
                            <div>
                              <h3 className="font-bold">{child.name}</h3>
                              <p className="text-sm">{child.type}</p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    item.children && (
                      <div className="ml-8 border-l-2 border-win98-border-dark pl-4 p-2 text-gray-600">
                        This folder is empty
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* System Information */}
          <div className="win98-window">
            <div className="win98-title-bar">
              <div className="flex items-center gap-2">
                <Image
                  src="/computer_explorer_cool-5.png"
                  alt=""
                  width={16}
                  height={16}
                  className="select-none"
                />
                <span>System Information</span>
              </div>
            </div>
            <div className="p-4">
              <table className="w-full">
                <tbody>
                  {Object.entries(systemInfo).map(([key, value]) => (
                    <tr
                      key={key}
                      className="hover:bg-[#000080] hover:text-white"
                    >
                      <td className="py-1 px-2 font-bold">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </td>
                      <td className="py-1 px-2">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] border-t border-win98-border-dark p-1 text-sm">
        <span>{currentPath}</span>
      </div>
    </div>
  );
}
