"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Logo {
    id: number;
    name: string;
    src: string;
}

interface LogoColumnProps {
    logos: Logo[];
    columnIndex: number;
    currentTime: number;
}

function LogoColumn({ logos, columnIndex, currentTime }: LogoColumnProps) {
    const CYCLE_DURATION = 2000;
    const columnDelay = columnIndex * 200;
    const adjustedTime = (currentTime + columnDelay) % (CYCLE_DURATION * logos.length);
    const currentIndex = Math.floor(adjustedTime / CYCLE_DURATION);
    const currentLogo = logos[currentIndex];

    return (
        <motion.div
            className="relative h-14 w-24 overflow-hidden md:h-20 md:w-40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: columnIndex * 0.1,
                duration: 0.5,
                ease: "easeOut",
            }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${currentLogo.id}-${currentIndex}`}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ y: "10%", opacity: 0 }}
                    animate={{
                        y: "0%",
                        opacity: 1,
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        },
                    }}
                    exit={{
                        y: "-20%",
                        opacity: 0,
                        transition: { duration: 0.3 },
                    }}
                >
                    <img
                        src={currentLogo.src}
                        alt={currentLogo.name}
                        className="h-auto w-auto max-h-[80%] max-w-[80%] object-contain"
                    />
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

interface LogoCarouselProps {
    columns?: number;
    logos: Logo[];
}

export function LogoCarousel({ columns = 5, logos }: LogoCarouselProps) {
    const [logoColumns, setLogoColumns] = useState<Logo[][]>([]);
    const [time, setTime] = useState(0);

    const distributeLogos = useCallback(
        (logos: Logo[]) => {
            const shuffled = [...logos].sort(() => Math.random() - 0.5);
            const result: Logo[][] = Array.from({ length: columns }, () => []);

            shuffled.forEach((logo, index) => {
                result[index % columns].push(logo);
            });

            const maxLength = Math.max(...result.map((col) => col.length));
            result.forEach((col) => {
                while (col.length < maxLength) {
                    col.push(shuffled[Math.floor(Math.random() * shuffled.length)]);
                }
            });

            return result;
        },
        [columns]
    );

    useEffect(() => {
        setLogoColumns(distributeLogos(logos));
    }, [logos, distributeLogos]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prev) => prev + 100);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-center gap-4 py-8 flex-wrap">
            {logoColumns.map((columnLogos, index) => (
                <LogoColumn
                    key={index}
                    logos={columnLogos}
                    columnIndex={index}
                    currentTime={time}
                />
            ))}
        </div>
    );
}

// Pre-configured with data analytics tools
const analyticsTools: Logo[] = [
    { id: 1, name: "Excel", src: "https://img.icons8.com/color/96/microsoft-excel-2019.png" },
    { id: 2, name: "Power BI", src: "https://img.icons8.com/color/96/power-bi.png" },
    { id: 3, name: "Python", src: "https://img.icons8.com/color/96/python.png" },
    { id: 4, name: "SQL", src: "https://img.icons8.com/color/96/sql.png" },
    { id: 5, name: "Tableau", src: "https://img.icons8.com/color/96/tableau-software.png" },
    { id: 6, name: "Google Analytics", src: "https://img.icons8.com/color/96/google-analytics.png" },
    { id: 7, name: "PostgreSQL", src: "https://img.icons8.com/color/96/postgreesql.png" },
    { id: 8, name: "Google Sheets", src: "https://img.icons8.com/color/96/google-sheets.png" },
    { id: 9, name: "BigQuery", src: "https://img.icons8.com/color/96/google-cloud.png" },
    { id: 10, name: "Looker", src: "https://img.icons8.com/color/96/google-logo.png" },
];

export function SkillsCarousel() {
    return (
        <div className="py-12">
            <div className="text-center space-y-4 mb-8">
                <p className="text-sm font-medium tracking-widest text-[#d4a853]">
                    TOOLS & TECHNOLOGIES
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    My Analytics Toolkit
                </h2>
            </div>
            <LogoCarousel logos={analyticsTools} columns={5} />
        </div>
    );
}
