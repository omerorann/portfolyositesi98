"use client";

import Image from "next/image";

export default function HeroSection({ handleOpenWindow }) {
  const handleContactClick = () => {
    if (window.innerWidth <= 768) {
      const contactSection = document.querySelector("#contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      handleOpenWindow("contact");
    }
  };

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
        <p className="mb-2">Frontend Developer</p>
        <p className="text-sm">
          Modern web teknolojileri ile kullanıcı dostu arayüzler geliştiriyorum.
          React, Next.js ve Tailwind CSS konularında çalışıyorum.
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
          onClick={handleContactClick}
          className="win98-button flex items-center gap-1 p-1 justify-center text-sm"
        >
          <Image src="/phone.png" alt="" width={16} height={16} />
          İletişim
        </button>
      </div>
    </div>
  );
}
