import React from 'react';

const MultimediaPanel = () => {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm font-semibold">Design Tools</div>
        <div className="text-xs text-gray-300">Photoshop · Illustrator</div>
      </div>
      <div>
        <div className="text-sm font-semibold">Video Tools</div>
        <div className="text-xs text-gray-300">Premiere Pro · CapCut</div>
      </div>
      <div>
        <div className="text-sm font-semibold">Assets</div>
        <div className="text-xs text-gray-300">Manage images, videos, and thumbnails</div>
      </div>
    </div>
  );
};

export default MultimediaPanel;
