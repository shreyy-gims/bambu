'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Mail, Lock, CheckCircle } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

export function ForgotPasswordModal({ isOpen, onClose, onBack }: ForgotPasswordModalProps) {
  const [step, setStep] = useState<'email' | 'verification' | 'reset' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email) {
      setError('Please enter your email');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setStep('verification');
      setLoading(false);
    }, 500);
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!verificationCode) {
      setError('Please enter the verification code');
      setLoading(false);
      return;
    }

    // Simulate API call - accept any 6-digit code
    if (verificationCode.length === 6) {
      setTimeout(() => {
        setStep('reset');
        setLoading(false);
      }, 500);
    } else {
      setError('Verification code must be 6 digits');
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setStep('success');
      setLoading(false);
    }, 500);
  };

  const handleClose = () => {
    setStep('email');
    setEmail('');
    setVerificationCode('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fadeIn">
      <Card className="w-full max-w-md glass rounded-2xl border-white/20 animate-fadeInSlideUp">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            {step !== 'email' && step !== 'success' && (
              <button
                onClick={() => setStep(step === 'verification' ? 'email' : 'verification')}
                className="flex-shrink-0 p-1 hover:bg-white/10 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5 text-foreground/70" />
              </button>
            )}
            <CardTitle>
              {step === 'email' && 'Forgot Password'}
              {step === 'verification' && 'Verify Email'}
              {step === 'reset' && 'Reset Password'}
              {step === 'success' && 'Success'}
            </CardTitle>
          </div>
          <CardDescription>
            {step === 'email' && 'Enter your email to receive a verification code'}
            {step === 'verification' && 'We sent a code to your email'}
            {step === 'reset' && 'Create a new password'}
            {step === 'success' && 'Your password has been reset'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-foreground/50" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 rounded-lg bg-white/10 border-white/20"
                  />
                </div>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg"
              >
                {loading ? 'Sending...' : 'Send Code'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="w-full rounded-lg"
              >
                Back to Login
              </Button>
            </form>
          )}

          {step === 'verification' && (
            <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Verification Code</label>
                <p className="text-xs text-foreground/60 mb-3">Check your email for the 6-digit code</p>
                <Input
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  className="rounded-lg bg-white/10 border-white/20 text-center text-2xl tracking-widest"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                disabled={loading || verificationCode.length !== 6}
                className="w-full rounded-lg"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep('email')}
                className="w-full rounded-lg"
              >
                Change Email
              </Button>
            </form>
          )}

          {step === 'reset' && (
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-foreground/50" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-10 rounded-lg bg-white/10 border-white/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-foreground/50" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 rounded-lg bg-white/10 border-white/20"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                disabled={loading || !newPassword || !confirmPassword}
                className="w-full rounded-lg"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <p className="text-foreground">Your password has been successfully reset!</p>
              <Button
                onClick={handleClose}
                className="w-full rounded-lg"
              >
                Back to Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
