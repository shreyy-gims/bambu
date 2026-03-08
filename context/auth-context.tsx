'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface UserProfile {
  id: string
  email: string
  name: string
  phone: string
  xp: number
  level: number
  role?: 'client' | 'admin'
}

interface AuthContextType {
  user: UserProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  userRole: 'client' | 'admin' | null
  login: (email: string, password: string) => Promise<void>
  adminLogin: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  saveProfile: (profile: Omit<UserProfile, 'id'>) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<'client' | 'admin' | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      try {
        const savedUser = localStorage.getItem('bamboo_user')
        const authToken = localStorage.getItem('bamboo_auth')
        const role = localStorage.getItem('bamboo_role') as 'client' | 'admin' | null

        if (savedUser && authToken) {
          const parsedUser = JSON.parse(savedUser)
          setUser(parsedUser)
          setIsAuthenticated(true)
          setUserRole(role || 'client')
        }
      } catch (error) {
        console.error('[v0] Session check error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call - in production, call your backend
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    // Mock authentication - for demo purposes
    const mockUser: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: '',
      phone: '',
      xp: 100,
      level: 1,
      role: 'client',
    }

    localStorage.setItem('bamboo_auth', 'token_' + Date.now())
    localStorage.setItem('bamboo_user', JSON.stringify(mockUser))
    localStorage.setItem('bamboo_role', 'client')
    setUser(mockUser)
    setIsAuthenticated(true)
    setUserRole('client')
  }

  const adminLogin = async (email: string, password: string) => {
    // Admin-only login - no signup, only pre-registered admins
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    // For demo: allow admin login with any email/password
    // In production, validate against backend
    const adminUser: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: 'Admin',
      phone: '',
      xp: 0,
      level: 0,
      role: 'admin',
    }

    localStorage.setItem('bamboo_auth', 'token_' + Date.now())
    localStorage.setItem('bamboo_user', JSON.stringify(adminUser))
    localStorage.setItem('bamboo_role', 'admin')
    setUser(adminUser)
    setIsAuthenticated(true)
    setUserRole('admin')
  }

  const signup = async (email: string, password: string) => {
    // Simulate API call - in production, call your backend
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    // Check if user already exists (in real app, backend would do this)
    const existingUser = localStorage.getItem('bamboo_user')
    if (existingUser) {
      const parsed = JSON.parse(existingUser)
      if (parsed.email === email) {
        throw new Error('Email already registered')
      }
    }

    // Mock signup
    const newUser: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: '',
      phone: '',
      xp: 0,
      level: 1,
      role: 'client',
    }

    localStorage.setItem('bamboo_auth', 'token_' + Date.now())
    localStorage.setItem('bamboo_user', JSON.stringify(newUser))
    localStorage.setItem('bamboo_role', 'client')
    setUser(newUser)
    setIsAuthenticated(true)
    setUserRole('client')
  }

  const saveProfile = async (profile: Omit<UserProfile, 'id'>) => {
    if (!user) throw new Error('No user logged in')

    const updatedUser: UserProfile = {
      ...user,
      ...profile,
    }

    localStorage.setItem('bamboo_user', JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  const logout = () => {
    localStorage.removeItem('bamboo_auth')
    localStorage.removeItem('bamboo_user')
    localStorage.removeItem('bamboo_role')
    setUser(null)
    setIsAuthenticated(false)
    setUserRole(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        userRole,
        login,
        adminLogin,
        signup,
        saveProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
