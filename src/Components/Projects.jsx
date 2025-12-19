import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiService from '../api/apiService';
import { Github, ExternalLink } from 'lucide-react';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Backend URL mapping
    const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await apiService.get('/projects');
                // Prisma schema-vin padi 'items' array-ai set seigirom
                setProjects(response.data.items || []);
            } catch (err) {
                console.error("Error fetching projects:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Animation Variants
    const containerVariants = {
        visible: { transition: { staggerChildren: 0.15 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section id="projects" className="py-20 px-4 md:px-8 bg-[#1A1423]">
            <div className="container mx-auto max-w-6xl">
                {/* Section Title */}
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-center mb-12 text-[#DCDCDC]"
                >
                    My <span className="text-[#FF00FF] drop-shadow-[0_0_10px_#FF00FF]">Projects</span>
                </motion.h2>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#FF00FF]"></div>
                    </div>
                ) : (
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={containerVariants}
                    >
                        {projects.map((project) => (
                            <motion.div 
                                key={project.id}
                                variants={cardVariants}
                                whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(255, 0, 255, 0.4)" }}
                                className="bg-[#2A2130] rounded-xl overflow-hidden border border-[#FF00FF]30 transition-all duration-300 shadow-xl group"
                            >
                                {/* Image Section */}
                                <div className="relative h-48 overflow-hidden bg-[#1A1423]">
                                    <img 
                                        src={project.images?.[0] ? `${API_URL}${project.images[0]}` : '/placeholder-image.jpg'} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A2130] via-transparent to-transparent opacity-60" />
                                </div>

                                {/* Content Section */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-3 text-[#DCDCDC]">{project.title}</h3>
                                    <p className="text-[#A0A0A0] mb-4 line-clamp-2 text-sm">
                                        {project.description}
                                    </p>
                                    
                                    {/* Tech Stack - Mapping from String Array */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.techStack?.map((tag) => (
                                            <span 
                                                key={tag} 
                                                className="px-3 py-1 text-xs font-medium rounded-full bg-[#1A1423] text-[#FF00FF] border border-[#FF00FF]30"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Links */}
                                    <div className="flex gap-6 mt-auto">
                                        <a 
                                            href={project.repoLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="flex items-center gap-2 font-medium text-[#FF00FF] hover:brightness-125 transition-all text-sm"
                                        >
                                            <Github size={18} /> View Code
                                        </a>
                                        <a 
                                            href={project.demoLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="flex items-center gap-2 font-medium text-[#DCDCDC] hover:text-[#FF00FF] transition-all text-sm"
                                        >
                                            <ExternalLink size={18} /> Live Demo
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && projects.length === 0 && (
                    <p className="text-center text-[#A0A0A0] mt-10">No projects found in database.</p>
                )}
            </div>
        </section>
    );
};

export default Projects;