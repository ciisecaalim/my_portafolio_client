import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="p-4 rounded-xl bg-white/3 border border-white/6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold">{project.title}</h4>
          <p className="text-xs text-gray-300 mt-1">{project.tech.join(' • ')}</p>
        </div>
        <div className="text-sm px-3 py-1 rounded-full bg-white/5">{project.status}</div>
      </div>
      <div className="mt-3 text-sm text-gray-300">A short description of the project goes here — goals, deployment, and current status.</div>
      <div className="mt-4 flex gap-2">
        <button className="px-3 py-1 rounded bg-yellow-400 text-gray-900 text-sm font-semibold">Open</button>
        <button className="px-3 py-1 rounded bg-white/5 text-sm">Manage</button>
      </div>
    </div>
  );
};

export default ProjectCard;
