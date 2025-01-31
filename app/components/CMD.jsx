"use client";

import { useState, useEffect, useRef } from "react";

export default function CMD({ isMaximized }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const handleCommand = (command) => {
    const cmd = command.trim().toLowerCase();
    let output = "";

    switch (cmd) {
      case "help":
        output = `-----------------------------------------------------------------------
  Kullanılabilir komutlar:

help - Komutlar hakkında yardım
cls - Ekranı temizle
dir - Dizin içeriğini listele
ver - OS sürümünü göster
date - Güncel tarihi göster
time - Güncel saati göster
echo - Mesaj görüntüle
-----------------------------------------------------------------------
  Portfolyo komutları:

about - Hakkımda bölümünü görüntüle
skills - Teknik yeteneklerimi listele
projects - Projelerimi görüntüle
contact - İletişim bilgilerini göster
github - GitHub profilini aç
linkedin - LinkedIn profilini aç
-----------------------------------------------------------------------`;
        break;
      case "about":
        output =
          "Merhaba, Ben Ömer Oran - Frontend Developer\n\nModern web teknolojileri ile kullanıcı dostu arayüzler geliştiriyorum. React, Next.js ve Tailwind CSS konularında çalışıyorum.";
        break;
      case "skills":
        output =
          "Teknik Yetenekler:\n\n- Frontend: React, Next.js, Tailwind CSS\n- Backend: Node.js\n- Veritabanı: Postges, MSSQL, Firebase\n- Araçlar: Git, Github, Figma\n- Diğer: RESTful APIs, Responsive Design";
        break;
      case "projects":
        output =
          "Öne Çıkan Projeler:\n\n1. Portfolio 98 - Windows 98 temalı portfolyo websitesi\n2. Diğer projelerimi görmek için 'github' komutunu kullanabilirsiniz.";
        break;
      case "contact":
        output =
          "İletişim Bilgileri:\n\nGitHub: github.com/omerorann\nLinkedIn: linkedin.com/in/omeroran\n\nProje fikirlerinizi paylaşmak veya bir konuda yardım almak için benimle iletişime geçebilirsiniz.";
        break;
      case "cls":
        setHistory([]);
        return;
      case "dir":
        output = `C: sürücüsündeki birim PORTFOLIO98
Birim Seri Numarası: 1337-1998

C:\Desktop dizini

05/11/1998  15:14    <DIR>          .
05/11/1998  15:14    <DIR>          ..
05/11/1998  15:14    <DIR>          Hakkımda
05/11/1998  15:14    <DIR>          Yetenekler
05/11/1998  15:14    <DIR>          Projeler
05/11/1998  15:14    <DIR>          İletişim
05/11/1998  15:14    <DIR>          Komut Satırı
05/11/1998  15:14    <DIR>          Internet Explorer
05/11/1998  15:14    <DIR>          GitHub
05/11/1998  15:14    <DIR>          LinkedIn
               0 Dosya              0 bayt
              10 Dir   2,147,483,648 bayt boş`;
        break;
      case "ver":
        output = "Portfolio 98 [Sürüm 4.10.1998]";
        break;
      case "date":
        output = new Date().toLocaleDateString("tr-TR");
        break;
      case "time":
        output = new Date().toLocaleTimeString("tr-TR");
        break;
      case "github":
        window.open("https://github.com/omeroran", "_blank");
        output = "GitHub profili açılıyor...";
        break;
      case "linkedin":
        window.open("https://linkedin.com/in/omeroran", "_blank");
        output = "LinkedIn profili açılıyor...";
        break;
      default:
        if (cmd.startsWith("echo ")) {
          output = cmd.substring(5);
        } else if (cmd !== "") {
          output = `'${cmd}' dahili veya harici bir komut olarak tanınmıyor,\nçalıştırılabilir program veya toplu iş dosyası değil.`;
        }
    }

    setHistory((prev) => [
      ...prev,
      { type: "input", text: command },
      { type: "output", text: output },
    ]);
    setCommandHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);
    setInput("");
  };

  useEffect(() => {
    setHistory([
      {
        type: "output",
        text: "Portfolio 98 [Sürüm 4.10.1998]\nTelif Hakkı © Microsoft Corp 1981-1998\n",
      },
    ]);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div
      className="bg-black text-white font-mono p-4 flex flex-col cmd-container overflow-hidden"
      onClick={() => inputRef.current?.focus()}
      style={{
        height: isMaximized ? "100%" : "400px",
        width: isMaximized ? "100%" : "100%",
      }}
    >
      <div
        className="flex-grow overflow-y-auto scrollbar-hide"
        ref={containerRef}
      >
        {history.map((item, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {item.type === "input" ? (
              <div>
                <span>C:\Desktop{">"}</span>
                {item.text}
              </div>
            ) : (
              <div>{item.text}</div>
            )}
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <span>C:\Desktop{">"}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-black text-white font-mono outline-none ml-1"
          autoFocus
        />
      </div>
    </div>
  );
}
