
import { Badge } from '@/components/ui/badge';
import { Leaf } from 'lucide-react';

interface EcoScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const EcoScore = ({ score, size = 'md', showLabel = false, className = "" }: EcoScoreProps) => {
  const getEcoLabel = (score: number) => {
    if (score >= 86) return { label: 'Eco Hero', color: 'bg-green-600 text-white' };
    if (score >= 61) return { label: 'Eco Friendly', color: 'bg-green-500 text-white' };
    return { label: 'Moderate Impact', color: 'bg-yellow-500 text-white' };
  };

  const getScoreColor = (score: number) => {
    if (score >= 86) return 'text-green-600';
    if (score >= 61) return 'text-green-500';
    return 'text-yellow-600';
  };

  const iconSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const ecoLabel = getEcoLabel(score);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`flex items-center space-x-1 ${getScoreColor(score)}`}>
        <Leaf className={`${iconSize[size]} fill-current`} />
        <span className={`font-medium ${textSize[size]}`}>
          {score}
        </span>
      </div>
      
      {showLabel && (
        <Badge className={`${ecoLabel.color} ${textSize[size]}`}>
          {ecoLabel.label}
        </Badge>
      )}
    </div>
  );
};

// Utility function to calculate EcoScore
export const calculateEcoScore = (item: {
  condition: string;
  reuseCount?: number;
  category: string;
  trustScore?: number;
}) => {
  let score = 50; // Base score

  // +10 points for excellent condition
  if (item.condition.toLowerCase() === 'excellent') {
    score += 10;
  }

  // +10 points for 2nd or more reuse
  if (item.reuseCount && item.reuseCount >= 2) {
    score += 10;
  }

  // +20 points for high environmental impact categories
  const highImpactCategories = ['jeans', 'jackets', 'coats', 'boots'];
  if (highImpactCategories.includes(item.category.toLowerCase())) {
    score += 20;
  }

  // -5 points for low trust score
  if (item.trustScore && item.trustScore < 3) {
    score -= 5;
  }

  return Math.max(0, Math.min(100, score)); // Clamp between 0-100
};
