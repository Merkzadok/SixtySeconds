import { LucideIcon } from "lucide-react";

export type QuickStat = {
  label: string;
  value: string;
  icon: LucideIcon;
};

interface QuickStatCardProps {
  stat: QuickStat;
}

export default function QuickStatCard({ stat }: QuickStatCardProps) {
  const Icon = stat.icon;
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/50">
      <Icon className="w-6 h-6 text-green-600 mx-auto mb-2  " />
      <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
      <div className="text-sm text-gray-600">{stat.label}</div>
    </div>
  );
}
