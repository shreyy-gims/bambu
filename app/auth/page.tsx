'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ForgotPasswordModal } from '@/components/forgot-password-modal'
import { Mail, Lock, User, Phone, Chrome } from 'lucide-react'

export default function AuthPage() {
  const router = useRouter()
  const { login, signup, adminLogin } = useAuth()
  const [mode, setMode] = useState<'choice' | 'login' | 'signup'>('choice')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [instagramHandle, setInstagramHandle] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Check if this is admin credentials
      if (email === 'admin@bamboo.com' && password === 'admin123') {
        await adminLogin(email, password)
        router.push('/admin')
        return
      }

      // Regular client login - go directly to dashboard
      await login(email, password)
      router.push('/client')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match')
        setIsLoading(false)
        return
      }

      if (!name.trim() || !phone.trim() || !instagramHandle.trim()) {
        setError('All fields are required')
        setIsLoading(false)
        return
      }

      await signup(email, password)
      // Store additional profile info in localStorage
      const userData = JSON.parse(localStorage.getItem('bamboo_user') || '{}')
      userData.name = name
      userData.phone = phone
      userData.instagramHandle = instagramHandle
      localStorage.setItem('bamboo_user', JSON.stringify(userData))

      // Redirect directly to dashboard
      router.push('/client')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setIsLoading(true)
    try {
      const googleEmail = 'user@gmail.com'
      await signup(googleEmail, 'google-auth-token')
      // Redirect directly to dashboard after Google sign-in
      router.push('/client')
    } catch (err) {
      setError('Google sign-in failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Choice Screen */}
        {mode === 'choice' && (
          <div className="glass rounded-2xl border-white/20 p-8 animate-fadeInSlideUp text-center space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">The Bamboo Story</h1>
              <p className="text-foreground/60">Welcome to our eco-friendly community</p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => {
                  setMode('login')
                  setError('')
                }}
                className="w-full h-12 rounded-xl text-base font-semibold"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  setMode('signup')
                  setError('')
                }}
                variant="outline"
                className="w-full h-12 rounded-xl text-base font-semibold border-white/30"
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}

        {/* Login Screen */}
        {mode === 'login' && (
          <div className="glass rounded-2xl border-white/20 p-8 animate-fadeInSlideUp space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
              <p className="text-sm text-foreground/60 mt-1">Sign in to your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
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

              {error && (
                <div className="p-3 bg-destructive/20 border border-destructive/40 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Google Sign-In */}
            <div>
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-gradient-to-b from-background to-primary/20 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                variant="outline"
                className="w-full h-11 rounded-xl border-white/30 hover:bg-white/10 flex items-center justify-center gap-2"
              >
                <Chrome className="w-4 h-4" />
                Google
              </Button>
            </div>

            {/* Forgot Password Link */}
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="w-full text-sm text-primary/80 hover:text-primary hover:underline text-center"
            >
              Forgot your password?
            </button>

            {/* Back Button */}
            <Button
              type="button"
              onClick={() => {
                setMode('choice')
                setEmail('')
                setPassword('')
                setError('')
              }}
              variant="ghost"
              className="w-full"
            >
              Back
            </Button>

            <ForgotPasswordModal
              isOpen={showForgotPassword}
              onClose={() => setShowForgotPassword(false)}
              onBack={() => setShowForgotPassword(false)}
            />
          </div>
        )}

        {/* Signup Screen */}
        {mode === 'signup' && (
          <div className="glass rounded-2xl border-white/20 p-8 animate-fadeInSlideUp space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Create Account</h2>
              <p className="text-sm text-foreground/60 mt-1">Join our eco-friendly community</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
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
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2 bg-white/50 border-white/30 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="mt-2 bg-white/50 border-white/30 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Instagram Handle</label>
                <div className="relative mt-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                  <Input
                    type="text"
                    placeholder="username"
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                    required
                    className="mt-0 pl-8 bg-white/50 border-white/30 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2 bg-white/50 border-white/30 rounded-lg"
                />
              </div>

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

              {error && (
                <div className="p-3 bg-destructive/20 border border-destructive/40 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            {/* Google Sign-In */}
            <div>
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-gradient-to-b from-background to-primary/20 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                variant="outline"
                className="w-full h-11 rounded-xl border-white/30 hover:bg-white/10 flex items-center justify-center gap-2"
              >
                <Chrome className="w-4 h-4" />
                Google
              </Button>
            </div>

            {/* Back Button */}
            <Button
              type="button"
              onClick={() => {
                setMode('choice')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                setName('')
                setPhone('')
                setInstagramHandle('')
                setError('')
              }}
              variant="ghost"
              className="w-full"
            >
              Back
            </Button>
          </div>
        )}

        {/* Demo Info */}
        {mode !== 'choice' && (
          <div className="mt-4 text-center text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg">
            <p>Demo: Admin credentials are admin@bamboo.com / admin123</p>
          </div>
        )}
      </div>
    </div>
  )
}
