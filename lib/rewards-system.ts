import { Star, Zap, Crown, Gift, Leaf, Trophy } from 'lucide-react';

export interface Reward {
  id: number;
  name: string;
  description: string;
  unlockedAtLevel: number;
  icon: any;
  color: string;
}

export const REWARDS: Reward[] = [
  {
    id: 1,
    name: 'Welcome Gift',
    description: 'Welcome to level 1! Get started with us',
    unlockedAtLevel: 1,
    icon: Gift,
    color: 'from-green-500 to-green-600',
  },
  {
    id: 2,
    name: '10% Discount',
    description: 'Unlock a 10% discount on your next purchase',
    unlockedAtLevel: 1,
    icon: Zap,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 3,
    name: 'Free Toothbrush',
    description: 'Level 2 reward - Classic eco-friendly toothbrush',
    unlockedAtLevel: 2,
    icon: Star,
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 4,
    name: 'Tree Planted',
    description: 'Level 2 reward - We plant a tree for you',
    unlockedAtLevel: 2,
    icon: Leaf,
    color: 'from-green-600 to-green-700',
  },
  {
    id: 5,
    name: 'Premium Bottle',
    description: 'Level 3 reward - Limited edition bamboo bottle',
    unlockedAtLevel: 3,
    icon: Crown,
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    id: 6,
    name: '20% Discount',
    description: 'Level 4 reward - 20% off all products',
    unlockedAtLevel: 4,
    icon: Zap,
    color: 'from-blue-600 to-blue-700',
  },
  {
    id: 7,
    name: 'Mystery Gift Box',
    description: 'Level 4 reward - Surprise bamboo products',
    unlockedAtLevel: 4,
    icon: Gift,
    color: 'from-purple-600 to-purple-700',
  },
  {
    id: 8,
    name: 'Hall of Fame',
    description: 'Level 5 reward - Lifetime VIP status & exclusive perks',
    unlockedAtLevel: 5,
    icon: Trophy,
    color: 'from-red-500 to-red-600',
  },
];

export const getRewardsForLevel = (level: number): Reward[] => {
  return REWARDS.filter(reward => reward.unlockedAtLevel <= level);
};

export const getUnlockedRewards = (level: number): Reward[] => {
  return REWARDS.filter(reward => reward.unlockedAtLevel === level);
};

export const isRewardUnlocked = (reward: Reward, level: number): boolean => {
  return reward.unlockedAtLevel <= level;
};
