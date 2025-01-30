const fileSystem = {
  "C:\\": {
    type: "directory",
    name: "Local Disk (C:)",
    icon: "/computer_explorer_cool-5.png",
    totalSpace: "2.14 GB",
    freeSpace: "1.44 GB",
    format: "FAT32",
    children: {
      Desktop: {
        type: "directory",
        name: "Desktop",
        icon: "/dir.png",
        children: {
          "About Me": {
            type: "application",
            name: "About Me",
            icon: "/user_world-1.png",
            appType: "about",
          },
          Skills: {
            type: "application",
            name: "Skills",
            icon: "/skills.png",
            appType: "skills",
          },
          Projects: {
            type: "application",
            name: "Projects",
            icon: "/web_file_set-4.png",
            appType: "projects",
          },
          Contact: {
            type: "application",
            name: "Contact",
            icon: "/contact.png",
            appType: "contact",
          },
          "Command Prompt": {
            type: "application",
            name: "Command Prompt",
            icon: "/console_prompt-0.png",
            appType: "cmd",
          },
          "Internet Explorer": {
            type: "application",
            name: "Internet Explorer",
            icon: "/msie1-1.png",
            appType: "browser",
          },
          GitHub: {
            type: "link",
            name: "GitHub",
            icon: "/github.svg",
            url: "https://github.com/omeroran",
          },
          LinkedIn: {
            type: "link",
            name: "LinkedIn",
            icon: "/linkedin.svg",
            url: "https://linkedin.com/in/omeroran",
          },
        },
      },
      Windows: {
        type: "directory",
        name: "Windows",
        icon: "/windows-0.png",
        children: {
          System: {
            type: "directory",
            name: "System",
            icon: "/computer_explorer_cool-5.png",
            children: {
              "kernel32.dll": {
                type: "file",
                name: "kernel32.dll",
                icon: "/file.svg",
              },
              "user32.dll": {
                type: "file",
                name: "user32.dll",
                icon: "/file.svg",
              },
              "shell32.dll": {
                type: "file",
                name: "shell32.dll",
                icon: "/file.svg",
              },
            },
          },
          System32: {
            type: "directory",
            name: "System32",
            icon: "/computer_explorer_cool-5.png",
            children: {
              "cmd.exe": {
                type: "file",
                name: "cmd.exe",
                icon: "/console_prompt-0.png",
              },
              "explorer.exe": {
                type: "file",
                name: "explorer.exe",
                icon: "/dir.png",
              },
              "notepad.exe": {
                type: "file",
                name: "notepad.exe",
                icon: "/file.svg",
              },
            },
          },
        },
      },
      System: {
        type: "directory",
        name: "System",
        icon: "/computer_explorer_cool-5.png",
        children: {
          Config: {
            type: "directory",
            name: "Config",
            icon: "/computer_explorer_cool-5.png",
            children: {
              "system.ini": {
                type: "file",
                name: "system.ini",
                icon: "/file.svg",
              },
              "config.sys": {
                type: "file",
                name: "config.sys",
                icon: "/file.svg",
              },
            },
          },
        },
      },
    },
  },
  "D:\\": {
    type: "directory",
    name: "CD-ROM Drive (D:)",
    icon: "/cd.png",
    status: "No Disc",
    children: {},
  },
};

export const systemInfo = {
  os: "Microsoft Windows 98",
  version: "4.10.1998",
  manufacturer: "Microsoft Corporation",
  processor: "Intel Pentium II",
  memory: "64 MB RAM",
  systemType: "x86-based PC",
};

export default fileSystem;
