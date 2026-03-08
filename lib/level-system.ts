export const LEVEL_THRESHOLDS = [
  { level: 1, minXp: 0, maxXp: 500 },
  { level: 2, minXp: 500, maxXp: 1200 },
  { level: 3, minXp: 1200, maxXp: 2100 },
  { level: 4, minXp: 2100, maxXp: 3300 },
  { level: 5, minXp: 3300, maxXp: 4800 },
];

export const getLevelFromXp = (xp: number): number => {
  const threshold = LEVEL_THRESHOLDS.find(t => xp >= t.minXp && xp < t.maxXp);
  return threshold?.level || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1].level;
};

export const getNextLevelXp = (xp: number): number => {
  const currentLevel = getLevelFromXp(xp);
  const nextThreshold = LEVEL_THRESHOLDS.find(t => t.level === currentLevel + 1);
  return nextThreshold?.minXp || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1].maxXp;
};

export const getProgressToNextLevel = (xp: number): number => {
  const currentLevel = getLevelFromXp(xp);
  const currentThreshold = LEVEL_THRESHOLDS.find(t => t.level === currentLevel);
  const nextThreshold = LEVEL_THRESHOLDS.find(t => t.level === currentLevel + 1);

  if (!currentThreshold || !nextThreshold) {
    return 100;
  }

  const currentProgress = xp - currentThreshold.minXp;
  const totalRequired = nextThreshold.minXp - currentThreshold.minXp;
  return Math.min((currentProgress / totalRequired) * 100, 100);
};

export const getLevelColor = (level: number): string => {
  const colors: { [key: number]: string } = {
    1: 'from-green-500 to-green-600',
    2: 'from-blue-500 to-blue-600',
    3: 'from-purple-500 to-purple-600',
    4: 'from-yellow-500 to-yellow-600',
    5: 'from-red-500 to-red-600',
  };
  return colors[level] || 'from-primary to-accent';
};

export const getLevelName = (level: number): string => {
  const names: { [key: number]: string } = {
    1: 'Seedling',
    2: 'Sprout',
    3: 'Bamboo',
    4: 'Forest Guardian',
    5: 'Eco Champion',
  };
  return names[level] || 'Unknown';
};
