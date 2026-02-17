import React from "react";
 
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
  return (
    // Ku dar id halkan si react-scroll uu u helo
    <div id="achievements" className="max-w-6xl mx-auto py-24 px-4">
      <h1 className="text-3xl font-bold mb-8 text-white text-center">My Achievements</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {achievements.map((item, index) => (
          <div
            key={index}
           className="bg-gray-900  text-white rounded-xl overflow-hidden border-gray-600 border-1 shadow-lg hover:scale-105 transition-transform duration-300"

          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-t-2xl p-1 pt-1"
            />
            <div className="p-4">
              <div className="flex justify-between text-sm mb-2">
                <span>{item.date}</span>
                <span>{item.duration}</span>
              </div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
