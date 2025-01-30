"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

export default function Window({
  title,
  icon = "/window.svg ",
  onClose,
  children,
  isActive = false,
  onFocus,
  onMinimize = null,
  isMinimized = false,
  showMinimize = true,
  showMaximize = true,
  isFirstWindow = false,
}) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const contentRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    // İlk pencere merkeze, diğerleri kademeli olarak sağa ve aşağıya konumlandırılır
    if (typeof window !== "undefined") {
      const taskbarHeight = 48; // Windows 98 taskbar height
      const windowWidth = 800;
      const windowHeight = 600;
      const maxX = window.innerWidth - windowWidth;
      const maxY = window.innerHeight - windowHeight - taskbarHeight;
      const baseX = Math.min(
        maxX,
        Math.max(0, (window.innerWidth - windowWidth) / 2)
      );
      // Adjust baseY to position windows higher in the viewport
      const baseY = Math.min(
        maxY,
        Math.max(0, (window.innerHeight - windowHeight - taskbarHeight) / 4)
      );

      if (isFirstWindow) {
        setPosition({
          x: baseX,
          y: baseY,
        });
      } else {
        // Her yeni pencere için 30px sağa ve aşağıya kaydır
        const offset = Math.floor(Math.random() * 30) + 30;
        setPosition({
          x: Math.min(maxX, baseX + offset),
          y: Math.min(maxY, baseY + offset),
        });
      }
    }
  }, [isFirstWindow]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      if (!isMaximized) {
        const newX = Math.max(
          0,
          Math.min(
            window.innerWidth - contentRef.current?.offsetWidth || 800,
            position.x + (e.clientX - dragStart.x)
          )
        );
        const newY = Math.max(
          0,
          Math.min(
            window.innerHeight - (contentRef.current?.offsetHeight || 600) - 48,
            position.y + (e.clientY - dragStart.y)
          )
        );

        setPosition({
          x: newX,
          y: newY,
        });
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = "default";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isMaximized, dragStart, position]);

  const handleMouseDown = (e) => {
    if (!isMaximized) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      document.body.style.cursor = "move";
    }
  };

  const handleMinimizeClick = () => {
    onMinimize?.();
  };

  const handleMaximize = () => {
    if (!mounted) return;
    setIsMaximized(!isMaximized);
  };

  if (isMinimized) {
    return null;
  }

  return mounted ? (
    <div
      className={`win98-window fixed select-none ${
        isActive ? "z-[999]" : "z-[100]"
      }`}
      style={{
        top: isMaximized ? 0 : position.y,
        left: isMaximized ? 0 : position.x,
        width: isMaximized ? "100%" : "min(90vw, 800px)",
        height: isMaximized ? `calc(100vh - 48px)` : "auto",
        maxHeight: isMaximized ? `calc(100vh - 48px)` : "calc(90vh - 48px)",
        transition: isDragging ? "none" : "all 0.2s ease",
      }}
      onClick={() => !isActive && onFocus?.()}
    >
      <div
        className={`win98-title-bar ${
          isActive ? "bg-win98-title-bar" : "bg-win98-border-dark"
        } cursor-move select-none`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <Image
            src={icon}
            alt=""
            width={16}
            height={16}
            className="select-none"
          />
          <span className="select-none">{title}</span>
        </div>
        <div className="flex gap-1">
          {showMinimize && (
            <button
              onClick={handleMinimizeClick}
              className="win98-button px-4 py-2 text-base font-bold"
              title="Minimize"
            >
              _
            </button>
          )}
          {showMaximize && (
            <button
              onClick={handleMaximize}
              className="win98-button px-4 py-2 text-base font-bold"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? "❐" : "□"}
            </button>
          )}
          <button
            onClick={onClose}
            className="win98-button px-4 py-2 text-base font-bold"
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="win98-window-content">
        <div
          ref={contentRef}
          className="overflow-y-auto select-none"
          style={{
            height: isMaximized ? "calc(100vh - 76px)" : "100%",
            maxHeight: isMaximized ? "calc(100vh - 76px)" : "100%",
          }}
        >
          <div className="h-full">
            {React.isValidElement(children)
              ? React.cloneElement(children, { isMaximized })
              : children}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
