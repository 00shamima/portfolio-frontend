import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Import 'X' for the close icon
import { motion, AnimatePresence } from 'framer-motion';

// --- THEME COLORS ---
const PRIMARY_BG = '#1A1423';      // Very Dark Purple-Gray (Main Background)
const CARD_BG = '#2A2130';         // Slightly lighter/different dark tone (Navbar/Card Background)
const ACCENT_COLOR = '#FF00FF';   // Vibrant Magenta
const TEXT_COLOR = '#DCDCDC';      // Light Grey for main readability

// --- NAVBAR HELPER COMPONENTS (Unchanged) ---

// Component for general navigation links (Animated with Snap-Out Line)
const NavLink = ({ href, children, onClick }) => (
  <a 
    href={href} 
    onClick={onClick} // Added onClick for mobile closing
    className="px-3 py-1 font-medium text-sm transition-colors duration-300 transform hover:scale-[1.05] hover:text-white relative group"
    style={{ color: TEXT_COLOR }}
  >
    {children}
    {/* Animated Accent Line Element */}
    <span 
        className="absolute left-1/2 bottom-0 h-[2px] w-0 transform origin-center transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"
        style={{ backgroundColor: ACCENT_COLOR }}
    />
  </a>
);

// Contact Button (Unchanged)
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
            className={`px-4 py-1.5 text-sm rounded-full font-bold transition-all duration-300 ease-in-out whitespace-nowrap ${className}`}
            style={activeStyle}
            onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = `0 0 20px 0 ${ACCENT_COLOR}`; 
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = activeStyle.boxShadow; 
            }}
        >
            {children}
        </a>
    );
};

// NAVBAR COMPONENT (FLOATING, CENTERED DESIGN)
const Navbar = () => {
  // State to manage the mobile menu's open/closed status
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'JOURNEY', href: '#journey' },
  ];

  // Function to close the menu, useful for link clicks
  const closeMenu = () => setIsMenuOpen(false);
  
  return (
    // Outer container for the fixed header
    <header className="fixed top-0 left-0 right-0 z-50 pt-8 px-4">
      <nav 
        className="max-w-6xl mx-auto flex items-center justify-between p-3 rounded-full backdrop-blur-sm"
        style={{ 
            backgroundColor: `${CARD_BG}c0`, 
            boxShadow: `0 8px 32px 0 ${ACCENT_COLOR}20` 
        }}
      >
        {/* Logo/Placeholder (Moved to standard left position) */}
        <div className="p-1">
            <a href="#home" className="text-xl font-extrabold cursor-pointer transition-transform duration-300 hover:scale-[1.05]" style={{ color: TEXT_COLOR }}>
              <span style={{ color: ACCENT_COLOR }}>P</span>ortfolio
            </a>
        </div>

        {/* Desktop Navigation (Visible on lg screens and up) */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Navigation Links */}
          {links.map(link => (
            <NavLink 
              key={link.name} 
              href={link.href} 
            >
              {link.name}
            </NavLink>
          ))}
          
          {/* Contact Button */}
          <ContactButton 
            href="#contact"
          >
            CONTACT
          </ContactButton>
        </div>

        {/* Hamburger Menu Button (Visible on small screens, hidden on large) */}
        <button
            className="lg:hidden p-2 rounded-full transition-colors z-50"
            style={{ color: ACCENT_COLOR, border: `1px solid ${ACCENT_COLOR}` }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu-drawer"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
      </nav>

      {/* MOBILE MENU DRAWER (Only renders when isMenuOpen is true) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            // Full-screen overlay below the navbar
            className="fixed inset-0 top-[calc(60px+2rem)] lg:hidden" // Adjust top margin to start below the main navbar
            style={{ backgroundColor: `${PRIMARY_BG}f0`, backdropFilter: 'blur(10px)' }}
          >
            <div className="flex flex-col items-center pt-8 space-y-6">
              {/* Mobile Navigation Links (Larger and centered) */}
              {links.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }} // Staggered entry
                >
                  <a 
                    href={link.href} 
                    onClick={closeMenu} // Close menu on click
                    className="text-xl py-2 font-semibold transition-colors hover:text-white relative group"
                    style={{ color: TEXT_COLOR }}
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: links.length * 0.05 + 0.1 }}
                className="mt-8"
              >
                <ContactButton 
                  href="#contact"
                  className="text-lg px-6 py-2.5" // Larger button for mobile
                  onClick={closeMenu}
                >
                  CONTACT ME
                </ContactButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;