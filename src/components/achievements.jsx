import React, { useState } from "react";
import { FaEye, FaTimes, FaCalendarAlt, FaClock } from "react-icons/fa";

// Halkan ku beddel sawiradaada iyo xogtaada dhabta ah
const achievements = [
  {
    image: "/img/dash1.jpg",
    date: "Apr 8, 2025",
    duration: "Dashboard",
    title: "School Management System",
  },
  {
    image: "/img/mc.jpeg",
    date: "Mar 15, 2025",
    duration: "Cameraman",
    title: "Event Coverage / Video Recording",
  },
  {
    image: "/img/dash2.jpg",
    date: "Mar 15, 2025",
    duration: "Dashboard",
    title: "E-Book Store Platform",
  },
  {
    image: "/img/image.png",
    date: "Aug 15, 2025",
    duration: "Certificate",
    title: "Certified in Python – PyCon Conference 2025",

  },
  {
    image: "/img/freport.png",
    date: "Feb 28, 2025",
    duration: "Dashboard",
    title: "Pharmacy Management System",
  },
  {
    image: "/img/me.jpg",
    date: "Feb 28, 2025",
    duration: "Achievement",
    title: "Awarded at PyCon – Python Certification",
  },
];

const Achievements = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div id="achievements" className="max-w-7xl mx-auto py-24 px-6 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-sm uppercase tracking-[0.3em] text-yellow-300 mb-3">
          Milestones & Gallery
        </h2>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent inline-block">
          My Achievements
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Highlights of my project launches, certifications, and professional moments. Click on any item to view details.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="group relative glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer"
            onClick={() => setSelectedImage(item)}
          >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              </div>

            {/* Content */}
            <div className="p-6 bg-gradient-to-b from-transparent to-black/40">
              <div className="flex justify-between items-center text-xs font-medium text-gray-400 mb-3">
                <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                  <FaCalendarAlt className="text-purple-400" />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-yellow-300/90">
                  <FaClock />
                  <span>{item.duration}</span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-white leading-tight group-hover:text-purple-300 transition-colors">
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            <FaTimes size={24} />
          </button>

          <div
            className="relative max-w-5xl max-h-[90vh] w-full bg-black/50 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-full max-h-[85vh] object-contain mx-auto"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-20 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
              <div className="flex items-center justify-center gap-4 text-gray-300 text-sm">
                <span>{selectedImage.date}</span>
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                <span className="text-yellow-400">{selectedImage.duration}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;
