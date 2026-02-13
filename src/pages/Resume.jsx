import React, { useRef } from 'react';
import { HiDownload } from 'react-icons/hi';

const Resume = () => {
  const resumeRef = useRef();

  const handleDownload = () => {
    if (!window.jspdf) {
      alert('PDF library not loaded.');
      return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    const margin = 40;
    const maxWidth = pdf.internal.pageSize.getWidth() - margin * 2;
    let y = 40;

    const addHeading = (text) => {
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text(text, margin, y);
      y += 24;
    };

    const addSub = (text) => {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const split = pdf.splitTextToSize(text, maxWidth);
      pdf.text(split, margin, y);
      y += split.length * 14 + 8;
    };

    // Title
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Ciise Caalim', margin, y);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Full-Stack Web Developer', margin + 220, y + 4);
    y += 30;

    // Profile
    addHeading('Profile');
    addSub('Ciise Caalim is a passionate and versatile Full-Stack Web Developer with strong experience in frontend and backend development. He has studied at Jamhuuriya University and completed professional training at Rice Academy, a well-known private academy in Mogadishu that trains high-quality web developers.');
    addSub('He has hands-on experience building responsive and scalable web applications using modern technologies. In addition to web development, he has knowledge of advanced networking, including IP addressing and routing. He also possesses strong communication skills and multimedia experience, which help him work effectively in team environments and create visually appealing digital content.');

    // Technical Skills
    addHeading('Technical Skills');
    addSub('Frontend: HTML, CSS, Tailwind CSS, JavaScript, React (JSX)');
    addSub('Backend: Node.js, Express.js');
    addSub('Databases: MongoDB, MySQL');
    addSub('Programming Languages: JavaScript, C#, Java, Python');
    addSub('Networking: Advanced network concepts, IP routing and connectivity');
    addSub('Multimedia & Design: Photoshop, Adobe Illustrator, Premiere Pro, CapCut');

    // Soft Skills
    addHeading('Soft Skills');
    addSub('Communication skills; problem-solving; teamwork; continuous learning');

    // Portfolio navigation
    addHeading('Portfolio Website Pages (Navigation Structure)');
    addSub('Home – Introduction and personal branding');
    addSub('About – Detailed background and education');
    addSub('Skills – Technical and professional skills');
    addSub('Projects – Showcase of completed and ongoing projects');
    addSub('Experience / Education – Academic and practical experience');
    addSub('Certificates & Seminars – Trainings, seminars, and certifications');
    addSub('Contact – Contact form and professional details');

    // Footer
    pdf.setFontSize(10);
    pdf.text('Designed and developed by Ciise Caalim — Full-Stack Web Developer', margin, pdf.internal.pageSize.getHeight() - 40);

    pdf.save('Ciise-Caalim-CV.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold">Ciise Caalim — CV</h1>
          <button onClick={handleDownload} className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-md shadow hover:brightness-95">
            <HiDownload /> Download PDF
          </button>
        </div>

        <div ref={resumeRef} className="bg-white/5 p-8 rounded-2xl shadow-md">
          <header className="flex items-start gap-6 mb-6">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-tr from-yellow-300 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
              CC
            </div>
            <div>
              <h2 className="text-2xl font-bold">Ciise Caalim</h2>
              <p className="text-sm text-gray-300 mt-1">Full-Stack Web Developer</p>
              <p className="text-sm text-gray-400 mt-2">Jamhuuriya University · Rice Academy (Mogadishu)</p>
            </div>
          </header>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Profile</h3>
            <p className="text-gray-300 leading-relaxed">
              Ciise Caalim is a passionate and versatile Full-Stack Web Developer with strong experience in frontend and backend development. He has studied at Jamhuuriya University and completed professional training at Rice Academy, a well-known private academy in Mogadishu that trains high-quality web developers.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
              He has hands-on experience building responsive and scalable web applications using modern technologies. In addition to web development, he has knowledge of advanced networking, including IP addressing and routing. He also possesses strong communication skills and multimedia experience, which help him work effectively in team environments and create visually appealing digital content.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-md font-semibold mb-2">Technical Skills</h4>
              <ul className="text-gray-300 space-y-1">
                <li><strong>Frontend:</strong> HTML, CSS, Tailwind CSS, JavaScript, React (JSX)</li>
                <li><strong>Backend:</strong> Node.js, Express.js</li>
                <li><strong>Databases:</strong> MongoDB, MySQL</li>
                <li><strong>Languages:</strong> JavaScript, C#, Java, Python</li>
                <li><strong>Networking:</strong> Advanced network concepts, IP routing and connectivity</li>
                <li><strong>Multimedia & Design:</strong> Photoshop, Adobe Illustrator, Premiere Pro, CapCut</li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-2">Soft Skills</h4>
              <ul className="text-gray-300 space-y-1">
                <li>Communication skills</li>
                <li>Problem-solving</li>
                <li>Teamwork</li>
                <li>Continuous learning</li>
              </ul>
            </div>
          </section>

          <section className="mb-6">
            <h4 className="text-md font-semibold mb-2">Portfolio Website Pages (Navigation Structure)</h4>
            <ul className="text-gray-300 space-y-1">
              <li>Home – Introduction and personal branding</li>
              <li>About – Detailed background and education</li>
              <li>Skills – Technical and professional skills</li>
              <li>Projects – Showcase of completed and ongoing projects</li>
              <li>Experience / Education – Academic and practical experience</li>
              <li>Certificates & Seminars – Trainings, seminars, and certifications</li>
              <li>Contact – Contact form and professional details</li>
            </ul>
          </section>

          <footer className="pt-4 border-t border-white/10 text-sm text-gray-400">
            <p>Designed and developed by Ciise Caalim — Full-Stack Web Developer</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Resume;
