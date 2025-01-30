"use client";

import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

export default function Projects({ isMaximized }) {
  const displayedProjects = projects;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b border-win98-border-dark pb-2">
        <h2 className="text-xl mb-1">Projeler</h2>
        <p className="text-sm">Geliştirdiğim bazı projeler</p>
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4 overflow-y-auto p-1"
        style={{
          maxHeight: isMaximized
            ? "calc(100vh - 120px)"
            : "calc(100vh - 250px)",
          minHeight: "200px",
        }}
      >
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {displayedProjects.length === 0 && (
        <div className="win98-window p-4 text-center">
          <p className="text-sm">Henüz öne çıkan proje bulunmuyor.</p>
        </div>
      )}
    </div>
  );
}
