import React, { useState } from 'react';
import { Terminal, Shield, Sparkles, Copy, Check, Download, FileText, Cpu } from 'lucide-react';
import { RAW_README_MARKDOWN } from '../data/guideData';

interface HeaderProps {
  onDownloadAllScripts: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onDownloadAllScripts }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyReadme = () => {
    navigator.clipboard.writeText(RAW_README_MARKDOWN);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadReadme = () => {
    const blob = new Blob([RAW_README_MARKDOWN], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'README.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="border-b border-slate-700/60 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-slate-100 shadow-xl relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-72 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            {/* Title & Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 bg-sky-500/15 border border-sky-400/30 text-sky-300 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span>Windows 7 SP1 (32/64-bit)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 px-3 py-1 rounded-md text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Free & Local</span>
              </div>
              <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-400/30 text-amber-300 px-3 py-1 rounded-md text-xs font-semibold">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>No VPS • No Subscription</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
                <span className="text-3xl sm:text-4xl">🚀</span>
                <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  Win7 Freedom Kit
                </span>
              </h1>
            </div>

            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              <span className="font-semibold text-white">Free local terminal + AI coding agent for Windows 7</span> — 
              ConEmu terminal, Portable Python 3.8.10, Node.js 13.14.0, aur 7coder AI agent setup guide in simple Hinglish + English.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={handleCopyReadme}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition shadow-md border ${
                copied
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-100 hover:text-white'
              }`}
              title="Copy complete README.md to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-sky-400" />}
              <span>{copied ? 'README Copied!' : 'Copy README.md'}</span>
            </button>

            <button
              onClick={handleDownloadReadme}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-xs sm:text-sm font-semibold text-slate-100 hover:text-white transition shadow-md"
              title="Download raw README.md file"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Download README</span>
            </button>

            <button
              onClick={onDownloadAllScripts}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-lg shadow-sky-600/25 transition active:scale-[0.98]"
              title="Download all Windows 7 batch scripts"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Download Win7 Scripts</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
