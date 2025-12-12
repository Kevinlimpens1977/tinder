'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams, notFound } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { runTournament, DishWithScore, TournamentResult } from '@/lib/tournament'
import { Category, CATEGORIES } from '@/types'
import { PageContainer } from '@/components/ui/PageContainer'
import { GlassCard } from '@/components/ui/GlassCard'
import { Snowfall } from '@/components/Snowfall'
import Image from 'next/image'

export default function DuelPage() {
  const params = useParams()
  const category = params.category as Category
  const router = useRouter()

  if (!CATEGORIES.find(cat => cat.value === category)) {
    notFound()
  }

  const [tournamentResult, setTournamentResult] = useState<TournamentResult | null>(null)
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(`dishes_${category}`)

    if (stored) {
      const parsedDishes: DishWithScore[] = JSON.parse(stored)
      const filteredDishes = parsedDishes.filter(dish => dish.score > 0)

      if (filteredDishes.length <= 1) {
        // Skip tournament if 0 or 1 dish
        const result: TournamentResult = {
          rankedDishes: filteredDishes,
          matches: []
        }
        setTournamentResult(result)
        localStorage.setItem(`tournament_${category}`, JSON.stringify(result))
        router.push(`/top3/${category}`)
        return
      }

      setTournamentResult(runTournament(filteredDishes))
      setIsLoading(false)
    } else {
      router.push(`/swipe/${category}`)
    }
  }, [category, router])

  const handleChoice = (winner: DishWithScore) => {
    if (!tournamentResult) return
    const nextIndex = currentMatchIndex + 1

    if (nextIndex >= tournamentResult.matches.length) {
      localStorage.setItem(`tournament_${category}`, JSON.stringify(tournamentResult))
      router.push(`/top3/${category}`)
    } else {
      setCurrentMatchIndex(nextIndex)
    }
  }

  if (isLoading || !tournamentResult) return null

  const currentMatch = tournamentResult.matches[currentMatchIndex]
  if (!currentMatch) return null

  return (
    <PageContainer>
      <Snowfall />
      <div className="absolute top-4 w-full text-center z-20">
        <span className="bg-white/30 backdrop-blur px-4 py-1 rounded-full text-sm font-bold text-gray-800 shadow-sm">
          Duel {currentMatchIndex + 1} / {tournamentResult.matches.length}
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-6 py-4 relative w-full h-full max-w-md mx-auto z-10">
        <DishOption
          dish={currentMatch.dish1}
          onClick={() => handleChoice(currentMatch.dish1)}
          label="A"
        />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-white rounded-full p-3 shadow-[0_0_20px_rgba(212,175,55,0.4)] border-4 border-[#D4AF37]">
          <span className="text-xl font-black text-[#D4AF37]">VS</span>
        </div>

        <DishOption
          dish={currentMatch.dish2}
          onClick={() => handleChoice(currentMatch.dish2)}
          label="B"
        />
      </div>
    </PageContainer>
  )
}

function DishOption({ dish, onClick, label }: { dish: DishWithScore, onClick: () => void, label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 relative rounded-[32px] overflow-hidden bg-white shadow-xl cursor-pointer group border-4 border-[#D4AF37] hover:scale-[1.02] active:scale-95 transition-all flex flex-col"
      onClick={onClick}
    >
      <div className="h-[55%] w-full bg-gray-50 relative">
        <Image
          src={dish.image_url}
          alt={dish.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 300px"
        />
        <div className="absolute top-3 left-3 bg-[#D4AF37] rounded-full w-8 h-8 flex items-center justify-center shadow-lg text-sm font-bold text-white z-10 border border-white/20">
          {label}
        </div>
      </div>

      <div className="h-[45%] p-5 flex flex-col items-center text-center justify-center bg-white relative z-0">
        <h3 className="text-lg font-black text-gray-900 leading-snug mb-2 line-clamp-2">{dish.name}</h3>
        {dish.subtitle && (
          <p className="text-gray-500 text-xs font-medium line-clamp-3 leading-relaxed opacity-80">{dish.subtitle}</p>
        )}
      </div>
    </motion.div>
  )
}
