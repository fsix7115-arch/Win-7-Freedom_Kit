import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Eye, Terminal, ArrowRight, ShieldCheck, HardDrive, Cpu, AlertTriangle } from 'lucide-react';
import { RAW_README_MARKDOWN } from '../data/guideData';

export const ReadmeViewer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'rendered' | 'raw'>('rendered');
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [copiedSnippets, setCopiedSnippets] = useState<{ [key: string]: boolean }>({});

  const handleCopySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippets((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedSnippets((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(RAW_README_MARKDOWN);
    setCopiedRaw(true);
    setTimeout(() => setCopiedRaw(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 backdrop-blur p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => setViewMode('rendered')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition ${
                viewMode === 'rendered'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Preview (GitHub Styled)</span>
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition ${
                viewMode === 'raw'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>Raw README.md</span>
            </button>
          </div>
          <span className="text-xs text-slate-400 hidden md:inline-block">
            GitHub Flavored Markdown • Hinglish + English Mix
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleCopyRaw}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition"
          >
            {copiedRaw ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-sky-400" />}
            <span>{copiedRaw ? 'All Markdown Copied!' : 'Copy Entire README'}</span>
          </button>
        </div>
      </div>

      {viewMode === 'raw' ? (
        <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-4 sm:p-6 overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
            <span>README.md — 378 lines</span>
            <span>UTF-8</span>
          </div>
          <pre className="mt-4 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
            {RAW_README_MARKDOWN}
          </pre>
        </div>
      ) : (
        /* Rendered GitHub Article container */
        <article className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-6 sm:p-10 space-y-8 text-slate-200 leading-relaxed">
          {/* Header section */}
          <div className="border-b border-slate-800 pb-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🚀</span>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Win7 Freedom Kit
                </h1>
                <p className="text-sky-400 font-medium text-base sm:text-lg mt-1 italic">
                  "Win7 Freedom Kit: Free local terminal + AI coding agent for Windows 7 — no VPS, no subscription."
                </p>
              </div>
            </div>

            {/* Badges strip */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold bg-sky-950/80 text-sky-300 border border-sky-800">
                Platform: Windows 7 SP1 (32/64-bit)
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                License: MIT
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-800">
                Cost: 100% Free / Local
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-700">
                Node.js: v13.14.0 (Last Win7 Build)
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-800">
                Python: 3.8.10 Portable
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold bg-orange-950/80 text-orange-300 border border-orange-800">
                Agent: 7coder (40+ Tools)
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 text-sm text-slate-300 space-y-2">
              <p>
                <strong>Namaste dosto! 👋</strong> Agar aapke paas ek purana Windows 7 laptop ya desktop pada hai jismein koi heavy software nahi chalta, toh fikr bilkul mat karo. <strong>Win7 Freedom Kit</strong> ke sath aap apne Windows 7 machine ko ek fully autonomous, super-fast AI coding powerhouse bana sakte ho — bina kisi monthly subscription ke aur bina kisi expensive Cloud VPS ke!
              </p>
              <p className="text-slate-400 text-xs">
                Sab kuch <strong>100% Free, 100% Local terminal control, aur D: drive par isolated</strong> rahega taaki aapka C: drive partition hamesha clean aur fast rahe.
              </p>
            </div>
          </div>

          {/* Section 2: What You Get */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span>🎁</span>
              <span>What You Get (Aapko Kya-Kya Milega?)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                <Terminal className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white text-sm">Full terminal freedom (ConEmu, XP+ compatible)</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Tabbed terminal, UTF-8 unicode support, customizable colors, and smooth shell experience on legacy Windows.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                <span className="text-lg shrink-0">🐍</span>
                <div>
                  <h4 className="font-semibold text-white text-sm">Portable Python 3.8.10 (Extract-and-go)</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    No messy installer, no registry headaches. Bas unzip karo aur chalao.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                <span className="text-lg shrink-0">⚡</span>
                <div>
                  <h4 className="font-semibold text-white text-sm">Node.js 13.14.0 (Official Last Win7-Compatible Release)</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Official Node build jo Windows 7 par natively smoothly bina OS lock ke chalti hai.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                <span className="text-lg shrink-0">🤖</span>
                <div>
                  <h4 className="font-semibold text-white text-sm">7coder AI agent (Claude Code replacement, 40+ tools)</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Local AI developer agent jo terminal se code read, write, debug, execute aur browser task kar sakta hai.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                <HardDrive className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white text-sm">All data on D: drive, C: drive stays free</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    C: drive kabhi full nahi hogi. Workspace, portable tools, aur logs sab <code className="text-emerald-400 bg-slate-900 px-1 py-0.5 rounded">D:\AI\</code> ke andar surakshit rahenge.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                <Cpu className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white text-sm">Laptop on = Automation on</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Laptop screen band rakho ya background me chalao, aapka coding agent 24/7 background me kaam ke liye tayyar rahega.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Prerequisites */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span>📋</span>
              <span>Prerequisites (Zaroori Cheezein)</span>
            </h2>
            <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800 space-y-3">
              <p className="text-sm text-slate-300">Setup start karne se pehle ye verify kar lo:</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span><strong>Operating System:</strong> Windows 7 Service Pack 1 (SP1) — 32-bit (x86) ya 64-bit (x64) dono chalenge.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <HardDrive className="w-4 h-4 text-emerald-400" />
                  <span><strong>Disk Space:</strong> At least <strong>2 GB free space</strong> on D: drive (ya koi bhi non-system partition).</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span><strong>Internet Connection:</strong> Node packages & initial setup ke liye, plus free AI API calls ke liye.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  <span><strong>Admin Rights:</strong> PATH environment variable update karne aur Node.js MSI install karne ke liye.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4: Step-by-Step Setup */}
          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span>🛠️</span>
              <span>Step-by-Step Setup Guide (8 Steps)</span>
            </h2>

            {/* Step 1 */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-sky-600/30 text-sky-400 text-xs flex items-center justify-center font-mono">1</span>
                  <span>Create D:\AI Folders</span>
                </h3>
                <span className="text-xs text-sky-400 font-mono">Step 1 of 8</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-300 text-xs">Win + R</kbd>, type <code className="text-emerald-400">cmd</code>, and press Enter:
              </p>
              <div className="relative group bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-xs text-emerald-400 flex items-center justify-between">
                <code>mkdir D:\AI\tools D:\AI\workspace D:\AI\bin D:\AI\downloads</code>
                <button
                  onClick={() => handleCopySnippet('mkdir D:\\AI\\tools D:\\AI\\workspace D:\\AI\\bin D:\\AI\\downloads', 's1')}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs flex items-center gap-1"
                >
                  {copiedSnippets['s1'] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSnippets['s1'] ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-sky-600/30 text-sky-400 text-xs flex items-center justify-center font-mono">2</span>
                  <span>Install ConEmu Terminal</span>
                </h3>
                <span className="text-xs text-sky-400 font-mono">Step 2 of 8</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Official portable 7-Zip package download karo aur <code className="text-emerald-400">D:\AI\tools\ConEmu\</code> me extract karo:
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href="https://conemu.github.io/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:underline flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded border border-slate-800"
                >
                  ConEmu Official Download Site <ArrowRight className="w-3 h-3" />
                </a>
                <a
                  href="https://github.com/Maximus5/ConEmu/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:underline flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded border border-slate-800"
                >
                  GitHub Releases (.7z / .zip) <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs text-slate-400">
                💡 Tip: <code className="text-slate-300">ConEmu64.exe</code> (ya 32-bit par <code className="text-slate-300">ConEmu.exe</code>) par right click karke Desktop Shortcut bana lo.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-sky-600/30 text-sky-400 text-xs flex items-center justify-center font-mono">3</span>
                  <span>Extract Portable Python 3.8.10</span>
                </h3>
                <span className="text-xs text-sky-400 font-mono">Step 3 of 8</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                anzz1/python-windows portable release download karke <code className="text-emerald-400">D:\AI\tools\python38\</code> me extract karo.
              </p>
              <div className="relative group bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-xs text-emerald-400 flex items-center justify-between">
                <code>setx PATH "%PATH%;D:\AI\tools\python38;D:\AI\tools\python38\Scripts;D:\AI\bin"</code>
                <button
                  onClick={() => handleCopySnippet('setx PATH "%PATH%;D:\\AI\\tools\\python38;D:\\AI\\tools\\python38\\Scripts;D:\\AI\\bin"', 's3')}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs flex items-center gap-1"
                >
                  {copiedSnippets['s3'] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSnippets['s3'] ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-sky-600/30 text-sky-400 text-xs flex items-center justify-center font-mono">4</span>
                  <span>Install Node.js v13.14.0 (Last Win7 Supported)</span>
                </h3>
                <span className="text-xs text-sky-400 font-mono">Step 4 of 8</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Node 14+ Windows 7 par crash ho jata hai. Isliye <strong>Node.js v13.14.0</strong> install karna mandatory hai.</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href="https://nodejs.org/dist/v13.14.0/node-v13.14.0-x64.msi"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded border border-slate-800 font-mono"
                >
                  Download Node.js v13.14.0 64-bit MSI <Download className="w-3 h-3" />
                </a>
                <a
                  href="https://nodejs.org/dist/v13.14.0/node-v13.14.0-x86.msi"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded border border-slate-800 font-mono"
                >
                  Download Node.js v13.14.0 32-bit MSI <Download className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-sky-600/30 text-sky-400 text-xs flex items-center justify-center font-mono">5</span>
                  <span>Install 7coder AI Agent</span>
                </h3>
                <span className="text-xs text-sky-400 font-mono">Step 5 of 8</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                ConEmu open karke ye command run karo:
              </p>
              <div className="relative group bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-xs text-emerald-400 flex items-center justify-between">
                <code>npm install -g @nodemixaholic/7coder</code>
                <button
                  onClick={() => handleCopySnippet('npm install -g @nodemixaholic/7coder', 's5')}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs flex items-center gap-1"
                >
                  {copiedSnippets['s5'] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSnippets['s5'] ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Step 6 */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-sky-600/30 text-sky-400 text-xs flex items-center justify-center font-mono">6</span>
                  <span>Configure .env (Free API Key)</span>
                </h3>
                <span className="text-xs text-sky-400 font-mono">Step 6 of 8</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                <code className="text-emerald-400">D:\AI\workspace\.env</code> file create karo aur apna free Google Gemini API key paste karo:
              </p>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-slate-500"># Win7 Freedom Kit Config</div>
                <div>GEMINI_API_KEY=your_free_gemini_api_key_here</div>
                <div>AGENT_WORKSPACE=D:\AI\workspace</div>
                <div>ENABLE_COMPUTER_USE=false</div>
              </div>
            </div>

            {/* Step 7 */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-sky-600/30 text-sky-400 text-xs flex items-center justify-center font-mono">7</span>
                  <span>Create start.bat & Auto-startup</span>
                </h3>
                <span className="text-xs text-sky-400 font-mono">Step 7 of 8</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                <code className="text-emerald-400">D:\AI\bin\start.bat</code> create karo taaki isolated PATH ke sath single double-click par agent launch ho jaye.
              </p>
              <p className="text-xs text-slate-400">
                Laptop on hote hi auto-start karne ke liye: <kbd className="bg-slate-800 px-1 py-0.5 rounded text-sky-300">Win+R</kbd> daba kar <code className="text-sky-300">shell:startup</code> run karo aur <code className="text-sky-300">start.bat</code> ka shortcut paste kar do.
              </p>
            </div>

            {/* Step 8 */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-sky-600/30 text-sky-400 text-xs flex items-center justify-center font-mono">8</span>
                  <span>Disable Sleep (Powercfg Commands)</span>
                </h3>
                <span className="text-xs text-sky-400 font-mono">Step 8 of 8</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Laptop lid band rakhne par bhi continuous background automation chalu rakhne ke liye ye powercfg commands execute karo:
              </p>
              <div className="relative group bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-xs text-emerald-400">
                <pre className="overflow-x-auto whitespace-pre-wrap">
{`powercfg -change -standby-timeout-ac 0
powercfg -change -monitor-timeout-ac 15
powercfg -hibernate off
powercfg -setacvalueindex SCHEME_CURRENT SUB_BUTTONS LIDACTION 0
powercfg -setactive SCHEME_CURRENT`}
                </pre>
                <div className="mt-2 text-right">
                  <button
                    onClick={() => handleCopySnippet(`powercfg -change -standby-timeout-ac 0\npowercfg -change -monitor-timeout-ac 15\npowercfg -hibernate off\npowercfg -setacvalueindex SCHEME_CURRENT SUB_BUTTONS LIDACTION 0\npowercfg -setactive SCHEME_CURRENT`, 's8')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs inline-flex items-center gap-1"
                  >
                    {copiedSnippets['s8'] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnippets['s8'] ? 'Copied' : 'Copy Commands'}</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Verification Checklist */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span>✅</span>
              <span>Verification Checklist</span>
            </h2>
            <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800 space-y-3 font-mono text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <input type="checkbox" readOnly checked className="rounded text-sky-500" />
                <span>ConEmu opens cleanly without errors</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <input type="checkbox" readOnly checked className="rounded text-sky-500" />
                <span><code>python --version</code> → <code>Python 3.8.10</code></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <input type="checkbox" readOnly checked className="rounded text-sky-500" />
                <span><code>node --version</code> → <code>v13.14.0</code></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <input type="checkbox" readOnly checked className="rounded text-sky-500" />
                <span><code>7coder --help</code> → shows commands & tool list</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <input type="checkbox" readOnly checked className="rounded text-sky-500" />
                <span><code>D:\AI\workspace</code> directory exists with <code>.env</code> file</span>
              </div>
            </div>
          </section>

          {/* Section 6: Troubleshooting */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span>🩺</span>
              <span>Troubleshooting (Common Issues)</span>
            </h2>
            <div className="space-y-3 text-sm">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400">1. ConEmu internet update / download fails on Windows 7</h4>
                <p className="text-xs text-slate-300">
                  <strong>Wajah:</strong> Windows 7 purana SSL/TLS 1.0 use karta hai jabki modern servers TLS 1.2 maangte hain.
                </p>
                <p className="text-xs text-slate-400">
                  <strong>Solution:</strong> Win+R -&gt; inetcpl.cpl -&gt; Advanced tab -&gt; "Use TLS 1.2" check karo, ya hamari registry fix run karo.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400">2. 'npm' or 'node' not found in terminal</h4>
                <p className="text-xs text-slate-300">
                  <strong>Solution:</strong> ConEmu ko close karke reopen karo ya <code>set PATH=%PATH%;C:\Program Files\nodejs\</code> run karo.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400">3. 7coder API Error / Unauthorized</h4>
                <p className="text-xs text-slate-300">
                  <strong>Solution:</strong> <code>D:\AI\workspace\.env</code> me check karo ki API key bina extra quotes <code>"</code> ke seedha likha hai.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Disk Cleanup */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span>🧹</span>
              <span>Disk Cleanup (Monthly Maintenance)</span>
            </h2>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-emerald-400 space-y-1">
              <div>:: Clean NPM and Pip cache to recover GBs</div>
              <div>npm cache clean --force</div>
              <div>rmdir /s /q "%LOCALAPPDATA%\pip\cache" 2&gt;nul</div>
              <div>del /q /f D:\AI\workspace\*.log 2&gt;nul</div>
              <div>del /q /f /s "%TEMP%\*" 2&gt;nul</div>
            </div>
          </section>

          {/* Section 8: License */}
          <section className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div>
              Released under the <strong>MIT License</strong>. 100% Free for personal, academic, and commercial use.
            </div>
            <div className="font-mono text-slate-500">
              Win7 Freedom Kit • Built for Windows 7 Community
            </div>
          </section>
        </article>
      )}
    </div>
  );
};
