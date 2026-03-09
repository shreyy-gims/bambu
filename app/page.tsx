'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { LoadingPage } from '@/components/loading-page';

export default function LandingPage() {
  const [isEntering, setIsEntering] = useState(false);
  const [role, setRole] = useState<'client' | 'admin' | null>(null);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading page on initial mount to check session
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push('/client');
      }
    }
  }, [isLoading, isAuthenticated, router]);

  const handleEnter = () => {
    setRole('client');
    setIsEntering(true);
    setTimeout(() => {
      if (isAuthenticated) {
        router.push('/client');
      } else {
        router.push('/auth');
      }
    }, 600);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-3xl bg-primary/20 animate-float" style={{ animationDuration: '8s' }} />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full blur-3xl bg-accent/20 animate-float" style={{ animationDuration: '10s', animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-screen px-4">
        <div className="w-full max-w-2xl text-center animate-fadeInSlideUp">
          {/* Logo/Title area */}
          <div className="mb-8 md:mb-12">
            <div className="inline-block mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl md:text-4xl font-bold">
                🎋
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance">
              The Bamboo Story
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-lg mx-auto text-balance">
              Discover sustainable bamboo products, earn rewards, and shape our future through your votes.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 md:mb-16">
            <div className="glass rounded-2xl p-6 md:p-8 text-center hover:bg-white/40 transition-colors">
              <div className="text-3xl mb-3">🌿</div>
              <h3 className="font-semibold text-foreground mb-2">Eco-Friendly</h3>
              <p className="text-sm text-foreground/60">100% sustainable bamboo products</p>
            </div>
            <div className="glass rounded-2xl p-6 md:p-8 text-center hover:bg-white/40 transition-colors">
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="font-semibold text-foreground mb-2">Earn Rewards</h3>
              <p className="text-sm text-foreground/60">Get points with every purchase</p>
            </div>
            <div className="glass rounded-2xl p-6 md:p-8 text-center hover:bg-white/40 transition-colors">
              <div className="text-3xl mb-3">🗳️</div>
              <h3 className="font-semibold text-foreground mb-2">Vote Together</h3>
              <p className="text-sm text-foreground/60">Shape what we create next</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => handleEnter()}
              disabled={isEntering}
              className={`h-12 px-12 text-base font-semibold rounded-full transition-all ${
                isEntering ? 'opacity-0 scale-95' : ''
              }`}
              size="lg"
            >
              Start Shopping
            </Button>
          </div>

          {/* Footer text */}
          <div className="mt-16 text-sm text-foreground/50">
            <p>Join our journey towards sustainable living</p>
          </div>
        </div>
      </div>
    </div>
  );
}
