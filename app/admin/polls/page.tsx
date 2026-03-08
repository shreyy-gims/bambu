'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin-sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Poll {
  id: number;
  question: string;
  options: Array<{
    text: string;
    votes: number;
  }>;
  totalVotes: number;
  status: 'active' | 'closed';
  createdDate: string;
  endsDate: string;
}

const initialPolls: Poll[] = [
  {
    id: 1,
    question: 'What\'s your favorite bamboo product?',
    options: [
      { text: 'Yoga Mat', votes: 234 },
      { text: 'Utensils', votes: 189 },
      { text: 'Cutting Board', votes: 156 },
      { text: 'Furniture', votes: 98 },
    ],
    totalVotes: 677,
    status: 'active',
    createdDate: '2024-02-25',
    endsDate: '2024-03-05',
  },
  {
    id: 2,
    question: 'Would you recommend us to a friend?',
    options: [
      { text: 'Yes, absolutely!', votes: 892 },
      { text: 'Maybe', votes: 145 },
      { text: 'No', votes: 23 },
    ],
    totalVotes: 1060,
    status: 'closed',
    createdDate: '2024-02-20',
    endsDate: '2024-02-28',
  },
  {
    id: 3,
    question: 'Which new feature would you like?',
    options: [
      { text: 'Mobile App', votes: 412 },
      { text: 'Subscription Boxes', votes: 356 },
      { text: 'Loyalty Program', votes: 289 },
      { text: 'Live Chat Support', votes: 178 },
    ],
    totalVotes: 1235,
    status: 'active',
    createdDate: '2024-02-22',
    endsDate: '2024-03-08',
  },
];

const COLORS = ['#0f8659', '#4a9d8f', '#b8e6de', '#e8f5f1'];

export default function AdminPollsPage() {
  const [polls, setPolls] = useState<Poll[]>(initialPolls);
  const [showForm, setShowForm] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  });

  const handleCreatePoll = () => {
    if (!formData.question || !formData.option1 || !formData.option2) {
      alert('Please fill in at least question and 2 options');
      return;
    }

    const options = [formData.option1, formData.option2, formData.option3, formData.option4]
      .filter(opt => opt.trim())
      .map(text => ({ text, votes: 0 }));

    const newPoll: Poll = {
      id: Math.max(...polls.map(p => p.id), 0) + 1,
      question: formData.question,
      options,
      totalVotes: 0,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0],
      endsDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };

    setPolls([newPoll, ...polls]);
    setShowForm(false);
    setFormData({ question: '', option1: '', option2: '', option3: '', option4: '' });
  };

  const handleClosePoll = (pollId: number) => {
    setPolls(polls.map(p => p.id === pollId ? { ...p, status: 'closed' } : p));
  };

  const handleDeletePoll = (pollId: number) => {
    setPolls(polls.filter(p => p.id !== pollId));
  };

  const getChartData = (poll: Poll) => {
    return poll.options.map(option => ({
      name: option.text.length > 15 ? option.text.substring(0, 12) + '...' : option.text,
      value: option.votes,
      fullName: option.text,
    }));
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
                <h1 className="text-4xl font-bold text-foreground mb-2">Polls</h1>
                <p className="text-foreground/70">Create and manage community polls</p>
              </div>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="rounded-full gap-2"
              >
                <Plus className="w-4 h-4" />
                New Poll
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fadeInSlideUp">
            <Card className="glass rounded-2xl border-white/20">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-foreground/70">Active Polls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{polls.filter(p => p.status === 'active').length}</div>
                <p className="text-xs text-foreground/50 mt-2">Currently running</p>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl border-white/20">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-foreground/70">Total Votes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">{polls.reduce((sum, p) => sum + p.totalVotes, 0).toLocaleString()}</div>
                <p className="text-xs text-foreground/50 mt-2">All time</p>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl border-white/20">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-foreground/70">Average Participation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">
                  {polls.length > 0 ? Math.round(polls.reduce((sum, p) => sum + p.totalVotes, 0) / polls.length).toLocaleString() : 0}
                </div>
                <p className="text-xs text-foreground/50 mt-2">Per poll</p>
              </CardContent>
            </Card>
          </div>

          {/* Create form */}
          {showForm && (
            <Card className="glass rounded-2xl border-white/20 mb-8 animate-fadeInSlideUp">
              <CardHeader>
                <CardTitle>Create New Poll</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Question</label>
                    <input
                      type="text"
                      placeholder="What's your poll question?"
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i}>
                        <label className="text-sm font-medium text-foreground mb-2 block">Option {i} {i <= 2 ? '*' : ''}</label>
                        <input
                          type="text"
                          placeholder={`Option ${i}`}
                          value={formData[`option${i}` as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [`option${i}`]: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary/50"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleCreatePoll} className="rounded-full">
                      Create Poll
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

          {/* Polls list */}
          <div className="space-y-6">
            {polls.map((poll, index) => {
              const chartData = getChartData(poll);
              return (
                <Card
                  key={poll.id}
                  className="glass rounded-2xl border-white/20 hover:border-white/40 animate-fadeInSlideUp"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-2">{poll.question}</h3>
                          <div className="flex items-center gap-4 text-sm text-foreground/60">
                            <span>{poll.totalVotes.toLocaleString()} votes</span>
                            <span>Created: {poll.createdDate}</span>
                            <Badge className={`${poll.status === 'active' ? 'bg-primary/20 text-primary' : 'bg-muted text-foreground/60'}`}>
                              {poll.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {poll.status === 'active' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleClosePoll(poll.id)}
                              className="rounded-lg gap-2"
                            >
                              Close Poll
                            </Button>
                          )}
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
                            onClick={() => handleDeletePoll(poll.id)}
                            className="rounded-lg h-10 w-10 p-0 text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Charts */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Bar Chart */}
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                              <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" style={{ fontSize: '12px' }} />
                              <YAxis stroke="rgba(255,255,255,0.6)" style={{ fontSize: '12px' }} />
                              <Tooltip 
                                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)' }}
                                cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                              />
                              <Bar dataKey="value" fill="#0f8659" radius={[8, 8, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Pie Chart */}
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ fullName, value, value: voteCount }) => `${fullName}: ${voteCount}`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {chartData.map((entry, idx) => (
                                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip 
                                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)' }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Results breakdown */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">Results Breakdown</h4>
                        {poll.options.map((option, idx) => {
                          const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0;
                          return (
                            <div key={idx} className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-foreground">{option.text}</span>
                                <span className="text-foreground/70">{option.votes} votes ({percentage.toFixed(1)}%)</span>
                              </div>
                              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-primary to-accent"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
