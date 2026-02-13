import React from 'react';

const skills = {
  Frontend: ['HTML', 'CSS', 'Tailwind', 'JavaScript', 'React'],
  Backend: ['Node.js', 'Express'],
  Databases: ['MongoDB', 'MySQL'],
  Languages: ['Java', 'C#', 'Python']
};

const SkillsPanel = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Object.entries(skills).map(([group, items]) => (
        <div key={group} className="p-3 bg-white/3 rounded">
          <div className="text-sm font-semibold mb-2">{group}</div>
          <div className="flex flex-wrap gap-2">
            {items.map(i => (
              <span key={i} className="text-xs px-2 py-1 bg-white/5 rounded-full">{i}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsPanel;
