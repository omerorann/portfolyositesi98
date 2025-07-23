import { FaReact, FaNodeJs, FaFigma, FaGitAlt, FaDocker, FaSass } from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiGithub,
  SiJavascript,
  SiPostgresql,
  SiRedux,
  SiFirebase,
} from "react-icons/si";

export const skills = [
  { 
    name: "React", 
    icon: FaReact,
    color: "#61DAFB",
    category: "Frontend"
  },
  { 
    name: "React Native", 
    icon: FaReact,
    color: "#61DAFB",
    category: "Frontend"
  },
  { 
    name: "Next.js", 
    icon: SiNextdotjs,
    color: "#000000",
    category: "Frontend"
  },
  { 
    name: "JavaScript", 
    icon: SiJavascript,
    color: "#F7DF1E",
    category: "Language"
  },
  { 
    name: "Node.js", 
    icon: FaNodeJs,
    color: "#339933",
    category: "Backend"
  },
  { 
    name: "Tailwind CSS", 
    icon: SiTailwindcss,
    color: "#06B6D4",
    category: "Frontend"
  },
  { 
    name: "Redux", 
    icon: SiRedux,
    color: "#764ABC",
    category: "Frontend"
  },
  
  { 
    name: "PostgreSQL", 
    icon: SiPostgresql,
    color: "#4169E1",
    category: "Backend"
  },
  { 
    name: "Firebase", 
    icon: SiFirebase,
    color: "#FFCA28",
    category: "Backend"
  },
  { 
    name: "Git", 
    icon: FaGitAlt,
    color: "#F05032",
    category: "Tool"
  },
  {
    name: "Github",
    icon: SiGithub,
    color: "#181717",
    category: "Tool"
  },
  { 
    name: "Figma", 
    icon: FaFigma,
    color: "#F24E1E",
    category: "Tool"
  }
];
