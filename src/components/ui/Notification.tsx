'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, X } from 'lucide-react'

export type NotificationType = 'success' | 'error'

interface NotificationProps {
    message: string
    type: 'success' | 'error'
    onClose: () => void
}

export function Notification({ message, type, onClose }: NotificationProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 4000)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div className="fixed top-4 right-4 z-50 pointer-events-none">
            <div className="pointer-events-auto bg-white rounded-lg shadow-lg border border-gray-100 flex items-center p-4 gap-3 min-w-[300px]">
                {type === 'success' ? (
                    <CheckCircle className="text-green-500 w-5 h-5" />
                ) : (
                    <XCircle className="text-red-500 w-5 h-5" />
                )}
                <p className="flex-1 text-sm font-medium text-gray-800">
                    {message}
                </p>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
