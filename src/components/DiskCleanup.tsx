import React, { useState } from 'react';
import { Sparkles, Trash2, Download, Copy, Check, HardDrive, ShieldCheck, Terminal, AlertCircle } from 'lucide-react';

export const DiskCleanup: React.FC = () => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const cleanupCommands = [
    {
      id: 'npm',
      title: 'Clean NPM Global Cache',
      cmd: 'npm cache clean --force',
      benefit: 'Clears cached .tar.gz tarballs. Frees 200MB - 1GB.',
      hinglish: 'NPM har install kiye package ka duplicate backup rakhta hai, ye unhe safely delete karega.'
    },
    {
      id: 'pip',
      title: 'Clear Pip Wheels & Download Cache',
      cmd: 'rmdir /s /q "%LOCALAPPDATA%\\pip\\cache" 2>nul',
      benefit: 'Removes cached Python wheels from C: drive AppData.',
      hinglish: 'Python pip ka local cache C: drive par space waste karta hai.'
    },
    {
      id: 'logs',
      title: 'Delete Old Workspace Logs',
      cmd: 'del /q /f D:\\AI\\workspace\\*.log 2>nul & del /q /f D:\\AI\\workspace\\.7coder\\logs\\*.* 2>nul',
      benefit: 'Removes stale agent session execution logs in D:\\AI.',
      hinglish: '7coder ke purane test run logs ko saaf karega.'
    },
    {
      id: 'temp',
      title: 'Windows Temp Folder Cleanup',
      cmd: 'del /q /f /s "%TEMP%\\*" 2>nul',
      benefit: 'Purges Windows 7 junk temp files.',
      hinglish: 'Windows 7 ke temporary residue files ko remove karega.'
    }
  ];

  const fullCleanupScript = `@echo off
echo ===================================================
echo     WIN7 FREEDOM KIT: MONTHLY DISK CLEANER
echo ===================================================
echo.
echo 1. Cleaning NPM cache...
call npm cache clean --force
echo 2. Cleaning Pip cache...
rmdir /s /q "%LOCALAPPDATA%\\pip\\cache" 2>nul
echo 3. Deleting temporary workspace logs...
del /q /f D:\\AI\\workspace\\*.log 2>nul
del /q /f D:\\AI\\workspace\\.7coder\\logs\\*.* 2>nul
echo 4. Cleaning Windows Temp files...
del /q /f /s "%TEMP%\\*" 2>nul
echo.
echo Cleanup complete! Your disk is fresh and fast.
pause`;

  const handleCopyAll = () => {
    navigator.clipboard.writeText(fullCleanupScript);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopySingle = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleDownloadBatch = () => {
    const blob = new Blob([fullCleanupScript], { type: 'application/x-bat;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'monthly_cleanup.bat');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧹</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Monthly Disk Cleanup & Maintenance
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Purane Windows 7 laptops me hard drive space bohot precious hota hai. Mahine me ek baar ye routine run karne se <strong>1GB se 3GB tak space</strong> free ho jata hai.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition"
          >
            {copiedAll ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-sky-400" />}
            <span>{copiedAll ? 'Copied' : 'Copy All Commands'}</span>
          </button>

          <button
            onClick={handleDownloadBatch}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 transition active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download monthly_cleanup.bat</span>
          </button>
        </div>
      </div>

      {/* Individual command cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cleanupCommands.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <Trash2 className="w-4 h-4 text-emerald-400" />
                  <span>{item.title}</span>
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                  {item.benefit}
                </span>
              </div>
              <p className="text-xs text-sky-400 italic">"{item.hinglish}"</p>
            </div>

            <div className="relative group bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-xs text-emerald-400 flex items-center justify-between">
              <code className="truncate pr-2">{item.cmd}</code>
              <button
                onClick={() => handleCopySingle(item.cmd, item.id)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-1 shrink-0"
              >
                {copiedItem === item.id ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-sky-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Complete Batch Script Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Terminal className="w-4 h-4 text-sky-400" />
            <span>Complete Automated monthly_cleanup.bat</span>
          </h3>
          <span className="text-xs text-slate-400">Run as Administrator</span>
        </div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
          {fullCleanupScript}
        </div>
      </div>
    </div>
  );
};
