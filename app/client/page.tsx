'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import ClientNavbar from '@/components/client-navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Star, CheckCircle, Bell, User, ArrowRight } from 'lucide-react';
import { LoadingPage } from '@/components/loading-page';

const features = [
  {
    id: 'order',
    title: 'Place Order',
    description: 'Browse and purchase our eco-friendly bamboo products',
    icon: ShoppingCart,
    color: 'from-primary to-primary/80',
    href: '/client/order',
    stats: '12 products',
  },
  {
    id: 'rewards',
    title: 'Rewards',
    description: 'Collect points and redeem exclusive benefits',
    icon: Star,
    color: 'from-accent to-accent/80',
    href: '/client/rewards',
    stats: '2,450 points',
  },
  {
    id: 'vote',
    title: 'Vote',
    description: 'Help us decide what to create next',
    icon: CheckCircle,
    color: 'from-secondary to-secondary/80',
    href: '/client/vote',
    stats: '3 active polls',
  },
  {
    id: 'announcements',
    title: 'News',
    description: 'Stay updated with latest announcements',
    icon: Bell,
    color: 'from-primary/60 to-accent/60',
    href: '/client/announcements',
    stats: '8 new updates',
  },
  {
    id: 'account',
    title: 'My Account',
    description: 'Manage your profile and preferences',
    icon: User,
    color: 'from-secondary/60 to-primary/60',
    href: '/client/profile',
    stats: 'View details',
  },
];

export default function ClientDashboard() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <ClientNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header section */}
        <div className="mb-12 animate-fadeInSlideUp">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Welcome to Bamboo Story
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Your gateway to sustainable living. Explore products, earn rewards, and be part of our growing eco-conscious community.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.id}
                href={feature.href}
                className="group animate-fadeInSlideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full glass rounded-2xl border-white/20 hover:border-white/40 hover:bg-white/40 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-3`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary">{feature.stats}</span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeInSlideUp" style={{ animationDelay: '300ms' }}>
          <Card className="glass rounded-2xl border-white/20">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-foreground/70">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">24</div>
              <p className="text-xs text-foreground/50 mt-2">Lifetime purchases</p>
            </CardContent>
          </Card>

          <Card className="glass rounded-2xl border-white/20">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-foreground/70">Active Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">2,450</div>
              <p className="text-xs text-foreground/50 mt-2">Ready to redeem</p>
            </CardContent>
          </Card>

          <Card className="glass rounded-2xl border-white/20">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-foreground/70">Member Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">Gold</div>
              <p className="text-xs text-foreground/50 mt-2">Premium member</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
