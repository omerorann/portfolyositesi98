"use client";

import { useState, useEffect, useRef } from "react";
import { playSound, SOUNDS } from "../utils/sounds";

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
        output = `Available commands:
help - Show this help message
cls - Clear screen
dir - List directory contents
ver - Show Windows version
date - Show current date
time - Show current time
echo - Display a message

Portfolio commands:
about - View about me section
skills - List my technical skills
projects - View my projects
contact - Show contact information
github - Open GitHub profile
linkedin - Open LinkedIn profile`;
        break;
      case "cls":
        setHistory([]);
        return;
      case "dir":
        output = `Volume in drive C is PORTFOLIO98
Volume Serial Number is 1337-1998

Directory of C:\Desktop

05/11/1998  03:14 PM    <DIR>          .
05/11/1998  03:14 PM    <DIR>          ..
05/11/1998  03:14 PM             <DIR> About Me
05/11/1998  03:14 PM             <DIR> Skills
05/11/1998  03:14 PM             <DIR> Projects
05/11/1998  03:14 PM             <DIR> Contact
05/11/1998  03:14 PM             <DIR> Command Prompt
05/11/1998  03:14 PM             <DIR> Internet Explorer
05/11/1998  03:14 PM             <DIR> GitHub
05/11/1998  03:14 PM             <DIR> LinkedIn
               0 File(s)              0 bytes
              10 Dir(s)   2,147,483,648 bytes free`;
        break;
      case "ver":
        output = "Portfolio Windows [Version 4.10.1998]";
        break;
      case "date":
        output = new Date().toLocaleDateString();
        break;
      case "time":
        output = new Date().toLocaleTimeString();
        break;
      case "about":
        output =
          "Omer Oran - Full Stack Developer\n\nPassionate about creating innovative web solutions and exploring new technologies. Experienced in modern web development with a focus on user experience and performance.";
        break;
      case "skills":
        output =
          "Technical Skills:\n\n- Frontend: React, Next.js, Vue.js, JavaScript/TypeScript\n- Backend: Node.js, Python, Java\n- Database: MongoDB, PostgreSQL, MySQL\n- Tools: Git, Docker, AWS\n- Other: RESTful APIs, GraphQL, CI/CD";
        break;
      case "projects":
        output =
          "Notable Projects:\n\n1. Windows 98 Portfolio - A nostalgic portfolio website\n2. E-commerce Platform - Full-stack online shopping solution\n3. Task Management System - Team collaboration tool\n\nType 'github' to view more projects.";
        break;
      case "contact":
        output =
          "Contact Information:\n\nEmail: contact@example.com\nLinkedIn: linkedin.com/in/omeroran\nGitHub: github.com/omerorann";
        break;
      case "github":
        window.open("https://github.com/omeroran", "_blank");
        output = "Opening GitHub profile...";
        break;
      case "linkedin":
        window.open("https://linkedin.com/in/omeroran", "_blank");
        output = "Opening LinkedIn profile...";
        break;
      default:
        if (cmd.startsWith("echo ")) {
          output = cmd.substring(5);
        } else if (cmd !== "") {
          output = `'${cmd}' is not recognized as an internal or external command,\noperable program or batch file.`;
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
        text: "Microsoft Windows [Version 4.10.1998]\nCopyright © Microsoft Corp 1981-1998\n\nC:Desktop>",
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
    // Auto-scroll to bottom when history changes
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
                <span>C:\Desktop{">"}"</span>
                {item.text}
              </div>
            ) : (
              <div>{item.text}</div>
            )}
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <span>C:\Desktop{">"}"</span>
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
