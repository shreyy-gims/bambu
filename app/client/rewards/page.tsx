'use client';

import ClientNavbar from '@/components/client-navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Flame, Lock } from 'lucide-react';
import { useState } from 'react';
import { getLevelFromXp, getProgressToNextLevel, getLevelColor, getLevelName, LEVEL_THRESHOLDS } from '@/lib/level-system';
import { REWARDS, getRewardsForLevel, isRewardUnlocked } from '@/lib/rewards-system';

export default function RewardsPage() {
  const [currentXp] = useState(2450);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number }>>([]);
  const [redeemed, setRedeemed] = useState<number[]>([]);

  const currentLevel = getLevelFromXp(currentXp);
  const availableRewards = getRewardsForLevel(currentLevel);

  const redeemReward = (rewardId: number) => {
    if (!redeemed.includes(rewardId)) {
      setRedeemed([...redeemed, rewardId]);

      // Create confetti
      const newConfetti = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
      }));
      setConfetti(newConfetti);

      setTimeout(() => setConfetti([]), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <ClientNavbar />

      {/* Confetti animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {confetti.map(item => (
          <div
            key={item.id}
            className="absolute w-2 h-2 animate-float"
            style={{
              left: `${item.left}%`,
              top: '-10px',
              backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
              animation: `slideDown 2s ease-out forwards`,
              animationDelay: `${item.delay}s`,
            }}
          />
        ))}
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 animate-fadeInSlideUp">
          <h1 className="text-4xl font-bold text-foreground mb-2">Rewards Center</h1>
          <p className="text-foreground/70">Redeem your points for amazing rewards</p>
        </div>

        {/* Level and Points card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Level Card */}
          <Card className="glass rounded-2xl border-white/20 animate-fadeInSlideUp">
            <CardContent className="pt-8">
              <div className="text-center">
                <p className="text-sm text-foreground/60 mb-4">Current Level</p>
                <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${getLevelColor(getLevelFromXp(currentXp))} flex items-center justify-center mb-4 shadow-lg`}>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white">{getLevelFromXp(currentXp)}</div>
                    <div className="text-xs text-white/80 mt-1">{getLevelName(getLevelFromXp(currentXp))}</div>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <div>
                    <p className="text-xs text-foreground/60 mb-2">Progress to Next Level</p>
                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                        style={{ width: `${getProgressToNextLevel(currentXp)}%` }}
                      />
                    </div>
                    <p className="text-xs text-foreground/50 mt-2">{Math.round(getProgressToNextLevel(currentXp))}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Points Card */}
          <Card className="glass rounded-2xl border-white/20 animate-fadeInSlideUp" style={{ animationDelay: '100ms' }}>
            <CardContent className="pt-8">
              <div className="text-center">
                <p className="text-sm text-foreground/60 mb-2">Your XP Points</p>
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
                  {currentXp}
                </div>
                <p className="text-foreground/70">Experience points</p>
                <div className="mt-6 space-y-3 text-sm">
                  {LEVEL_THRESHOLDS.map(threshold => (
                    <div key={threshold.level} className={`flex items-center gap-3 p-2 rounded-lg ${getLevelFromXp(currentXp) >= threshold.level ? 'bg-primary/10' : 'bg-muted/30'}`}>
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${getLevelColor(threshold.level)}`} />
                      <span className="flex-1 text-foreground/70">Level {threshold.level}: {threshold.minXp} - {threshold.maxXp} XP</span>
                      {getLevelFromXp(currentXp) >= threshold.level && <Flame className="w-4 h-4 text-primary" />}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level-based Rewards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 animate-fadeInSlideUp">Your Available Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRewards.map((reward, index) => {
              const Icon = reward.icon;
              const isRedeemed = redeemed.includes(reward.id);

              return (
                <Card
                  key={reward.id}
                  className={`glass rounded-2xl border-white/20 hover:border-white/40 overflow-hidden transition-all animate-fadeInSlideUp ${
                    isRedeemed ? 'opacity-60' : ''
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${reward.color} flex items-center justify-center text-white mb-3`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle>{reward.name}</CardTitle>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-foreground/60">Level {reward.unlockedAtLevel} Reward</span>
                      <Flame className="w-4 h-4 text-primary" />
                    </div>
                    <Button
                      onClick={() => redeemReward(reward.id)}
                      disabled={isRedeemed}
                      className="w-full rounded-full"
                      variant={isRedeemed ? 'secondary' : 'default'}
                    >
                      {isRedeemed ? '✓ Redeemed' : 'Claim Reward'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Locked Rewards - Next Levels */}
        {currentLevel < 5 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 animate-fadeInSlideUp">Unlock More Rewards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {REWARDS.filter(r => r.unlockedAtLevel > currentLevel).map((reward, index) => {
                const Icon = reward.icon;
                return (
                  <Card
                    key={reward.id}
                    className="glass rounded-2xl border-white/20 opacity-40 animate-fadeInSlideUp"
                    style={{ animationDelay: `${(availableRewards.length + index) * 50}ms` }}
                  >
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${reward.color} flex items-center justify-center text-white/50 mb-3`}>
                        <Lock className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-foreground/60">{reward.name}</CardTitle>
                      <CardDescription className="text-foreground/40">{reward.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-foreground/40">Reach Level {reward.unlockedAtLevel}</span>
                      </div>
                      <Button disabled className="w-full rounded-full opacity-50">
                        Locked
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* XP Activity */}
        <Card className="glass rounded-2xl border-white/20 mt-12 animate-fadeInSlideUp" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle>XP Activity</CardTitle>
            <CardDescription>Your experience point earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { description: 'Level Up Achievement - Reached Level 3!', type: 'level', date: '2 days ago' },
                { description: 'Purchased Bamboo Toothbrush Set', xp: '+100', date: 'Today' },
                { description: 'Voted on product poll', xp: '+25', date: 'Yesterday' },
                { description: 'Monthly bonus', xp: '+200', date: '5 days ago' },
                { description: 'Level Up Achievement - Reached Level 2!', type: 'level', date: '10 days ago' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{item.description}</p>
                    <p className="text-xs text-foreground/50">{item.date}</p>
                  </div>
                  {'xp' in item ? (
                    <span className="text-sm font-bold text-primary">{item.xp}</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-accent" />
                      <span className="text-xs font-semibold text-accent">Achieved</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <style>{`
        @keyframes slideDown {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
