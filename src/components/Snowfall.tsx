'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function Snowfall() {
    const [snowflakes, setSnowflakes] = useState<{ id: number; left: number; duration: number; delay: number; size: number; opacity: number }[]>([])

    useEffect(() => {
        setSnowflakes(Array.from({ length: 70 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            duration: 5 + Math.random() * 8, // Slower, more varying speed
            delay: Math.random() * 5,
            size: Math.random() < 0.3 ? 8 : Math.random() < 0.6 ? 4 : 2, // 30% large, 30% medium, 40% small
            opacity: Math.random() * 0.5 + 0.3
        })))
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {snowflakes.map((flake) => (
                <motion.div
                    key={flake.id}
                    className="absolute -top-4 bg-white rounded-full"
                    style={{
                        left: `${flake.left}%`,
                        width: flake.size,
                        height: flake.size,
                        opacity: flake.opacity,
                        filter: `blur(${flake.size > 5 ? 1 : 0.5}px)`
                    }}
                    animate={{
                        y: ['-10vh', '110vh'],
                        x: [0, Math.random() * 40 - 20] // More sway
                    }}
                    transition={{
                        duration: flake.duration,
                        repeat: Infinity,
                        delay: flake.delay,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    )
}
