import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation, TabType } from './components/Navigation';
import { ReadmeViewer } from './components/ReadmeViewer';
import { StepByStepGuide } from './components/StepByStepGuide';
import { BatchGenerator } from './components/BatchGenerator';
import { VerificationChecklist } from './components/VerificationChecklist';
import { Troubleshooter } from './components/Troubleshooter';
import { DiskCleanup } from './components/DiskCleanup';
import { SETUP_STEPS, SCRIPTS } from './data/guideData';
import { Terminal, Shield, Heart, Sparkles, FolderCode } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('readme');
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('win7_freedom_completed_steps');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('win7_freedom_completed_steps', JSON.stringify(completedSteps));
    } catch {}
  }, [completedSteps]);

  const handleToggleStep = (stepId: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    );
  };

  const handleDownloadAllScripts = () => {
    SCRIPTS.forEach((file, index) => {
      setTimeout(() => {
        const mime = file.category === 'registry' ? 'text/plain' : 'application/x-bat';
        const blob = new Blob([file.code], { type: `${mime};charset=utf-8;` });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 200);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Header */}
      <Header onDownloadAllScripts={handleDownloadAllScripts} />

      {/* Navigation Tabs */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedStepsCount={completedSteps.length}
        totalSteps={SETUP_STEPS.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'readme' && <ReadmeViewer />}
        {activeTab === 'wizard' && (
          <StepByStepGuide
            completedSteps={completedSteps}
            onToggleStep={handleToggleStep}
          />
        )}
        {activeTab === 'scripts' && <BatchGenerator />}
        {activeTab === 'verify' && <VerificationChecklist />}
        {activeTab === 'troubleshoot' && <Troubleshooter />}
        {activeTab === 'cleanup' && <DiskCleanup />}
      </main>

      {/* Retro-modern Windows 7 Inspired Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/90 py-6 mt-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base">🚀</span>
            <span className="font-semibold text-slate-200">Win7 Freedom Kit</span>
            <span className="text-slate-600">|</span>
            <span>Free local terminal + AI coding agent for Windows 7</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              <span>MIT Licensed</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Zero VPS Cost</span>
            </span>
            <span>•</span>
            <span className="text-slate-400">
              Purana laptop, naya AI powerhouse! 💻
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
