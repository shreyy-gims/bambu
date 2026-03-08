'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ForgotPasswordModal } from '@/components/forgot-password-modal'
import { Mail, Lock, Phone, Chrome } from 'lucide-react'

export default function AuthPage() {
  const router = useRouter()
  const { login, signup } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneOtp, setPhoneOtp] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showPhoneOtp, setShowPhoneOtp] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)

  const handleSendPhoneOtp = async () => {
    setError('')
    if (!phone) {
      setError('Please enter your phone number')
      return
    }
    // Simulate sending OTP
    setShowPhoneOtp(true)
  }

  const handleVerifyPhoneOtp = async () => {
    setError('')
    if (!phoneOtp || phoneOtp.length !== 6) {
      setError('Please enter a valid 6-digit OTP')
      return
    }
    // Simulate OTP verification
    setPhoneVerified(true)
    setShowPhoneOtp(false)
    setError('')
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setIsLoading(true)
    try {
      // Simulate Google OAuth
      const googleEmail = 'user@gmail.com'
      await signup(googleEmail, 'google-auth-token')
      router.push('/profile')
    } catch (err) {
      setError('Google sign-in failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (isSignUp && !phoneVerified && phone) {
        setError('Please verify your phone number first')
        setIsLoading(false)
        return
      }

      if (isSignUp) {
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          setIsLoading(false)
          return
        }
        await signup(email, password)
      } else {
        await login(email, password)
      }
      router.push('/profile')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/20 flex items-center justify-center p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Auth card */}
      <div className="relative w-full max-w-md">
        <div className="glass rounded-3xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Bamboo Story</h1>
            <p className="text-muted-foreground">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 bg-white/50 border-white/30 rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 bg-white/50 border-white/30 rounded-lg"
              />
            </div>

            {isSignUp && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="mt-2 bg-white/50 border-white/30 rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={phoneVerified}
                      className="flex-1 bg-white/50 border-white/30 rounded-lg"
                    />
                    <Button
                      type="button"
                      onClick={handleSendPhoneOtp}
                      disabled={!phone || phoneVerified || isLoading}
                      variant="outline"
                      className="rounded-lg"
                    >
                      {phoneVerified ? '✓ Verified' : 'Send OTP'}
                    </Button>
                  </div>
                </div>

                {showPhoneOtp && !phoneVerified && (
                  <div>
                    <label className="text-sm font-medium text-foreground">OTP Code</label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        type="text"
                        placeholder="000000"
                        maxLength={6}
                        value={phoneOtp}
                        onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, ''))}
                        className="flex-1 bg-white/50 border-white/30 rounded-lg text-center text-lg tracking-widest"
                      />
                      <Button
                        type="button"
                        onClick={handleVerifyPhoneOtp}
                        disabled={phoneOtp.length !== 6 || isLoading}
                        className="rounded-lg"
                      >
                        Verify
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {error && (
              <div className="p-3 bg-destructive/20 border border-destructive/40 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              {isLoading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-gradient-to-b from-background to-primary/20 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign-In */}
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            variant="outline"
            className="w-full h-11 rounded-xl border-white/30 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <Chrome className="w-4 h-4" />
            Continue with Google
          </Button>

          {/* Toggle and Links */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 justify-center text-sm">
              <span className="text-muted-foreground">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              </span>
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                  setPhoneVerified(false)
                  setPhone('')
                  setPhoneOtp('')
                  setShowPhoneOtp(false)
                }}
                className="text-primary font-semibold hover:underline"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>

            {!isSignUp && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-primary/80 hover:text-primary hover:underline transition-colors"
                >
                  Forgot your password?
                </button>
              </div>
            )}
          </div>

          {/* Demo info */}
          <div className="text-center text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg">
            <p>Demo: Use any email/password, Google, or test OTP: 123456</p>
          </div>

          {/* Forgot Password Modal */}
          <ForgotPasswordModal
            isOpen={showForgotPassword}
            onClose={() => setShowForgotPassword(false)}
            onBack={() => setShowForgotPassword(false)}
          />
        </div>
      </div>
    </div>
  )
}
