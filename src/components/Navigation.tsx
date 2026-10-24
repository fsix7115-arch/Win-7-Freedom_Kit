import React from 'react';
import { BookOpen, ListOrdered, Wrench, ShieldAlert, Sparkles, CheckSquare } from 'lucide-react';

export type TabType = 'readme' | 'wizard' | 'scripts' | 'verify' | 'troubleshoot' | 'cleanup';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  completedStepsCount: number;
  totalSteps: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  completedStepsCount,
  totalSteps
}) => {
  const tabs = [
    {
      id: 'readme' as TabType,
      label: 'README.md',
      sublabel: 'Full GitHub Repo Guide',
      icon: BookOpen,
      badge: 'Official'
    },
    {
      id: 'wizard' as TabType,
      label: 'Setup Wizard',
      sublabel: '8 Interactive Steps',
      icon: ListOrdered,
      badge: `${completedStepsCount}/${totalSteps}`
    },
    {
      id: 'scripts' as TabType,
      label: '1-Click Scripts',
      sublabel: 'Auto .bat & .reg',
      icon: Wrench,
      badge: '5 Files'
    },
    {
      id: 'verify' as TabType,
      label: 'Verification',
      sublabel: 'System Checklist',
      icon: CheckSquare
    },
    {
      id: 'troubleshoot' as TabType,
      label: 'Troubleshooting',
      sublabel: 'TLS 1.2, PATH, SSL',
      icon: ShieldAlert
    },
    {
      id: 'cleanup' as TabType,
      label: 'Disk Cleanup',
      sublabel: 'Monthly Free Space',
      icon: Sparkles
    }
  ];

  return (
    <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.5 text-[10px] rounded-full font-bold uppercase tracking-wider ${
                      isActive ? 'bg-sky-800 text-sky-100' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
