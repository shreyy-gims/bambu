'use client';

import ClientNavbar from '@/components/client-navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, MapPin, Phone, Calendar, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sarah Anderson',
    email: 'sarah.anderson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 15, 2023',
    bio: 'Passionate about sustainable living and eco-friendly products.',
  });

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <ClientNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 animate-fadeInSlideUp">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Account</h1>
          <p className="text-foreground/70">Manage your profile and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main profile card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile info card */}
            <Card className="glass rounded-2xl border-white/20 animate-fadeInSlideUp">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl shadow-lg">
                      👩
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
                      <p className="text-sm text-foreground/60">Member since {profile.joinDate}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="rounded-full"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    {isEditing ? 'Done' : 'Edit'}
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 py-3 border-b border-white/10">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-foreground/60">Email</p>
                      <p className="text-foreground font-medium">{profile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 py-3 border-b border-white/10">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-foreground/60">Phone</p>
                      <p className="text-foreground font-medium">{profile.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 py-3 border-b border-white/10">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-foreground/60">Location</p>
                      <p className="text-foreground font-medium">{profile.location}</p>
                    </div>
                  </div>

                  <div className="py-3">
                    <p className="text-xs text-foreground/60 mb-2">Bio</p>
                    <p className="text-foreground">{profile.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="glass rounded-2xl border-white/20 animate-fadeInSlideUp" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Email Notifications</p>
                      <p className="text-sm text-foreground/60">Get updates about orders and promotions</p>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Marketing Emails</p>
                        <p className="text-sm text-foreground/60">Receive special offers and new product launches</p>
                      </div>
                      <div className="w-12 h-6 bg-muted rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-foreground/30 rounded-full transition-all"></div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">SMS Notifications</p>
                        <p className="text-sm text-foreground/60">Get important updates via text message</p>
                      </div>
                      <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats card */}
            <Card className="glass rounded-2xl border-white/20 animate-fadeInSlideUp" style={{ animationDelay: '150ms' }}>
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-3 border-b border-white/10">
                    <p className="text-xs text-foreground/60 mb-1">Total Orders</p>
                    <p className="text-3xl font-bold text-primary">24</p>
                  </div>

                  <div className="text-center py-3 border-b border-white/10">
                    <p className="text-xs text-foreground/60 mb-1">Active Points</p>
                    <p className="text-3xl font-bold text-accent">2,450</p>
                  </div>

                  <div className="text-center py-3">
                    <p className="text-xs text-foreground/60 mb-1">Member Level</p>
                    <p className="text-3xl font-bold text-secondary">Gold</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="glass rounded-2xl border-white/20 animate-fadeInSlideUp" style={{ animationDelay: '200ms' }}>
              <CardContent className="pt-6 space-y-3">
                <Button className="w-full rounded-full" variant="outline">
                  Change Password
                </Button>
                <Button className="w-full rounded-full" variant="outline">
                  Download Data
                </Button>
                <Button
                  className="w-full rounded-full"
                  variant="destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="glass rounded-2xl border-white/20 animate-fadeInSlideUp" style={{ animationDelay: '250ms' }}>
              <CardHeader>
                <CardTitle className="text-sm">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70 mb-4">
                  Have questions? Our support team is here to help.
                </p>
                <Button className="w-full rounded-full" size="sm" variant="outline">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
