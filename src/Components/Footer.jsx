import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope ,FaInstagram,FaWhatsapp} from 'react-icons/fa'; 

// --- THEME CONSTANTS (Matching Contact.jsx) ---
const PRIMARY_BG = '#1A1423';      
const ACCENT_COLOR = '#FF00FF';  
const SECONDARY_TEXT_COLOR = '#A0A0A0'; 

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const yourGithubLink = "https://github.com/00shamima"; 
    const yourLinkedinLink = "https://www.linkedin.com/in/shamima-007"; 
    const yourEmail = "mailto:shamima2802@gmail.com";
    const yourInstagramLink = "https://www.instagram.com/vishakutty_280206/";
    const yourWhatsappLink = "https://wa.me/8220739186";

    return (
        // FIX APPLIED: Removed 'mt-8' entirely and changed 'py-8' to 'pt-4 pb-8' for tight spacing above.
        <footer 
            className="pt-4 pb-8" 
            style={{ 
                backgroundColor: PRIMARY_BG, 
            }}
        >
            <div className="container mx-auto px-4 max-w-6xl">
                
                {/* --- Glowing Separator Line --- */}
                <div 
                    className="w-full h-px mb-8 mx-auto" 
                    style={{ 
                        background: `linear-gradient(to right, ${PRIMARY_BG}, ${ACCENT_COLOR}, ${PRIMARY_BG})`,
                        boxShadow: `0 0 10px ${ACCENT_COLOR}99`, 
                    }}
                />
                
                <div className="flex flex-col md:flex-row justify-between items-center">
                    
                    {/* Left Side: Copyright and Build Info */}
                    <p className="text-sm font-light mb-4 md:mb-0" style={{ color: SECONDARY_TEXT_COLOR }}>
                        © {currentYear} Shamima | Built with <span style={{ color: ACCENT_COLOR }}>React</span> and <span style={{ color: ACCENT_COLOR }}>Tailwind CSS</span>
                    </p>

                    {/* Right Side: Social Icons */}
                    <div className="flex space-x-6">
                        <a 
                            href={yourGithubLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="transition duration-300 hover:scale-110"
                        >
                            <FaGithub 
                                size={24} 
                                style={{ 
                                    color: ACCENT_COLOR, 
                                    filter: `drop-shadow(0 0 5px ${ACCENT_COLOR}c0)` 
                                }} 
                            />
                        </a>
                        <a 
                            href={yourLinkedinLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="transition duration-300 hover:scale-110"
                        >
                            <FaLinkedin 
                                size={24} 
                                style={{ 
                                    color: ACCENT_COLOR, 
                                    filter: `drop-shadow(0 0 5px ${ACCENT_COLOR}c0)` 
                                }} 
                            />
                        </a>
                        <a 
                            href={yourEmail} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="transition duration-300 hover:scale-110"
                        >
                            <FaEnvelope 
                                size={24} 
                                style={{ 
                                    color: ACCENT_COLOR, 
                                    filter: `drop-shadow(0 0 5px ${ACCENT_COLOR}c0)` 
                                }} 
                            />
                        </a>
                        <a 
                            href={yourInstagramLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="transition duration-300 hover:scale-110"
                        >
                            <FaInstagram 
                                size={24} 
                                style={{ 
                                    color: ACCENT_COLOR, 
                                    filter: `drop-shadow(0 0 5px ${ACCENT_COLOR}c0)` 
                                }} 
                            />
                        </a>
                        <a 
                            href={yourWhatsappLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="transition duration-300 hover:scale-110"
                        >
                            <FaWhatsapp 
                                size={24} 
                                style={{ 
                                    color: ACCENT_COLOR, 
                                    filter: `drop-shadow(0 0 5px ${ACCENT_COLOR}c0)` 
                                }} 
                            />
                        </a>
                        
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;