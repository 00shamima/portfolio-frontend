import React from 'react';
import { HashRouter as Router } from 'react-router-dom'; 
import { ThemeProvider } from './ThemeContext'; 

import Navbar from './Components/Navbar.jsx'; 
import Hero from './Components/Hero.jsx';
import About from './Components/About.jsx';
import Skills from './Components/Skills.jsx';
import Projects from './Components/Projects.jsx';
import Contact from './Components/Contact.jsx';
import Journey from './Components/Journey.jsx';
import Footer from './Components/Footer.jsx';

function App() {
  const mainAppClasses = "transition-colors duration-500 min-h-screen bg-white text-gray-900 dark:bg-gradient-to-br dark:from-[#0A0612] dark:via-[#1A0A2B] dark:to-[#2B0A46] dark:text-white";

  return (
    <ThemeProvider>
      
      <Router>
        <div className={mainAppClasses}>
          <Navbar />
          
          <div className="pt-20"> 
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Journey />
            <Contact />
            <Footer />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;