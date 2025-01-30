"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function ContextMenu({ x, y, onClose, menuItems }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed bg-[#c0c0c0] border-2 border-win98-border-dark shadow-win98-out z-[9999] min-w-[200px]"
      style={{
        left: x,
        top: y,
      }}
    >
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.onClick();
            onClose();
          }}
          className="w-full px-6 py-1 text-left flex items-center gap-2 hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={item.disabled}
        >
          {item.icon && (
            <Image
              src={item.icon}
              alt=""
              width={16}
              height={16}
              className="select-none"
            />
          )}
          <span className="whitespace-nowrap">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
