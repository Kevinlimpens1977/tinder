'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PageContainer } from '@/components/ui/PageContainer'
import { GlassCard } from '@/components/ui/GlassCard'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Snowfall } from '@/components/Snowfall'

export default function ResultsPage() {
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadResults()
    }, [])

    const loadResults = async () => {
        try {
            // Fetch user menus with dish details
            const { data, error } = await supabase
                .from('user_menus')
                .select(`
            id,
            user_name,
            created_at,
            starter: starter_id ( name, image_url ),
            main: main_id ( name, image_url ),
            dessert: dessert_id ( name, image_url )
        `)
                .order('created_at', { ascending: false })

            if (error) throw error
            setResults(data || [])
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <PageContainer>
            <Snowfall />
            <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto py-8 pb-20 overflow-y-auto h-full relative z-10 px-4">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-white drop-shadow-md mb-2">Ingezonden Menu's</h1>
                    <p className="text-white/80 font-medium">
                        Bekijk wat anderen hebben gekozen!
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-20 animate-pulse">
                        <div className="text-4xl mb-4">⏳</div>
                        <p className="text-white/70">Laden...</p>
                    </div>
                ) : results.length === 0 ? (
                    <div className="text-center py-20 opacity-50">
                        <p className="text-white">Nog geen inzendingen.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {results.map((entry, i) => (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <GlassCard className="!p-6 border-4 border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                                    <div className="flex justify-between items-baseline mb-4 border-b border-gray-100 pb-2">
                                        <h3 className="text-xl font-bold text-gray-800">
                                            {entry.user_name}
                                        </h3>
                                        <span className="text-xs text-gray-400 font-medium">
                                            {new Date(entry.created_at).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        <DishMini dish={entry.starter} label="Voor" />
                                        <DishMini dish={entry.main} label="Hoofd" />
                                        <DishMini dish={entry.dessert} label="Na" />
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="fixed bottom-8 left-0 w-full flex justify-center pointer-events-none z-20">
                    <Link href="/start" className="pointer-events-auto shadow-xl">
                        <button className="px-6 py-3 bg-[#D4AF37] hover:bg-[#C5A028] text-white rounded-full font-bold hover:scale-105 transition-transform border-2 border-white/20">
                            ← Terug
                        </button>
                    </Link>
                </div>
            </div>
        </PageContainer>
    )
}

function DishMini({ dish, label }: { dish: any, label: string }) {
    if (!dish) return (
        <div className="bg-gray-50 rounded-xl p-2 text-center flex flex-col items-center justify-center min-h-[80px]">
            <span className="text-[10px] uppercase text-gray-400 font-bold mb-1">{label}</span>
            <span className="text-gray-300 text-xl">-</span>
        </div>
    )

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-2 text-center flex flex-col items-center shadow-sm">
            <span className="text-[10px] uppercase text-rose-500 font-bold mb-1">{label}</span>
            {dish.image_url ? (
                <div className="w-full aspect-square rounded-lg overflow-hidden mb-1 relative">
                    <img src={dish.image_url} className="object-cover absolute inset-0 w-full h-full" />
                </div>
            ) : (
                <span className="text-xl mb-1">🍽️</span>
            )}
            <p className="text-xs font-medium text-gray-700 line-clamp-1 w-full overflow-hidden text-ellipsis">
                {dish.name}
            </p>
        </div>
    )
}
