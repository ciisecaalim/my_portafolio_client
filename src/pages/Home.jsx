import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Certificates from '../components/Certificates';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="app-shell">
            <main className="app-panel relative overflow-hidden">
                {/* Background Layer & Blobs */}
                <div className="bg-gradient-animate"></div>
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>

                <Navbar />
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Certificates />
                <Projects />
                <Contact />
                <Footer />
            </main>
        </div>
    );
};

export default Home;
