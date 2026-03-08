'use client';

import AdminSidebar from '@/components/admin-sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import { useState } from 'react';

interface Announcement {
  id: number;
  title: string;
  category: string;
  date: string;
  status: 'published' | 'draft';
  views: number;
  likes: number;
  comments: number;
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: 'New Product Launch: Bamboo Yoga Mat',
    category: 'Product',
    date: '2024-02-28',
    status: 'published',
    views: 1242,
    likes: 342,
    comments: 28,
  },
  {
    id: 2,
    title: 'Summer Sale Starts Now',
    category: 'Promotion',
    date: '2024-02-26',
    status: 'published',
    views: 2156,
    likes: 567,
    comments: 43,
  },
  {
    id: 3,
    title: 'Milestone: 100,000 Community Members',
    category: 'Milestone',
    date: '2024-02-21',
    status: 'published',
    views: 3421,
    likes: 1203,
    comments: 156,
  },
  {
    id: 4,
    title: 'Sustainability Report 2024',
    category: 'Report',
    date: '2024-02-14',
    status: 'published',
    views: 892,
    likes: 428,
    comments: 62,
  },
  {
    id: 5,
    title: 'Upcoming Store Opening',
    category: 'Event',
    date: '2024-02-07',
    status: 'draft',
    views: 0,
    likes: 0,
    comments: 0,
  },
];

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    Product: 'from-primary to-primary/80',
    Promotion: 'from-accent to-accent/80',
    Milestone: 'from-secondary to-secondary/80',
    Report: 'from-primary/60 to-accent/60',
    Event: 'from-accent/60 to-secondary/60',
  };
  return colors[category] || 'from-primary to-accent';
};

export default function AdminAnnouncementsPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Product',
    content: '',
  });

  const handlePublish = () => {
    // Handle publish
    setShowForm(false);
    setFormData({ title: '', category: 'Product', content: '' });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <AdminSidebar />

      <main className="flex-1 ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 animate-fadeInSlideUp">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Announcements</h1>
                <p className="text-foreground/70">Create and manage community announcements</p>
              </div>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="rounded-full gap-2"
              >
                <Plus className="w-4 h-4" />
                New Announcement
              </Button>
            </div>
          </div>

          {/* Create form */}
          {showForm && (
            <Card className="glass rounded-2xl border-white/20 mb-8 animate-fadeInSlideUp">
              <CardHeader>
                <CardTitle>Create New Announcement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Title</label>
                    <input
                      type="text"
                      placeholder="Announcement title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-foreground focus:outline-none focus:border-primary/50"
                    >
                      <option value="Product">Product</option>
                      <option value="Promotion">Promotion</option>
                      <option value="Milestone">Milestone</option>
                      <option value="Report">Report</option>
                      <option value="Event">Event</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Content</label>
                    <textarea
                      placeholder="Announcement content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handlePublish} className="rounded-full">
                      Publish
                    </Button>
                    <Button
                      onClick={() => setShowForm(false)}
                      variant="outline"
                      className="rounded-full"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Announcements list */}
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <Card
                key={announcement.id}
                className="glass rounded-2xl border-white/20 hover:border-white/40 animate-fadeInSlideUp"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-foreground">{announcement.title}</h3>
                        <span className={`text-xs font-semibold px-2 py-1 bg-gradient-to-br ${getCategoryColor(announcement.category)} text-white rounded-full`}>
                          {announcement.category}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          announcement.status === 'published'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-muted text-foreground/60'
                        }`}>
                          {announcement.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-foreground/60 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {announcement.date}
                        </span>
                        {announcement.status === 'published' && (
                          <>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {announcement.views.toLocaleString()} views
                            </span>
                            <span>{announcement.likes.toLocaleString()} likes</span>
                            <span>{announcement.comments.toLocaleString()} comments</span>
                          </>
                        )}
                      </div>

                      {announcement.status === 'published' && (
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent"
                            style={{ width: `${(announcement.likes / announcement.views) * 100 || 0}%` }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-lg h-10 w-10 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-lg h-10 w-10 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 animate-fadeInSlideUp" style={{ animationDelay: '300ms' }}>
            <Card className="glass rounded-2xl border-white/20">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-foreground/70">Total Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{announcements.length}</div>
                <p className="text-xs text-foreground/50 mt-2">All time</p>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl border-white/20">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-foreground/70">Published</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">{announcements.filter(a => a.status === 'published').length}</div>
                <p className="text-xs text-foreground/50 mt-2">Live announcements</p>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl border-white/20">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-foreground/70">Total Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">
                  {announcements.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
                </div>
                <p className="text-xs text-foreground/50 mt-2">Community engagement</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
