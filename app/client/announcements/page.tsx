'use client';

import ClientNavbar from '@/components/client-navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Heart, MessageSquare, Share2 } from 'lucide-react';
import { useState } from 'react';

const announcements = [
  {
    id: 1,
    title: 'New Product Launch: Bamboo Yoga Mat',
    description: 'We are excited to announce the launch of our new eco-friendly bamboo yoga mat with premium grip and natural design.',
    date: 'Today',
    image: '🧘',
    category: 'Product',
    likes: 342,
    comments: 28,
  },
  {
    id: 2,
    title: 'Summer Sale Starts Now',
    description: 'Get up to 30% off on selected bamboo products. This sale is exclusively for our loyal community members. Limited time only!',
    date: '2 days ago',
    image: '🎉',
    category: 'Promotion',
    likes: 567,
    comments: 43,
  },
  {
    id: 3,
    title: 'Milestone: 100,000 Community Members',
    description: 'Thank you all for being part of our eco-friendly journey! We have reached 100,000 members and it\'s all because of your support.',
    date: '1 week ago',
    image: '🎊',
    category: 'Milestone',
    likes: 1203,
    comments: 156,
  },
  {
    id: 4,
    title: 'Sustainability Report 2024',
    description: 'Read our annual sustainability report highlighting how we reduced carbon footprint by 40% this year.',
    date: '2 weeks ago',
    image: '📊',
    category: 'Report',
    likes: 428,
    comments: 62,
  },
  {
    id: 5,
    title: 'Upcoming: Bamboo Store Opening',
    description: 'Our first physical retail store is opening next month in downtown! Join us for the grand opening celebration with special discounts.',
    date: '3 weeks ago',
    image: '🏪',
    category: 'Event',
    likes: 892,
    comments: 134,
  },
  {
    id: 6,
    title: 'Partner Spotlight: Local Artisans',
    description: 'We are proud to feature our partner artisans who handcraft our premium bamboo products with care and dedication.',
    date: '1 month ago',
    image: '👨‍🎨',
    category: 'Partnership',
    likes: 634,
    comments: 89,
  },
];

export default function AnnouncementsPage() {
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    if (likedIds.includes(id)) {
      setLikedIds(likedIds.filter(liked => liked !== id));
    } else {
      setLikedIds([...likedIds, id]);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Product: 'from-primary to-primary/80',
      Promotion: 'from-accent to-accent/80',
      Milestone: 'from-secondary to-secondary/80',
      Report: 'from-primary/60 to-accent/60',
      Event: 'from-accent/60 to-secondary/60',
      Partnership: 'from-secondary/60 to-primary/60',
    };
    return colors[category] || 'from-primary to-accent';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <ClientNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 animate-fadeInSlideUp">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Bell className="w-8 h-8 text-primary" />
            News & Announcements
          </h1>
          <p className="text-foreground/70">Stay updated with our latest news and community updates</p>
        </div>

        <div className="space-y-6">
          {announcements.map((announcement, index) => (
            <Card
              key={announcement.id}
              className="glass rounded-2xl border-white/20 hover:border-white/40 overflow-hidden hover:shadow-lg transition-all animate-fadeInSlideUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${getCategoryColor(announcement.category)} flex items-center justify-center text-2xl`}>
                      {announcement.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <span className="text-xs font-semibold px-2 py-1 bg-muted text-foreground rounded-full">
                          {announcement.category}
                        </span>
                      </div>
                      <p className="text-xs text-foreground/50">{announcement.date}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-base text-foreground/70 mb-6">
                  {announcement.description}
                </CardDescription>

                <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => toggleLike(announcement.id)}
                    className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        likedIds.includes(announcement.id)
                          ? 'fill-destructive text-destructive'
                          : 'group-hover:fill-primary'
                      }`}
                    />
                    <span>{(announcement.likes + (likedIds.includes(announcement.id) ? 1 : 0)).toLocaleString()}</span>
                  </button>

                  <button className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition">
                    <MessageSquare className="w-5 h-5" />
                    <span>{announcement.comments.toLocaleString()}</span>
                  </button>

                  <button className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition ml-auto">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-12 animate-fadeInSlideUp" style={{ animationDelay: '300ms' }}>
          <button className="px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all font-medium">
            Load More News
          </button>
        </div>
      </main>
    </div>
  );
}
