import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, School, BookOpen, Clock, Code, DollarSign } from 'lucide-react';

// --- THEME CONSTANTS ---
const PRIMARY_BG = '#1A1423';
const CARD_BG = '#2A2130';
const ACCENT_COLOR = '#FF00FF';
const TEXT_COLOR = '#DCDCDC';
const SECONDARY_TEXT_COLOR = '#A0A0A0';

// --- Harmonized Data Structure ---
const journeyData = {
    experience: [
        {
            id: 1,
            title: "Full Stack Developer Intern",
            institution: "I-BACUS-TECH Solutions Pvt Ltd",
            year: "Aug 2025 - Present", // Use 'year' for timeline date
            details: "Contribution in 6+ projects using React.js, Bootstrap, MongoDB, Node.js, Express.js.",
            tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Prisma'],
            icon: Briefcase,
        },
        {
            id: 2,
            title: "College Treasurer",
            institution: "Bharathidasan College of Arts and Science", // Renamed 'college' to 'institution'
            year: "2024 - 2025", // Added a 'year' field for the timeline
            details: "Managed budgeting and fund allocation for college-level events and student activities, and promoted student discipline and team cooperation.",
            tags: ['Budgeting', 'Leadership', 'Teamwork'], // Added tags for consistency
            icon: DollarSign, // Using DollarSign icon for a finance/treasurer role
        }
    ],
    education: [
        {
            id: 3,
            title: "Bsc Information Technology",
            institution: "Bharadhidasan college of arts and science",
            year: "2023 - present", 
            details: "Completed 5 semesters with a GPA of 8. Courses in ReactJS, Web Development.",
            tags: ['ReactJS', 'Tailwindcss', 'JavaScript'],
            icon: GraduationCap,
        },
        {
            id: 4,
            title: "Higher Secondary (12th)",
            institution: "municipal girls higher secondary school",
            year: "May 2020 - May 2022",
            details: "Completed class 12 high school education at municipal girls higher secondary school, where I studied Mathematics with Computer Science.",
            tags: ['Computer Applications'],
            icon: BookOpen,
        },
        {
            id: 5,
            title: "Matriculation (X)",
            institution: "E.K.M abdulgani madharasa islamia high school",
            year: "May 2019 - May 2020",
            details: "Completed my secondary education.",
            tags: [],
            icon: School,
        },
    ],
};

// Pass currentDataLength as a prop
const TimelineItem = ({ data, index, currentDataLength }) => {
    // Check if this is the very last item in the currently active list
    const isLastItem = index === currentDataLength - 1;

    // Use a default icon if one is missing (though our data structure should prevent this now)
    const ItemIcon = data.icon || Briefcase; 

    return (
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative flex items-start gap-6 mb-12 last:mb-0"
        >
            {/* Timeline Line (Background) */}
            <div 
                className="absolute left-[19px] top-0 bottom-[-48px] w-[2px] -z-0"
                style={{ 
                    background: `linear-gradient(to bottom, ${ACCENT_COLOR}, ${CARD_BG})`,
                    // CORRECTED LOGIC: Hide the line only for the last item in the currently active list
                    display: isLastItem ? 'none' : 'block' 
                }}
            />

            {/* Icon Circle (Small, Clean) */}
            <div 
                className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md"
                style={{ 
                    backgroundColor: ACCENT_COLOR, // White background like the screenshot
                    color: PRIMARY_BG, // Dark icon color 
                }}
            >
                <ItemIcon size={20} />
            </div>

            {/* Content Card (Matches the screenshot layout) */}
            <motion.div 
                className="flex-1 p-0 rounded-xl transition-all duration-300 overflow-hidden"
            >
                {/* Ensure 'year' is always available */}
                <p className="text-sm font-medium mb-1" style={{ color: SECONDARY_TEXT_COLOR }}>
                    {data.year || 'N/A'} 
                </p>
                <h3 className="text-xl font-bold mb-1" style={{ color: TEXT_COLOR }}>
                    {data.title}
                </h3>
                {/* Ensure 'institution' is always available */}
                <h4 className="text-sm font-medium italic mb-3 flex items-center" style={{ color: SECONDARY_TEXT_COLOR }}>
                    {data.institution}
                    {/* Placeholder for external link icon, similar to the screenshot */}
                    <a href="#" className="ml-2" style={{ color: ACCENT_COLOR }}>
                        <Clock size={14} /> 
                    </a>
                </h4>

                <p className="text-sm leading-relaxed mb-4" style={{ color: SECONDARY_TEXT_COLOR }}>
                    {data.details}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                    {data.tags && data.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs font-semibold rounded-full"
                            style={{ 
                                backgroundColor: CARD_BG,
                                color: ACCENT_COLOR,
                                border: `1px solid ${ACCENT_COLOR}40`
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                
                {/* Read More Link */}
                 <a href="#" className="text-sm font-semibold mt-2 block" style={{ color: ACCENT_COLOR }}>
                    
                </a>
            </motion.div>
        </motion.div>
    );
};

const Journey = () => {
    const [activeTab, setActiveTab] = useState('Experience'); // Start with Experience tab

    const currentData = activeTab === 'Experience' ? journeyData.experience : journeyData.education;
    const currentDataLength = currentData.length; // Get the length of the currently active list

    const TabButton = ({ name }) => (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300"
            onClick={() => setActiveTab(name)}
            style={{
                color: name === activeTab ? PRIMARY_BG : TEXT_COLOR,
                backgroundColor: name === activeTab ? ACCENT_COLOR : CARD_BG,
                boxShadow: name === activeTab ? `0 0 15px ${ACCENT_COLOR}50` : 'none',
                border: `1px solid ${name === activeTab ? ACCENT_COLOR : SECONDARY_TEXT_COLOR}40`,
            }}
        >
            {name}
        </motion.button>
    );

    const fadeUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };
    
    return (
        <section id="journey" className="py-20 px-4 md:px-8" style={{ backgroundColor: PRIMARY_BG }}>
            <div className="container mx-auto max-w-4xl">
                {/* Header Section */}
                <motion.div 
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    <p className="text-md font-light mb-2" style={{ color: SECONDARY_TEXT_COLOR }}>
                        Taught by books, trained by bugs, Here is how I learned
                    </p>
                    <h2 className="text-4xl font-bold" style={{ color: TEXT_COLOR }}>
                        My <span style={{ color: ACCENT_COLOR, textShadow: `0 0 10px ${ACCENT_COLOR}80` }}>Journey</span>
                    </h2>
                </motion.div>

                {/* Tab Selector */}
                <div 
                    className="flex justify-center mb-12 p-1 rounded-full mx-auto max-w-fit"
                    style={{ backgroundColor: CARD_BG }}
                >
                    <TabButton name="Experience" />
                    <TabButton name="Education" />
                </div>

                {/* Timeline Content */}
                <motion.div 
                    key={activeTab} // Key changes to re-run entrance animation on tab switch
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative pl-10 md:pl-0"
                >
                    {currentData.map((item, index) => (
                        // PASS currentDataLength HERE
                        <TimelineItem 
                            key={item.id} 
                            data={item} 
                            index={index} 
                            currentDataLength={currentDataLength}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Journey;