"use client";

import Image from "next/image";
import { playSound, SOUNDS } from "../utils/sounds";

export default function DesktopIcon({
  icon,
  label,
  isSelected,
  onClick,
  onDoubleClick,
}) {
  const handleClick = (e) => {
    playSound(SOUNDS.CLICK);
    onClick?.(e);
  };

  const handleDoubleClick = (e) => {
    playSound(SOUNDS.CLICK);
    onDoubleClick?.(e);
  };

  return (
    <div
      className={`flex flex-col items-center w-24 p-1 cursor-pointer ${
        isSelected ? "bg-win98-title-bar" : ""
      }`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="relative w-8 h-8 mb-1">
        <Image
          src={icon}
          alt=""
          fill
          className={isSelected ? "text-white" : "text-win98-text"}
          draggable={false}
        />
      </div>
      <span
        className={`text-xs text-center text-white whitespace-pre-wrap ${
          isSelected ? "bg-win98-title-bar" : ""
        }`}
      >
        {label}
      </span>
    </div>
  );
}
