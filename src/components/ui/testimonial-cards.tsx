"use client";

import * as React from 'react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
    handleShuffle: () => void;
    testimonial: string;
    position: "front" | "middle" | "back";
    id: number;
    author: string;
    role: string;
}

export function TestimonialCard({ handleShuffle, testimonial, position, id, author, role }: TestimonialCardProps) {
    const dragRef = React.useRef(0);
    const isFront = position === "front";

    return (
        <motion.div
            style={{
                zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0"
            }}
            animate={{
                rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
                x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%"
            }}
            drag={true}
            dragElastic={0.35}
            dragListener={isFront}
            dragConstraints={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}
            onDragStart={(e: any) => {
                dragRef.current = e.clientX;
            }}
            onDragEnd={(e: any) => {
                if (dragRef.current - e.clientX > 150) {
                    handleShuffle();
                }
                dragRef.current = 0;
            }}
            transition={{ duration: 0.35 }}
            className={`absolute left-0 top-0 grid h-[400px] w-[320px] select-none place-content-center space-y-6 rounded-2xl border-2 border-[#d4a853]/30 bg-white p-6 shadow-xl ${isFront ? "cursor-grab active:cursor-grabbing" : ""
                }`}
        >
            <img
                src={`https://i.pravatar.cc/128?img=${id}`}
                alt={`Avatar of ${author}`}
                className="pointer-events-none mx-auto h-24 w-24 rounded-full border-4 border-[#d4a853]/20 bg-gray-100 object-cover"
            />
            <span className="text-center text-base italic text-gray-600 leading-relaxed">"{testimonial}"</span>
            <div className="text-center">
                <p className="font-semibold text-gray-900">{author}</p>
                <p className="text-sm text-[#d4a853]">{role}</p>
            </div>
        </motion.div>
    );
}

// Pre-configured testimonials for a data analyst
const testimonials = [
    {
        id: 12,
        testimonial: "Rachael transformed our messy data into clear insights that helped us increase revenue by 40%. Her dashboards are now essential to our daily operations.",
        author: "Sarah Mitchell",
        role: "VP of Operations @ TechFlow"
    },
    {
        id: 25,
        testimonial: "The automated reporting system she built saves our team 15+ hours every week. Best investment we've made this year.",
        author: "David Chen",
        role: "Finance Director @ StartupHub"
    },
    {
        id: 33,
        testimonial: "Her SQL and Power BI expertise helped us identify $2M in cost savings. Incredibly talented analyst with great communication skills.",
        author: "Emily Rodriguez",
        role: "CEO @ DataFirst Solutions"
    }
];

export function TestimonialSection() {
    const [positions, setPositions] = React.useState<("front" | "middle" | "back")[]>(["front", "middle", "back"]);

    const handleShuffle = () => {
        const newPositions = [...positions];
        const last = newPositions.pop();
        if (last) newPositions.unshift(last);
        setPositions(newPositions as ("front" | "middle" | "back")[]);
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <p className="text-sm font-medium tracking-widest text-[#d4a853] mb-4">
                        TESTIMONIALS
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What Clients Say
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Drag the cards to see more testimonials
                    </p>
                </div>

                <div className="flex justify-center">
                    <div className="relative h-[420px] w-[320px] md:w-[450px]">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={testimonial.id}
                                {...testimonial}
                                handleShuffle={handleShuffle}
                                position={positions[index]}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
