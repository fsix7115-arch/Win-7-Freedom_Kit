import React, { useState } from 'react';
import { CheckSquare, Square, Terminal, Copy, Check, Sparkles, ShieldCheck, HardDrive, CheckCircle2 } from 'lucide-react';

interface VerificationItem {
  id: string;
  label: string;
  hinglishLabel: string;
  cmd: string;
  expectedOutput: string;
  note: string;
}

export const VerificationChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem('win7_verification_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const checklist: VerificationItem[] = [
    {
      id: 'conemu',
      label: 'ConEmu opens smoothly',
      hinglishLabel: 'ConEmu tabbed terminal clean start ho raha hai',
      cmd: 'start D:\\AI\\tools\\ConEmu\\ConEmu64.exe',
      expectedOutput: '[Terminal window opens with green/white command prompt ready]',
      note: 'ConEmu desktop shortcut se bhi test kar sakte ho.'
    },
    {
      id: 'python',
      label: 'python --version → 3.8.10',
      hinglishLabel: 'Portable Python version 3.8.10 print ho raha hai',
      cmd: 'python --version',
      expectedOutput: 'Python 3.8.10',
      note: 'Agar command not found bole toh Step 3 ka PATH check karo.'
    },
    {
      id: 'node',
      label: 'node --version → v13.14.0',
      hinglishLabel: 'Node.js version v13.14.0 detect ho raha hai',
      cmd: 'node --version',
      expectedOutput: 'v13.14.0',
      note: 'Node 13.14.0 Windows 7 ka gold standard release hai.'
    },
    {
      id: '7coder',
      label: '7coder --help works',
      hinglishLabel: '7coder AI agent command options dikhata hai',
      cmd: '7coder --help',
      expectedOutput: 'Usage: 7coder [options] [command]\nOptions:\n  -w, --workspace <path>  Working directory\n  --version               Show version',
      note: 'Global npm package properly linked hai ya nahi.'
    },
    {
      id: 'workspace',
      label: 'D:\\AI\\workspace exists with .env',
      hinglishLabel: 'D: drive par workspace aur .env file maujood hai',
      cmd: 'dir D:\\AI\\workspace\\.env',
      expectedOutput: 'Volume in drive D is Data\n Directory of D:\\AI\\workspace\n ... .env ...',
      note: 'API keys aur local coding projects isi folder me execute honge.'
    }
  ];

  const handleToggle = (id: string) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('win7_verification_checklist', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleCopy = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const completedCount = checklist.filter((item) => checkedItems[item.id]).length;
  const isAllDone = completedCount === checklist.length;

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✅</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">System Verification Checklist</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Setup complete hone ke baad har command ko ConEmu me verify karo aur yahan checkmark lagao.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border ${
            isAllDone
              ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/50'
              : 'bg-sky-950 text-sky-400 border-sky-800'
          }`}>
            {completedCount} / {checklist.length} Passed
          </span>
        </div>
      </div>

      {/* Completion Banner */}
      {isAllDone && (
        <div className="bg-gradient-to-r from-emerald-950/80 via-teal-950/80 to-slate-900 border border-emerald-500/50 rounded-2xl p-6 shadow-2xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-400 shrink-0">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
              <span>🎉 Mubarak Ho! System is 100% Operational!</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Aapka Windows 7 laptop ab ek autonomous AI coding machine ban chuka hai. 
              Run <code className="bg-slate-900 text-emerald-400 px-1.5 py-0.5 rounded font-mono">D:\AI\bin\start.bat</code> to launch 7coder anytime!
            </p>
          </div>
        </div>
      )}

      {/* Checklist items */}
      <div className="space-y-3">
        {checklist.map((item) => {
          const isChecked = !!checkedItems[item.id];
          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all ${
                isChecked
                  ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5 min-w-0">
                  <button
                    onClick={() => handleToggle(item.id)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-400 transition shrink-0"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <Square className="w-6 h-6 text-slate-600 hover:text-slate-400" />
                    )}
                  </button>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm sm:text-base font-bold ${isChecked ? 'text-white' : 'text-slate-200'}`}>
                        {item.label}
                      </span>
                      {isChecked && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-sky-400 italic">
                      "{item.hinglishLabel}"
                    </p>
                    <p className="text-xs text-slate-400">{item.note}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-start">
                  <button
                    onClick={() => handleCopy(item.cmd, item.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Command Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-sky-400" />
                        <span>Copy Test Cmd</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleToggle(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      isChecked
                        ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/60'
                        : 'bg-sky-600 hover:bg-sky-500 text-white shadow'
                    }`}
                  >
                    {isChecked ? 'Mark Untested' : 'Mark Verified'}
                  </button>
                </div>
              </div>

              {/* Terminal command & expected output box */}
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-emerald-400 flex items-center justify-between">
                  <div>
                    <span className="text-slate-600 select-none mr-2">&gt;</span>
                    <span>{item.cmd}</span>
                  </div>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                  <span className="text-slate-500 mr-2">Expected:</span>
                  <span className="text-sky-300">{item.expectedOutput}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
