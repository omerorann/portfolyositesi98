"use client";

import { useState } from "react";
import Image from "next/image";
import HeroSection from "./Hero";
import ProjectsPreview from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";

export default function MobileLayout() {
  const [activeSection, setActiveSection] = useState("about");

  const sections = [
    {
      id: "about",
      title: "About Me",
      icon: "/user_world-1.png",
      component: <HeroSection />,
    },
    {
      id: "skills",
      title: "Skills",
      icon: "/skills.png",
      component: <Skills />,
    },
    {
      id: "projects",
      title: "Projects",
      icon: "/web_file_set-4.png",
      component: <ProjectsPreview />,
    },
    {
      id: "contact",
      title: "Contact",
      icon: "/contact.png",
      component: <Contact />,
    },
  ];

  const socialLinks = [
    {
      id: "github",
      title: "GitHub",
      icon: "/github.svg",
      url: "https://github.com/omeroran",
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      icon: "/linkedin.svg",
      url: "https://linkedin.com/in/omeroran",
    },
  ];

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
      <div className="flex-grow p-3 space-y-5 max-w-2xl mx-auto w-full">
        {/* Active Section Window */}
        <div className="win98-window bg-[#c0c0c0] overflow-hidden shadow-win98-out">
          <div className="win98-title-bar bg-[#000080] text-white">
            <div className="flex items-center gap-3 px-2 py-1">
              <div className="relative w-5 h-5 flex-shrink-0">
                <Image
                  src={
                    sections.find((s) => s.id === activeSection)?.icon ||
                    "/window.svg"
                  }
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold">
                {sections.find((s) => s.id === activeSection)?.title}
              </span>
            </div>
          </div>
          <div className="p-4 overflow-auto max-h-[calc(100vh-280px)] bg-[#c0c0c0]">
            {sections.find((s) => s.id === activeSection)?.component}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`win98-button py-3 px-4 flex items-center gap-3 transition-shadow duration-100 ${
                activeSection === section.id
                  ? "shadow-win98-in bg-[#c0c0c0]"
                  : "shadow-win98-out hover:shadow-win98-out-lg active:shadow-win98-in"
              }`}
            >
              <div className="relative w-6 h-6 flex-shrink-0">
                <Image
                  src={section.icon}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold">{section.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
