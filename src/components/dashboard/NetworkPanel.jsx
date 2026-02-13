import React from 'react';

const NetworkPanel = () => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="text-sm">IP Address</div>
        <div className="text-sm font-mono text-yellow-300">192.168.1.42</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm">Gateway</div>
        <div className="text-sm font-mono">192.168.1.1</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm">Subnet</div>
        <div className="text-sm font-mono">255.255.255.0</div>
      </div>
      <div className="mt-3">
        <div className="text-sm font-semibold mb-2">Routing</div>
        <div className="text-xs text-gray-300">Default route via gateway. Static routes available in advanced settings.</div>
      </div>
    </div>
  );
};

export default NetworkPanel;
