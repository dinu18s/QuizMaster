import { Zap, Target, Flame } from 'lucide-react';

export const DIFFICULTIES = [
  {
    id: "easy",
    name: "Easy",
    description: "Perfect for beginners",
    icon: Zap,
    color: "from-emerald-400 to-teal-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
    questionCount: 5,
  },
  {
    id: "medium",
    name: "Medium",
    description: "For intermediate learners",
    icon: Target,
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    questionCount: 8,
  },
  {
    id: "hard",
    name: "Hard",
    description: "Challenge yourself",
    icon: Flame,
    color: "from-rose-400 to-red-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    textColor: "text-rose-700",
    questionCount: 10,
  }
];
