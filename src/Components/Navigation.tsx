import React from 'react';
import { Home, Book, Gamepad2, Users, Trophy, ArrowLeft } from 'lucide-react';
import { AppPage } from '@/app/page';

interface NavigationProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  user: {
    name: string;
    avatar: string;
    score: number;
  };
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate, user }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', color: 'text-blue-600' },
    { id: 'reading', icon: Book, label: 'Reading', color: 'text-green-600' },
    { id: 'exercises', icon: Gamepad2, label: 'Games', color: 'text-purple-600' },
    { id: 'leaderboard', icon: Trophy, label: 'Rankings', color: 'text-yellow-600' },
    { id: 'parent', icon: Users, label: 'Parents', color: 'text-pink-600' },
  ];

  return (
    <nav className="bg-white shadow-lg border-b-4 border-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-bold text-lg">Reading Adventure</span>
            </button>
            
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id as AppPage)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? `${item.color} bg-blue-50 font-semibold scale-105`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
              ⭐ {user.score}
            </div>
            <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              <span className="text-lg">{user.avatar}</span>
              <span className="text-sm font-semibold">{user.name}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation