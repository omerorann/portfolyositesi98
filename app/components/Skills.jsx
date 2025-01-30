"use client";

import { skills } from "../data/skills";

const categories = [...new Set(skills.map(skill => skill.category))];

export default function Skills() {
  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category} className="mb-4">
          <div className="text-sm font-bold mb-2 px-2">{category}</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {skills
              .filter((skill) => skill.category === category)
              .map((skill) => (
                <div
                  key={skill.name}
                  className="win98-button p-2 flex flex-col items-center hover:shadow-win98-in active:shadow-win98-in"
                >
                  <skill.icon className="h-8 w-8 mb-1" />
                  <span className="text-sm text-center">{skill.name}</span>
                  <div className="w-full h-2 bg-win98-border-light mt-1">
                    <div
                      className="h-full bg-win98-title-bar"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
