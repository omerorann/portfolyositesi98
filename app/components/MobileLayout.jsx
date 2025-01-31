"use client";

import { useState } from "react";
import Image from "next/image";
import HeroSection from "./Hero";
import ProjectsPreview from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";
import fileSystem from "../data/fileSystem";

export default function MobileLayout() {
  const [activeSection, setActiveSection] = useState("about");

  const fileSystemData = fileSystem["C:\\"].children.Desktop.children;

  const sections = Object.values(fileSystemData)
    .filter(
      (item) =>
        item.type === "application" &&
        !item.url &&
        item.appType !== "cmd" &&
        item.appType !== "browser"
    )
    .map((app) => ({
      id: app.appType,
      title: app.name,
      icon: app.icon,
      component:
        app.appType === "about" ? (
          <HeroSection />
        ) : app.appType === "skills" ? (
          <Skills />
        ) : app.appType === "projects" ? (
          <ProjectsPreview />
        ) : app.appType === "contact" ? (
          <Contact />
        ) : null,
    }));

  const socialLinks = Object.values(fileSystemData)
    .filter((item) => item.type === "link")
    .map((link) => ({
      id: link.name.toLowerCase(),
      title: link.name,
      icon: link.icon,
      url: link.url,
    }));

  return (
    <div className="min-h-screen bg-[#008080] flex flex-col">
      {/* Header */}
      <div className="bg-[#c0c0c0] border-b-2 border-win98-border-dark p-3 shadow-win98-out flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image
              src="/windows-0.png"
              alt="Windows 98"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[#000080]">Portfolio 98</span>
        </h1>
        <div className="flex gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="win98-button py-1 px-2 flex items-center gap-2 shadow-win98-out hover:shadow-win98-out-lg active:shadow-win98-in transition-shadow duration-100"
            >
              <div className="relative w-4 h-4 flex-shrink-0">
                <Image src={link.icon} alt="" fill className="object-contain" />
              </div>
              <span className="font-bold text-sm">{link.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow p-3 space-y-8 max-w-2xl mx-auto w-full overflow-y-auto">
        {sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className="win98-window bg-[#c0c0c0] overflow-hidden shadow-win98-out"
          >
            <div className="win98-title-bar bg-[#000080] text-white">
              <div className="flex items-center gap-3 px-2 py-1">
                <div className="relative w-5 h-5 flex-shrink-0">
                  <Image
                    src={section.icon}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-bold">{section.title}</span>
              </div>
            </div>
            <div className="p-4">{section.component}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
