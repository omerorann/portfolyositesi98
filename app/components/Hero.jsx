"use client";

import Image from "next/image";
import { createRoot } from "react-dom/client";
import Window from "./Window";
import Contact from "./Contact";

export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center h-full overflow-auto">
      <div className="win98-window w-40 h-40 overflow-hidden flex-shrink-0">
        <div className="win98-title-bar py-1">
          <span className="text-xs">profile.jpg</span>
        </div>
        <div className="relative w-full h-[85%]">
          <Image
            src="/profile.webp"
            alt="Profil Fotoğrafı"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div>
        <h1 className="text-2xl mb-4 border-b border-win98-border-dark pb-2">
          Merhaba, Ben Ömer Oran
        </h1>
        <p className="mb-2">Frontend Developer & UI/UX Meraklısı</p>
        <p className="text-sm">
          Modern web teknolojileri ile kullanıcı dostu arayüzler geliştiriyorum.
          React, Next.js ve Tailwind CSS konularında uzmanım.
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-4 md:mt-0 w-full md:w-40">
        <a
          href="http://github.com/omerorann"
          target="_blank"
          rel="noopener noreferrer"
          className="win98-button flex items-center gap-1 p-1 justify-center text-sm"
        >
          <Image src="/github.svg" alt="" width={16} height={16} />
          Github
        </a>
        <a
          href="http://linkedin.com/in/omeroran/"
          target="_blank"
          rel="noopener noreferrer"
          className="win98-button flex items-center gap-1 p-1 justify-center text-sm"
        >
          <Image src="/linkedin.svg" alt="" width={16} height={16} />
          LinkedIn
        </a>
        <button
          onClick={() => {
            const contactWindow = document.createElement("div");
            contactWindow.id = "contact-window";
            document.body.appendChild(contactWindow);

            const root = createRoot(contactWindow);
            root.render(
              <Window
                title="Contact.exe"
                icon="/contact.png"
                isActive={true}
                showMinimize={false}
                showMaximize={false}
                onClose={() => {
                  root.unmount();
                  document.body.removeChild(contactWindow);
                }}
              >
                <Contact />
              </Window>
            );
          }}
          className="win98-button flex items-center gap-1 p-1 justify-center text-sm"
        >
          <Image src="/phone.png" alt="" width={16} height={16} />
          İletişim
        </button>
        <a
          href="/cv.pdf"
          download
          className="win98-button flex items-center gap-1 p-1 justify-center text-sm"
        >
          <Image src="/cv.png" alt="" width={16} height={16} />
          CV İndir
        </a>
      </div>
    </div>
  );
}
