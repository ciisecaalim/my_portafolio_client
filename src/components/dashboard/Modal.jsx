import React from 'react';

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-3xl mx-4">
        <div className="bg-gray-900 text-gray-100 rounded-lg overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/6">
            <div className="text-lg font-semibold">{title}</div>
            <button onClick={onClose} aria-label="Close" className="px-3 py-1 rounded bg-white/5">Close</button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
