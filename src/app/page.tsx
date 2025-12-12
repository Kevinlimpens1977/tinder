'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PageContainer } from '@/components/ui/PageContainer'
import { GlassCard } from '@/components/ui/GlassCard'
import { useHaptic } from '@/hooks/useHaptic'

export default function InvitationPage() {
  const { impactLight } = useHaptic()

  return (
    <PageContainer>
      <div className="flex-1 flex flex-col items-center w-full max-w-lg mx-auto py-8">

        {/* Video Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-48 h-48 mb-8 rounded-[2rem] overflow-hidden border-4 border-white/80 shadow-2xl shadow-rose-200/50"
        >
          <video
            src="https://igpfvcihykgouwiulxwn.supabase.co/storage/v1/object/public/dish-images/logo.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Main Invitation Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full"
        >
          <GlassCard className="!p-8 text-center space-y-6 !bg-white/90">
            <div className="space-y-2">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-[0.2em]">Exclusief</span>
              <h1 className="text-3xl font-black text-gray-900 leading-tight">
                Officiële Uitnodiging
              </h1>
            </div>

            <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto rounded-full" />

            <div className="space-y-4 text-left bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
              <InfoRow icon="📍" label="Waar" value="Feurthstraat 84, 6114CX in Susteren" />
              <InfoRow icon="📅" label="Wanneer" value="Zaterdag 20 december vanaf 19.00 uur" />
              <InfoRow icon="⏰" label="Tot" value="Geen eindtijd" />
            </div>

            <div className="text-gray-600 font-medium leading-relaxed text-sm space-y-4">
              <p>
                🍽️ <span className="text-gray-900 font-bold">Neem veel honger en een lege buik mee.</span>
              </p>
              <p>
                Alvorens deel te kunnen nemen moet je eerst je menu voorkeur doorgeven via de Dinner Tinder App.
              </p>
              <p className="text-xs text-gray-500">
                Na invullen door iedereen kan de chef-kok en zijn gastvrouw aan de slag met de voorbereidingen.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 w-full px-4"
        >
          <Link href="/start" onClick={() => impactLight()}>
            <button className="w-full group relative bg-gray-900 text-white rounded-[2rem] p-5 shadow-xl hover:scale-[1.02] transition-all duration-300 active:scale-95">
              <span className="text-lg font-bold">Verder naar App →</span>
            </button>
          </Link>
        </motion.div>

      </div>
    </PageContainer>
  )
}

function InfoRow({ icon, label, value }: { icon: string, label: string, value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0 text-lg border border-gray-100">
        {icon}
      </div>
      <div>
        <span className="block text-xs font-bold text-gray-400 uppercase">{label}</span>
        <span className="block text-sm font-bold text-gray-800">{value}</span>
      </div>
    </div>
  )
}
