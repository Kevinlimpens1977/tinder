'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header, PrimaryButton, SecondaryButton } from '@/components'
import { supabase } from '@/lib/supabase'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!password) {
      setError('Vul het wachtwoord in')
      return
    }

    setLoading(true)
    setError(null)

    try {
      if (password === '1') {
        localStorage.setItem('admin_authenticated', 'true')
        router.push('/admin')
      } else {
        setError('Ongeldig wachtwoord')
      }
    } catch (error) {
      setError('Er is een fout opgetreden')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header title="Admin Login" />
      
      <main className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600">
              Log in om gerechten te beheren
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Password Login Form */}
          <form onSubmit={handleLogin} className="space-y-6 mb-8">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Wachtwoord
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Wachtwoord"
                required
              />
            </div>

            <PrimaryButton
              type="submit"
              disabled={loading}
              fullWidth
              className="py-3"
            >
              {loading ? 'Inloggen...' : 'Inloggen'}
            </PrimaryButton>
          </form>

          {/* Back to App */}
          <div className="mt-8 text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
              Terug naar DinnerSwipe
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}