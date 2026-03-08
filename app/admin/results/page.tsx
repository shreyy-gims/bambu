'use client';

import AdminSidebar from '@/components/admin-sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, CheckCircle } from 'lucide-react';

const pollsData = [
  {
    id: 1,
    question: 'What new bamboo product would you like next?',
    status: 'active',
    participants: 1250,
    options: [
      { text: 'Bamboo Yoga Mat', votes: 465, percentage: 37.2 },
      { text: 'Bamboo Phone Case', votes: 342, percentage: 27.4 },
      { text: 'Bamboo Backpack', votes: 287, percentage: 23.0 },
      { text: 'Bamboo Sunglasses', votes: 156, percentage: 12.5 },
    ],
  },
  {
    id: 2,
    question: 'Which color variant do you prefer?',
    status: 'active',
    participants: 1024,
    options: [
      { text: 'Natural Bamboo', votes: 523, percentage: 51.1 },
      { text: 'Dark Walnut', votes: 312, percentage: 30.5 },
      { text: 'Light Oak', votes: 189, percentage: 18.5 },
    ],
  },
  {
    id: 3,
    question: 'Should we launch a subscription box?',
    status: 'closed',
    participants: 1264,
    options: [
      { text: 'Yes, definitely!', votes: 687, percentage: 54.4 },
      { text: 'Maybe, need more details', votes: 412, percentage: 32.6 },
      { text: 'No thanks', votes: 165, percentage: 13.1 },
    ],
  },
];

const pollAnalyticsData = [
  { name: 'Week 1', votes: 342, participants: 298 },
  { name: 'Week 2', votes: 456, participants: 389 },
  { name: 'Week 3', votes: 628, participants: 512 },
  { name: 'Week 4', votes: 834, participants: 687 },
];

const COLORS = ['#2d5a3d', '#3d7a4d', '#4d9a5d', '#5dba6d'];

export default function AdminResultsPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <AdminSidebar />

      <main className="flex-1 ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 animate-fadeInSlideUp">
            <h1 className="text-4xl font-bold text-foreground mb-2">Vote Results</h1>
            <p className="text-foreground/70">Track community poll responses and engagement</p>
          </div>

          {/* Overall analytics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass rounded-2xl border-white/20 animate-fadeInSlideUp">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-foreground/70 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Total Votes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">3,538</div>
                <p className="text-xs text-foreground/50 mt-2">Across all polls</p>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl border-white/20 animate-fadeInSlideUp" style={{ animationDelay: '50ms' }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-foreground/70 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Active Polls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">2</div>
                <p className="text-xs text-foreground/50 mt-2">Currently running</p>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl border-white/20 animate-fadeInSlideUp" style={{ animationDelay: '100ms' }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-foreground/70 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Completed Polls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">1</div>
                <p className="text-xs text-foreground/50 mt-2">Concluded</p>
              </CardContent>
            </Card>
          </div>

          {/* Voting trend chart */}
          <Card className="glass rounded-2xl border-white/20 mb-8 animate-fadeInSlideUp" style={{ animationDelay: '150ms' }}>
            <CardHeader>
              <CardTitle>Voting Trend</CardTitle>
              <CardDescription>Weekly vote participation</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pollAnalyticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                  <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{ background: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: 'white' }}
                  />
                  <Legend />
                  <Bar dataKey="votes" fill="#3d7a4d" />
                  <Bar dataKey="participants" fill="#5dba6d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Individual polls */}
          <div className="space-y-6">
            {pollsData.map((poll, pollIndex) => (
              <Card
                key={poll.id}
                className="glass rounded-2xl border-white/20 animate-fadeInSlideUp"
                style={{ animationDelay: `${200 + pollIndex * 50}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-xl mb-2">{poll.question}</CardTitle>
                      <CardDescription>
                        {poll.participants.toLocaleString()} participants
                      </CardDescription>
                    </div>
                    <Badge
                      className={`${
                        poll.status === 'active'
                          ? 'bg-primary/20 text-primary border-primary/30'
                          : 'bg-muted text-foreground/60 border-muted-foreground/20'
                      } border capitalize`}
                    >
                      {poll.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {poll.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground">{option.text}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-primary">{option.votes.toLocaleString()}</span>
                            <span className="text-sm text-foreground/60">{option.percentage}%</span>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent"
                            style={{ width: `${option.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {poll.status === 'active' && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <p className="text-sm text-foreground/60">
                        Poll is currently active. Total votes will increase as users participate.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Engagement insights */}
          <Card className="glass rounded-2xl border-white/20 mt-8 animate-fadeInSlideUp" style={{ animationDelay: '350ms' }}>
            <CardHeader>
              <CardTitle>Engagement Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Most Popular Answer</h4>
                  <div className="space-y-2">
                    {[
                      { poll: 'New Product', answer: 'Bamboo Yoga Mat', votes: 465 },
                      { poll: 'Color Variant', answer: 'Natural Bamboo', votes: 523 },
                      { poll: 'Subscription', answer: 'Yes, definitely!', votes: 687 },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                        <div>
                          <p className="text-sm text-foreground/70">{item.poll}</p>
                          <p className="font-medium text-foreground">{item.answer}</p>
                        </div>
                        <span className="font-bold text-primary">{item.votes}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Response Rates</h4>
                  <div className="space-y-2">
                    {[
                      { poll: 'New Product', rate: '78%', trend: '↑ 12%' },
                      { poll: 'Color Variant', rate: '82%', trend: '↑ 8%' },
                      { poll: 'Subscription', rate: '85%', trend: '↓ 3%' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                        <p className="text-foreground/70">{item.poll}</p>
                        <div className="text-right">
                          <p className="font-bold text-foreground">{item.rate}</p>
                          <p className="text-xs text-accent">{item.trend}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
