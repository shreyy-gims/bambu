'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Home, ShoppingCart, Star, CheckCircle, Bell, User, LogOut } from 'lucide-react';

export default function ClientNavbar() {
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/client" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm">
              🎋
            </div>
            <span className="text-foreground">Bamboo</span>
          </Link>

          {/* Nav Links - hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/client" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link href="/client/order" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition">
              <ShoppingCart className="w-4 h-4" />
              Order
            </Link>
            <Link href="/client/rewards" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition">
              <Star className="w-4 h-4" />
              Rewards
            </Link>
            <Link href="/client/vote" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition">
              <CheckCircle className="w-4 h-4" />
              Vote
            </Link>
            <Link href="/client/announcements" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition">
              <Bell className="w-4 h-4" />
              News
            </Link>
          </div>

          {/* Right section - XP Progress and Avatar */}
          <div className="flex items-center gap-4">
            {/* XP Progress Bar */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-gradient-to-r from-primary to-accent"></div>
              </div>
              <span className="text-xs text-foreground/60 font-medium">450 XP</span>
            </div>

            {/* Avatar and dropdown */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold hover:shadow-lg transition cursor-pointer" title={user?.name || 'Profile'}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden sm:flex gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
