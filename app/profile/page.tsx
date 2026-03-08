'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingPage } from '@/components/loading-page'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoading: isAuthLoading, isAuthenticated, saveProfile } = useAuth()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLoading, setShowLoading] = useState(true)

  // Initialize form with existing user data
  useEffect(() => {
    if (!isAuthLoading) {
      setShowLoading(false)
      if (!isAuthenticated) {
        router.push('/auth')
      } else if (user) {
        setName(user.name)
        setPhone(user.phone)
      }
    }
  }, [isAuthLoading, isAuthenticated, user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (!name.trim() || !phone.trim()) {
        setError('Name and phone number are required')
        return
      }

      if (!user) throw new Error('No user found')

      await saveProfile({
        email: user.email,
        name: name.trim(),
        phone: phone.trim(),
        xp: user.xp,
        level: user.level,
      })

      router.push('/client')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showLoading) {
    return <LoadingPage />
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/20 flex items-center justify-center p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Profile card */}
      <div className="relative w-full max-w-md">
        <div className="glass rounded-3xl p-8 space-y-6 animate-fadeInSlideUp">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Complete Your Profile</h1>
            <p className="text-muted-foreground text-sm">
              Tell us a bit about yourself to get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <Input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2 bg-white/50 border-white/30"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-2 bg-white/50 border-white/30 rounded-lg"
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/20 border border-destructive/40 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              {isSubmitting ? 'Saving...' : 'Continue to Dashboard'}
            </Button>
          </form>

          {/* Info */}
          <p className="text-xs text-muted-foreground text-center p-3 bg-muted/50 rounded-lg">
            This information will be displayed on your public profile
          </p>
        </div>
      </div>
    </div>
  )
}
