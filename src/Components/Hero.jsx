import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as LinkIcon, Download } from 'lucide-react';
import apiService from '../api/apiService';

const PRIMARY_BG = '#1A1423';     
const ACCENT_COLOR = '#FF00FF';   
const TEXT_COLOR = '#FFFFFF';      

const Hero = () => {
    const [heroData, setHeroData] = useState({ 
        title: "Hello, I'm", 
        subtitles: ["Full Stack Developer", "MERN Specialist"] 
    });
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const response = await apiService.get('/home');
                if (response.data && response.data.subtitle) {
                    setHeroData({
                        title: "Hello, I'm", 
                        subtitles: response.data.subtitle.split(',') 
                    });
                }
            } catch (err) {
                console.error("Fetch failed:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHero();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % heroData.subtitles.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [heroData.subtitles]);

    const handleDownload = () => {
        const resumeUrl = "/Resume.pdf"; 
        const link = document.createElement("a");
        link.href = resumeUrl;
        link.download = "Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <div className="min-h-screen" style={{backgroundColor: PRIMARY_BG}} />;

    return (
        /* 1. Navbar gap neekka: 'h-screen' matrum 'pt-0' payanpaduthappattullathu */
        <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: PRIMARY_BG }}>
            
            <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-10">
                
                {/* LEFT CONTENT */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.8 }}
                    className="flex-1 text-left z-10"
                >
                    <p className="text-lg md:text-xl font-medium mb-2" style={{ color: TEXT_COLOR }}>
                        {heroData.title}
                    </p>
                    
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6" style={{ color: TEXT_COLOR }}>
                        I am <br/>
                        {/* 2. Cursor line-ai sariyaaga text-udan otta vaikka 'inline-flex' payanpaduthukirom */}
                        <div className="inline-flex items-center">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ color: ACCENT_COLOR }}
                                >
                                    {heroData.subtitles[index]}
                                </motion.span>
                            </AnimatePresence>
                            {/* FIXED CURSOR: Text height-kku matching-aaga 'h-[0.8em]' */}
                            <span className="w-1 h-[0.8em] ml-2 animate-pulse" style={{ backgroundColor: ACCENT_COLOR }}></span>
                        </div>
                    </h1>

                    <p className="text-gray-400 text-lg max-w-lg mb-10 leading-relaxed">
                        A passionate Programming enthusiast who thrives on developing innovative solutions for real-world problems.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a href="#projects">
                            <button className="flex items-center gap-2 px-8 py-3 rounded-lg font-bold shadow-lg hover:scale-105 transition-all"
                                    style={{ backgroundColor: ACCENT_COLOR, color: '#fff' }}>
                                <LinkIcon size={18} /> View My Work
                            </button>
                        </a>
                        <button onClick={handleDownload} className="flex items-center gap-2 px-8 py-3 rounded-lg font-bold border-2 hover:bg-white/5 transition-all"
                                style={{ borderColor: ACCENT_COLOR, color: ACCENT_COLOR }}>
                            <Download size={18} /> Download CV
                        </button>
                    </div>
                </motion.div>

                {/* RIGHT VISUAL - Laptop Illustration */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.8 }}
                    className="flex-1 flex justify-center lg:justify-end"
                >
                    <div className="relative w-full max-w-[450px] p-6 rounded-xl border-2" 
                         style={{ borderColor: `${ACCENT_COLOR}40`, backgroundColor: '#2A2130' }}>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        </div>
                        <pre className="text-xs md:text-sm font-mono overflow-hidden">
                            <code style={{ color: ACCENT_COLOR }}>{`<script>`}</code><br/>
                            <code className="text-gray-300 ml-4">{`  console.log('Building...');`}</code><br/>
                            <code style={{ color: ACCENT_COLOR }}>{`</script>`}</code>
                        </pre>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;