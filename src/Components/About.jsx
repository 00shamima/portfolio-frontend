import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, User, ChevronDown } from 'lucide-react';
import shamiProfilePic from '../assets/shami.jpeg'; 
import apiService from '../api/apiService'; 

const PRIMARY_BG = '#1A1423';     
const CARD_BG = '#2A2130';         
const ACCENT_COLOR = '#FF00FF';   
const TEXT_COLOR = '#DCDCDC';      
const SECONDARY_TEXT_COLOR = '#A0A0A0'; 

const FadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const AccordionItem = ({ icon: Icon, title, content, index, activeIndex, setActiveIndex }) => {
    const isOpen = index === activeIndex;

    return (
        <motion.div 
            className="rounded-xl overflow-hidden mb-4" 
            style={{ 
                backgroundColor: CARD_BG, 
                border: `1px solid ${isOpen ? ACCENT_COLOR : CARD_BG}` 
            }}
        >
            <button
                className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                onClick={() => setActiveIndex(isOpen ? null : index)}
            >
                <div className="flex items-center">
                    <Icon size={24} style={{ color: ACCENT_COLOR }} />
                    <h3 className="ml-4 text-xl font-bold" style={{ color: isOpen ? ACCENT_COLOR : TEXT_COLOR }}>
                        {title}
                    </h3>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} style={{ color: ACCENT_COLOR }}>
                    <ChevronDown size={24} />
                </motion.div>
            </button>

            <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                className="overflow-hidden"
            >
                <div className="p-6 pt-0 text-base leading-relaxed whitespace-pre-line" style={{ color: SECONDARY_TEXT_COLOR }}>
                    <div className="border-t pt-4" style={{ borderColor: `${SECONDARY_TEXT_COLOR}30` }}>
                        {content}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const About = () => {
    const [activeIndex, setActiveIndex] = useState(0); 
    const [dbData, setDbData] = useState(null); // Full object-ai store seigirom
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const response = await apiService.get('/about');
                if (response.data) {
                    setDbData(response.data); // Backend response-ai mothamaaga vaikiraergal
                }
            } catch (err) {
                console.error("Error fetching about:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAbout();
    }, []);

    // Dynamic Map Data - Ippo ithu backend value-kalai sariyaaga map seiyum
    const dynamicSections = [
        {
            icon: User,
            title: "Who I Am",
            content: dbData?.content || "Information coming soon..."
        },
        {
            icon: Code,
            title: "Frontend Focus",
            content: dbData?.frontendFocus || "Expertise in building responsive UIs." 
        },
        {
            icon: Zap,
            title: "Performance",
            content: dbData?.performance || "Focused on clean and efficient code."
        }
    ];

    if (loading) return <div className="h-screen" style={{backgroundColor: PRIMARY_BG}} />;

    return (
        <section id="about" className="py-24 px-4 md:px-8" style={{ backgroundColor: PRIMARY_BG, color: TEXT_COLOR }}>
            <div className="container mx-auto max-w-4xl">
                
                <motion.div className="text-center mb-16" variants={FadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <div className="w-40 h-40 rounded-full p-1 mx-auto mb-6" style={{ background: `linear-gradient(45deg, ${ACCENT_COLOR}, ${PRIMARY_BG})`, boxShadow: `0 0 20px ${ACCENT_COLOR}40` }}>
                        <img src={shamiProfilePic} alt="Profile" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <h2 className="text-4xl font-extrabold">Get to Know <span style={{ color: ACCENT_COLOR }}>Me</span></h2>
                </motion.div>

                {/* Dynamic Mapping from Backend Data */}
                <div className="space-y-2">
                    {dynamicSections.map((item, index) => (
                        <AccordionItem
                            key={index}
                            index={index}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                            icon={item.icon}
                            title={item.title}
                            content={item.content}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;