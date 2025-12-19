import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiService from '../api/apiService'; // API Service Import

const PRIMARY_BG = '#1A1423';
const CARD_BG = '#2A2130';
const ACCENT_COLOR = '#FF00FF'; 
const TEXT_COLOR = '#DCDCDC';
const SECONDARY_TEXT_COLOR = '#A0A0A0';

const categories = [
    { key: 'all', label: 'All Skills' },
    { key: 'FRONTEND', label: 'Frontend' },
    { key: 'BACKEND', label: 'Backend' },
    { key: 'DATABASE', label: 'Data & ORM' },
    { key: 'TOOLS', label: 'Tools' },
];

const SkillCard = ({ name }) => {
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center p-6 min-h-[100px] rounded-xl transition-all duration-300 transform"
            style={{
                backgroundColor: CARD_BG,
                border: `2px solid ${ACCENT_COLOR}30`,
                boxShadow: `0 0 5px ${ACCENT_COLOR}20`
            }}
            variants={fadeUp}
            whileHover={{
                scale: 1.05,
                borderColor: ACCENT_COLOR,
                boxShadow: `0 0 15px ${ACCENT_COLOR}80`,
            }}
        >
            <h3 className="text-lg font-semibold text-center" style={{ color: TEXT_COLOR }}>{name}</h3>
        </motion.div>
    );
};

const Skills = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [skillsData, setSkillsData] = useState([]); // Dynamic State
    const [loading, setLoading] = useState(true);

    // --- FETCH DATA FROM BACKEND ---
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                // Fetching all skills (limit 100 to get everything for the grid)
                const response = await apiService.get('/skills?limit=100');
                setSkillsData(response.data.skills || []);
            } catch (err) {
                console.error("Error fetching skills:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    const containerVariants = {
        visible: { transition: { staggerChildren: 0.05 } }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    // Filter Logic: Backend uses uppercase categories
    const filteredSkills = skillsData.filter(skill =>
        selectedCategory === 'all' || skill.category === selectedCategory
    );

    return (
        <section id="skills" className="py-20 px-4 md:px-8" style={{ backgroundColor: PRIMARY_BG, color: TEXT_COLOR }}>
            <div className="container mx-auto max-w-6xl">

                <motion.h2
                    className="text-4xl sm:text-5xl font-extrabold text-center mb-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    Technical <span style={{ color: ACCENT_COLOR }}>Skills</span>
                </motion.h2>

                {/* Category Filters */}
                <div className="flex justify-center flex-wrap gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setSelectedCategory(cat.key)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border-2 ${
                                selectedCategory === cat.key 
                                ? 'bg-magenta-600' // Apply your accent color here
                                : 'bg-transparent'
                            }`}
                            style={{
                                borderColor: selectedCategory === cat.key ? ACCENT_COLOR : CARD_BG,
                                backgroundColor: selectedCategory === cat.key ? `${ACCENT_COLOR}20` : CARD_BG,
                                color: selectedCategory === cat.key ? ACCENT_COLOR : SECONDARY_TEXT_COLOR,
                                boxShadow: selectedCategory === cat.key ? `0 0 10px ${ACCENT_COLOR}40` : 'none'
                            }}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center py-10">Loading Skills...</div>
                ) : (
                    <motion.div
                        key={selectedCategory}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {filteredSkills.length > 0 ? (
                            filteredSkills.map((skill) => (
                                <SkillCard key={skill.id} name={skill.name} />
                            ))
                        ) : (
                            <p className="col-span-full text-center opacity-50">No skills found in this category.</p>
                        )}
                    </motion.div>
                )}

                <motion.p
                    className="text-center text-lg mt-16 max-w-3xl mx-auto opacity-70"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                >
                    I continuously explore new technologies to enhance my skill set.
                </motion.p>
            </div>
        </section>
    );
};

export default Skills;