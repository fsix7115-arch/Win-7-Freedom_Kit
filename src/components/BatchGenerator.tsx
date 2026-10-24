import React, { useState } from 'react';
import { Download, Copy, Check, FileText, Key, Sparkles, Terminal, Shield, FolderPlus, Zap } from 'lucide-react';
import { SCRIPTS, ScriptFile } from '../data/guideData';

export const BatchGenerator: React.FC = () => {
  const [selectedScriptIndex, setSelectedScriptIndex] = useState<number>(1); // default start.bat
  const [apiKeyInput, setApiKeyInput] = useState<string>('');
  const [workspaceDrive, setWorkspaceDrive] = useState<string>('D');
  const [copied, setCopied] = useState<boolean>(false);

  // Generate dynamic .env file
  const generatedEnvContent = `# Win7 Freedom Kit - Environment Settings
# Configured for drive ${workspaceDrive}:\\AI\\workspace
GEMINI_API_KEY=${apiKeyInput.trim() ? apiKeyInput.trim() : 'AIzaSy_YOUR_FREE_GEMINI_KEY_HERE'}

# Optional Alternative Providers
# GROQ_API_KEY=your_groq_api_key_here
# ANTHROPIC_API_KEY=your_anthropic_api_key_here

# 7coder Agent Settings
AGENT_WORKSPACE=${workspaceDrive}:\\AI\\workspace
ENABLE_COMPUTER_USE=false
MAX_TOOL_STEPS=30
LOG_LEVEL=info`;

  const allFiles: ScriptFile[] = [
    ...SCRIPTS,
    {
      name: 'Custom .env Config File',
      filename: '.env',
      category: 'config',
      description: 'Your tailored API keys and workspace settings file.',
      code: generatedEnvContent
    }
  ];

  const currentFile = allFiles[selectedScriptIndex] || allFiles[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCurrent = () => {
    const mime = currentFile.category === 'registry' ? 'text/plain' : 'application/x-bat';
    const blob = new Blob([currentFile.code], { type: `${mime};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', currentFile.filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAllIndividual = () => {
    allFiles.forEach((file, index) => {
      setTimeout(() => {
        const blob = new Blob([file.code], { type: 'text/plain;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 250);
    });
  };

  return (
    <div className="space-y-6">
      {/* Introduction banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛠️</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1-Click Batch File Generator & Downloader
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Manual command typing se bachna hai? Yahan se pre-configured <strong>.bat</strong> aur <strong>.reg</strong> files download karo aur Windows 7 par double click karke run karo!
            </p>
          </div>

          <button
            onClick={handleDownloadAllIndividual}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg transition active:scale-95 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download All 6 Files</span>
          </button>
        </div>

        {/* Customizer row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3 border-t border-slate-800/80">
          <div className="sm:col-span-8">
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>Optional: Paste Your Free Gemini API Key (Auto-injects into .env)</span>
            </label>
            <input
              type="text"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="e.g. AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <FolderPlus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Drive Letter</span>
            </label>
            <select
              value={workspaceDrive}
              onChange={(e) => setWorkspaceDrive(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
            >
              <option value="D">D: Drive (Recommended)</option>
              <option value="E">E: Drive</option>
              <option value="F">F: Drive</option>
              <option value="C">C: Drive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Script Selector Tabs & Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* File List on left */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
            Available Scripts ({allFiles.length})
          </h3>
          <div className="space-y-2">
            {allFiles.map((file, idx) => {
              const isSelected = selectedScriptIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedScriptIndex(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex items-start gap-3 ${
                    isSelected
                      ? 'bg-slate-800 border-sky-500 text-white shadow-lg shadow-sky-500/10'
                      : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-sky-400 shrink-0">
                    {file.category === 'registry' ? (
                      <Shield className="w-4 h-4 text-amber-400" />
                    ) : file.category === 'config' ? (
                      <Key className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Terminal className="w-4 h-4 text-sky-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">{file.name}</span>
                      <span className="text-[10px] font-mono text-slate-500">{file.filename}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {file.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Code viewer & actions on right */}
        <div className="lg:col-span-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-lg">{currentFile.name}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                    {currentFile.filename}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{currentFile.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-sky-400" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleDownloadCurrent}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-md shadow-sky-600/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download {currentFile.filename}</span>
                </button>
              </div>
            </div>

            {/* Code Box */}
            <div className="relative rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto leading-relaxed max-h-96">
              <pre className="whitespace-pre-wrap">{currentFile.code}</pre>
            </div>

            {/* Windows 7 Execution Instruction */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-1.5">
              <h4 className="font-semibold text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>How to use on Windows 7:</span>
              </h4>
              <p>
                1. Click <strong>"Download {currentFile.filename}"</strong> button above.
              </p>
              <p>
                {currentFile.category === 'registry'
                  ? '2. Downloaded .reg file par double click karo aur "Yes / Merge" press karo.'
                  : currentFile.category === 'config'
                  ? `2. File ko ${workspaceDrive}:\\AI\\workspace\\.env par save ya move karo.`
                  : '2. Downloaded .bat file par right-click karke "Run as Administrator" ya double click karo.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
