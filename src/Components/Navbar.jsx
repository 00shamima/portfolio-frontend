import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PRIMARY_BG = '#1A1423'; 
const CARD_BG = '#2A2130'; 
const ACCENT_COLOR = '#FF00FF'; 
const TEXT_COLOR = '#DCDCDC'; 

const NavLink = ({ href, children, onClick }) => (
  <a 
    href={href} 
    onClick={onClick}
    className="px-3 py-1 font-medium text-sm transition-colors duration-300 transform hover:scale-[1.05] hover:text-white relative group"
    style={{ color: TEXT_COLOR }}
  >
    {children}
    <span 
        className="absolute left-1/2 bottom-0 h-[2px] w-0 transform origin-center transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"
        style={{ backgroundColor: ACCENT_COLOR }}
    />
  </a>
);

const ContactButton = ({ href, children, className = '', onClick }) => {
    const activeStyle = {
        backgroundColor: ACCENT_COLOR,
        borderColor: ACCENT_COLOR, 
        color: PRIMARY_BG, 
        borderWidth: '1px',
        boxShadow: `0 0 15px 0 ${ACCENT_COLOR}80`, 
    };

    return (
        <a 
            href={href} 
            onClick={onClick}
            className={`px-6 py-2 text-sm rounded-full font-bold transition-all duration-300 ease-in-out whitespace-nowrap ${className}`}
            style={activeStyle}
        >
            {children}
        </a>
    );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ஸ்க்ரோல் செய்யும்போது Navbar ஸ்டைலை மாற்ற
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'JOURNEY', href: '#journey' },
  ];

  const closeMenu = () => setIsMenuOpen(false);
  
  return (
    // 'pt-8' நீக்கப்பட்டது. இப்போது Header சரியாக மேலே ஒட்டிக்கொள்ளும்.
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}
      style={{ 
        backgroundColor: scrolled ? `${PRIMARY_BG}e0` : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 0, 255, 0.1)' : 'none'
      }}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12">
        
        {/* Logo */}
        <div className="flex items-center">
            <a href="#home" className="text-2xl font-black cursor-pointer tracking-tighter" style={{ color: TEXT_COLOR }}>
              <span style={{ color: ACCENT_COLOR }}>P</span>ORTFOLIO
            </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {links.map(link => (
            <NavLink key={link.name} href={link.href}>{link.name}</NavLink>
          ))}
          
          <ContactButton href="#contact">CONTACT</ContactButton>
        </div>

        {/* Hamburger Menu Button */}
        <button
            className="lg:hidden p-2 rounded-lg transition-all"
            style={{ color: ACCENT_COLOR, backgroundColor: `${ACCENT_COLOR}10` }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-0 left-0 w-full z-[-1] flex flex-col items-center justify-center space-y-8"
            style={{ backgroundColor: PRIMARY_BG }}
          >
            {links.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-3xl font-bold"
                style={{ color: TEXT_COLOR }}
              >
                {link.name}
              </motion.a>
            ))}
            <ContactButton href="#contact" onClick={closeMenu} className="text-xl px-10 py-4">
               CONTACT ME
            </ContactButton>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;