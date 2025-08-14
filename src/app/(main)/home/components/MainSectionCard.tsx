import { LucideIcon } from "lucide-react";

export type MainSectionItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  gradient: string;
  bgPattern: string;
};

interface MainSectionCardProps {
  item: MainSectionItem;
  onClick: (id: string) => void;
}

export default function MainSectionCard({
  item,
  onClick,
}: MainSectionCardProps) {
  const Icon = item.icon;
  return (
    <div className="group cursor-pointer" onClick={() => onClick(item.id)}>
      <div
        className={`${item.bgPattern} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:scale-105 relative overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/30"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/20"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full bg-white/15 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative z-10">
          <div
            className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}
          >
            <Icon
              className={`w-10 h-10 text-white transition-all duration-300 ${
                item.id === "games"
                  ? "group-hover:animate-bounce"
                  : "group-hover:animate-pulse"
              }`}
            />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            {item.label}
          </h3>
          <p className="text-gray-700 text-base font-medium leading-relaxed">
            {item.description}
          </p>
          <div className="mt-6">
            <div
              className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${item.gradient} text-white rounded-full text-sm font-semibold shadow-md group-hover:shadow-lg transition-all duration-300`}
            >
              Start {item.label}
              <Icon className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
