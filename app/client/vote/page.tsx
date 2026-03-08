'use client';

import ClientNavbar from '@/components/client-navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface Poll {
  id: number;
  question: string;
  description: string;
  options: Array<{
    id: number;
    text: string;
    votes: number;
  }>;
  totalVotes: number;
  status: 'active' | 'closed';
}

const initialPolls: Poll[] = [
  {
    id: 1,
    question: 'What new bamboo product would you like next?',
    description: 'Help us decide what to create next',
    options: [
      { id: 1, text: 'Bamboo Yoga Mat', votes: 342 },
      { id: 2, text: 'Bamboo Phone Case', votes: 287 },
      { id: 3, text: 'Bamboo Sunglasses', votes: 156 },
      { id: 4, text: 'Bamboo Backpack', votes: 465 },
    ],
    totalVotes: 1250,
    status: 'active',
  },
  {
    id: 2,
    question: 'Which color variant do you prefer?',
    description: 'Choose your favorite color for our upcoming collection',
    options: [
      { id: 1, text: 'Natural Bamboo', votes: 523 },
      { id: 2, text: 'Dark Walnut', votes: 312 },
      { id: 3, text: 'Light Oak', votes: 189 },
    ],
    totalVotes: 1024,
    status: 'active',
  },
  {
    id: 3,
    question: 'Should we launch a subscription box?',
    description: 'Monthly curated bamboo products',
    options: [
      { id: 1, text: 'Yes, definitely!', votes: 687 },
      { id: 2, text: 'Maybe, need more details', votes: 412 },
      { id: 3, text: 'No thanks', votes: 165 },
    ],
    totalVotes: 1264,
    status: 'closed',
  },
];

export default function VotePage() {
  const [polls, setPolls] = useState(initialPolls);
  const [userVotes, setUserVotes] = useState<{ [pollId: number]: number }>({});

  const vote = (pollId: number, optionId: number) => {
    if (!userVotes[pollId]) {
      // Update votes
      setPolls(
        polls.map(poll =>
          poll.id === pollId
            ? {
              ...poll,
              options: poll.options.map(opt =>
                opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
              ),
              totalVotes: poll.totalVotes + 1,
            }
            : poll
        )
      );
      // Record user vote
      setUserVotes({ ...userVotes, [pollId]: optionId });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <ClientNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 animate-fadeInSlideUp">
          <h1 className="text-4xl font-bold text-foreground mb-2">Community Voting</h1>
          <p className="text-foreground/70">Shape our future together by voting on new products and features</p>
        </div>

        <div className="space-y-6">
          {polls.map((poll, pollIndex) => (
            <Card
              key={poll.id}
              className="glass rounded-2xl border-white/20 hover:border-white/40 animate-fadeInSlideUp"
              style={{ animationDelay: `${pollIndex * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <CardTitle className="text-2xl mb-2">{poll.question}</CardTitle>
                    <CardDescription>{poll.description}</CardDescription>
                  </div>
                  {poll.status === 'closed' && (
                    <span className="text-xs font-semibold px-3 py-1 bg-muted text-foreground rounded-full">
                      Closed
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4 mb-6">
                  {poll.options.map((option) => {
                    const percentage = (option.votes / poll.totalVotes) * 100;
                    const userSelected = userVotes[poll.id] === option.id;

                    return (
                      <button
                        key={option.id}
                        onClick={() => {
                          if (poll.status === 'active') {
                            vote(poll.id, option.id);
                          }
                        }}
                        disabled={poll.status === 'closed' || !!userVotes[poll.id]}
                        className="w-full text-left group"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              userSelected
                                ? 'border-primary bg-primary'
                                : 'border-foreground/30 group-hover:border-primary'
                            }`}
                          >
                            {userSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                          </div>
                          <span className="font-medium text-foreground">{option.text}</span>
                          <span className="ml-auto text-sm text-foreground/60">
                            {option.votes.toLocaleString()} votes
                          </span>
                        </div>

                        <div className="ml-8">
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ${
                                userSelected ? 'shadow-lg shadow-primary/50' : ''
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <p className="text-xs text-foreground/50 mt-1">{percentage.toFixed(1)}%</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-sm text-foreground/60">
                    Total votes: {poll.totalVotes.toLocaleString()}
                  </span>
                  {userVotes[poll.id] ? (
                    <span className="text-sm font-semibold text-primary flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Vote counted
                    </span>
                  ) : poll.status === 'active' ? (
                    <span className="text-sm text-foreground/60">Vote to participate</span>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fadeInSlideUp" style={{ animationDelay: '300ms' }}>
          <Card className="glass rounded-2xl border-white/20">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-foreground/70">Active Polls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{polls.filter(p => p.status === 'active').length}</div>
              <p className="text-xs text-foreground/50 mt-2">Ongoing votes</p>
            </CardContent>
          </Card>

          <Card className="glass rounded-2xl border-white/20">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-foreground/70">Your Votes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{Object.keys(userVotes).length}</div>
              <p className="text-xs text-foreground/50 mt-2">Polls participated in</p>
            </CardContent>
          </Card>

          <Card className="glass rounded-2xl border-white/20">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-foreground/70">Total Votes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{polls.reduce((sum, p) => sum + p.totalVotes, 0).toLocaleString()}</div>
              <p className="text-xs text-foreground/50 mt-2">Community participation</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
