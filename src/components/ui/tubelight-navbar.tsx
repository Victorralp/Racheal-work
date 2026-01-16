"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
    name: string
    url: string
    icon: LucideIcon
}

interface NavBarProps {
    items: NavItem[]
    className?: string
}

export function NavBar({ items, className }: NavBarProps) {
    const location = useLocation()
    const [activeTab, setActiveTab] = useState(() => {
        const current = items.find(item => item.url === location.pathname)
        return current?.name || items[0].name
    })
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Update active tab when location changes
    useEffect(() => {
        const current = items.find(item => item.url === location.pathname)
        if (current) {
            setActiveTab(current.name)
        }
    }, [location.pathname, items])

    return (
        <div
            className={cn(
                "fixed left-1/2 -translate-x-1/2 z-50",
                "top-4 sm:top-6", // Always at top
                "pointer-events-auto",
                className,
            )}
        >
            <div className="flex items-center gap-2 sm:gap-3 bg-white/90 border border-gray-200 backdrop-blur-lg py-1.5 px-2 rounded-full shadow-lg">
                {items.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.name

                    return (
                        <Link
                            key={item.name}
                            to={item.url}
                            onClick={() => setActiveTab(item.name)}
                            className={cn(
                                "relative cursor-pointer text-sm font-semibold px-4 sm:px-6 py-2 rounded-full transition-colors",
                                "text-gray-600 hover:text-[#d4a853]",
                                isActive && "bg-[#d4a853]/10 text-[#d4a853]",
                            )}
                        >
                            <span className="hidden md:inline">{item.name}</span>
                            <span className="md:hidden">
                                <Icon size={18} strokeWidth={2.5} />
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="lamp"
                                    className="absolute inset-0 w-full bg-[#d4a853]/5 rounded-full -z-10"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                >
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#d4a853] rounded-t-full">
                                        <div className="absolute w-12 h-6 bg-[#d4a853]/20 rounded-full blur-md -top-2 -left-2" />
                                        <div className="absolute w-8 h-6 bg-[#d4a853]/20 rounded-full blur-md -top-1" />
                                        <div className="absolute w-4 h-4 bg-[#d4a853]/20 rounded-full blur-sm top-0 left-2" />
                                    </div>
                                </motion.div>
                            )}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

