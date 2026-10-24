import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, Copy, Check, Terminal, HelpCircle, Wrench, FileText } from 'lucide-react';
import { TROUBLESHOOTING, TroubleshootingItem } from '../data/guideData';

export const Troubleshooter: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredItems = TROUBLESHOOTING.filter(
    (item) =>
      item.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cause.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.causeHinglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.solution.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search and header banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🩺</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Windows 7 Troubleshooting & Diagnostics
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Windows 7 par aane wale TLS, PATH, pip aur API errors ka exact solution.
            </p>
          </div>

          <div className="w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problem or error..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Troubleshooting items list */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg">{item.problem}</h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                    Category: {item.tag}
                  </span>
                </div>
              </div>
            </div>

            {/* Cause breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="font-bold text-slate-400 block mb-0.5">English Explanation:</span>
                <p className="text-slate-300 leading-relaxed">{item.cause}</p>
              </div>
              <div>
                <span className="font-bold text-amber-400 block mb-0.5">Hinglish Wajah (Desi Context):</span>
                <p className="text-amber-200/90 leading-relaxed italic">"{item.causeHinglish}"</p>
              </div>
            </div>

            {/* Solution and code */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Wrench className="w-4 h-4" />
                <span>Fix / Solution:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {item.solution}
              </p>

              {item.code && (
                <div className="relative group bg-slate-950 rounded-xl p-3.5 border border-slate-800 font-mono text-xs text-emerald-400 mt-2">
                  <pre className="whitespace-pre-wrap overflow-x-auto select-all">
                    {item.code}
                  </pre>
                  <button
                    onClick={() => handleCopy(item.code!, item.id)}
                    className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-sky-400" />
                        <span>Copy Fix</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400">
            <p>No troubleshooting issues match "{searchQuery}".</p>
          </div>
        )}
      </div>
    </div>
  );
};
