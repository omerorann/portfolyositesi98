"use client";

import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { createRoot } from "react-dom/client";
import Window from "./Window";

export default function ProjectCard({ project }) {
  return (
    <div className="win98-window">
      <div className="win98-title-bar">
        <div className="flex items-center gap-2">
          <Image src="/html.png" alt="" width={16} height={16} />
          <span>{project.title}.html</span>
        </div>
      </div>

      <div className="p-3">
        <div className="win98-window mb-3">
          <div className="win98-title-bar py-1">
            <span className="text-xs">preview.jpg</span>
          </div>
          <div className="relative h-32 w-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              onError={(e) => {
                e.target.src = "/project-placeholder.jpg";
              }}
            />
          </div>
        </div>

        <div className="mb-3">
          <p className="text-sm mb-2">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="win98-button text-[10px] px-1.5 py-0.5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-win98-border-dark">
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="win98-button p-2"
              >
                <FaGithub className="w-4 h-4" />
              </a>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="win98-button p-2"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
              </a>
            )}
          </div>

          <button
            onClick={() => {
              const detailWindow = document.createElement("div");
              detailWindow.id = `detail-window-${project.id}`;
              document.body.appendChild(detailWindow);

              const root = createRoot(detailWindow);
              root.render(
                <Window
                  title={`${project.title}.txt`}
                  icon="/file.svg"
                  isActive={true}
                  showMinimize={false}
                  showMaximize={false}
                  onClose={() => {
                    root.unmount();
                    document.body.removeChild(detailWindow);
                  }}
                >
                  <div className="p-4 whitespace-pre-wrap">
                    {project.longDescription}
                  </div>
                </Window>
              );
            }}
            className="win98-button px-4 py-1"
          >
            Detaylar
          </button>
        </div>
      </div>
    </div>
  );
}
