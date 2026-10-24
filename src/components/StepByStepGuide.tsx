import React, { useState } from 'react';
import { 
  CheckCircle2, Circle, Copy, Check, ExternalLink, Download, 
  Terminal, Sparkles, ChevronRight, ChevronLeft, AlertCircle, FileText
} from 'lucide-react';
import { SETUP_STEPS, StepItem } from '../data/guideData';

interface StepByStepGuideProps {
  completedSteps: number[];
  onToggleStep: (stepId: number) => void;
}

export const StepByStepGuide: React.FC<StepByStepGuideProps> = ({
  completedSteps,
  onToggleStep
}) => {
  const [selectedStepId, setSelectedStepId] = useState<number>(1);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const currentStep = SETUP_STEPS.find((s) => s.id === selectedStepId) || SETUP_STEPS[0];
  const progressPercent = Math.round((completedSteps.length / SETUP_STEPS.length) * 100);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const handleDownloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🛠️</span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Interactive Windows 7 Setup Walkthrough
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Har step follow karo aur checkmark lagate jao. Aapka progress browser me save rahega.
            </p>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-center">
            <span className="text-xs font-mono font-semibold text-sky-400 bg-sky-950/60 px-3 py-1.5 rounded-lg border border-sky-800/80">
              {completedSteps.length} of {SETUP_STEPS.length} Completed ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Steps list on left, detail on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Step Navigator */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
            Setup Checklist ({SETUP_STEPS.length} Steps)
          </h3>
          <div className="space-y-1.5">
            {SETUP_STEPS.map((step) => {
              const isDone = completedSteps.includes(step.id);
              const isSelected = selectedStepId === step.id;

              return (
                <div
                  key={step.id}
                  onClick={() => setSelectedStepId(step.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-800/90 border-sky-500/70 shadow-lg shadow-sky-500/10'
                      : 'bg-slate-900/60 hover:bg-slate-850 border-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStep(step.id);
                      }}
                      className="shrink-0 p-1 hover:scale-110 transition"
                      title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500 hover:text-slate-300" />
                      )}
                    </button>
                    <div className="min-w-0">
                      <div className="text-xs font-mono text-sky-400">Step {step.id}</div>
                      <div className={`text-xs sm:text-sm font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-sky-400' : 'text-slate-600'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Step Detail Card */}
        <div className="lg:col-span-8">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-950 border border-sky-800 text-sky-400 text-xs font-mono font-bold">
                    STEP {currentStep.id} OF {SETUP_STEPS.length}
                  </span>
                  <span className="text-xs font-medium text-emerald-400">
                    {completedSteps.includes(currentStep.id) ? '✓ Completed' : 'Pending'}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {currentStep.title}
                </h2>
                <p className="text-xs sm:text-sm text-sky-300 font-medium italic mt-0.5">
                  "{currentStep.hinglishTitle}"
                </p>
              </div>

              <button
                onClick={() => onToggleStep(currentStep.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                  completedSteps.includes(currentStep.id)
                    ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30'
                    : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/30'
                }`}
              >
                {completedSteps.includes(currentStep.id) ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Step Done! Click to undo</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-white" />
                    <span>Mark as Complete</span>
                  </>
                )}
              </button>
            </div>

            {/* Explanation Summary */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-300">
              <p className="leading-relaxed">{currentStep.summary}</p>
            </div>

            {/* Step specific action: Command or File or Download links */}
            {currentStep.command && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono flex items-center gap-1.5 text-slate-300">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    Terminal Command (Run in cmd or ConEmu):
                  </span>
                  <span className="text-[11px] text-slate-500">Copy-Paste Ready</span>
                </div>
                <div className="relative group bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs sm:text-sm text-emerald-400">
                  <pre className="whitespace-pre-wrap overflow-x-auto selection:bg-emerald-900">
                    {currentStep.command}
                  </pre>
                  <button
                    onClick={() => handleCopy(currentStep.command!, `cmd-${currentStep.id}`)}
                    className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
                  >
                    {copiedSnippet === `cmd-${currentStep.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-sky-400" />
                        <span>Copy Command</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* File content (e.g. .env or start.bat) */}
            {currentStep.fileContent && currentStep.fileName && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono flex items-center gap-1.5 text-slate-300">
                    <FileText className="w-4 h-4 text-sky-400" />
                    File: <code className="text-sky-300">{currentStep.fileName}</code>
                  </span>
                  <button
                    onClick={() => handleDownloadFile(currentStep.fileName!.split('\\').pop() || 'file.txt', currentStep.fileContent!)}
                    className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download this file</span>
                  </button>
                </div>
                <div className="relative group bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300">
                  <pre className="whitespace-pre-wrap overflow-x-auto max-h-64 leading-relaxed">
                    {currentStep.fileContent}
                  </pre>
                  <button
                    onClick={() => handleCopy(currentStep.fileContent!, `file-${currentStep.id}`)}
                    className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
                  >
                    {copiedSnippet === `file-${currentStep.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-sky-400" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* External Links / Direct Downloads */}
            {currentStep.links && currentStep.links.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Download Links (Win7 Compatible)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentStep.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-850 transition flex items-start justify-between group"
                    >
                      <div className="space-y-1">
                        <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-sky-400 flex items-center gap-1.5">
                          <span>{link.name}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400" />
                        </div>
                        <div className="text-xs text-slate-400">{link.note}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Hinglish Practical Tips */}
            <div className="space-y-2 bg-slate-950/50 border border-slate-800/80 rounded-xl p-4">
              <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Beginner Pro Tips (Hinglish Guidance)</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {currentStep.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Step Prev / Next Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                disabled={currentStep.id === 1}
                onClick={() => setSelectedStepId((prev) => Math.max(1, prev - 1))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              <button
                disabled={currentStep.id === SETUP_STEPS.length}
                onClick={() => setSelectedStepId((prev) => Math.min(SETUP_STEPS.length, prev + 1))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-sky-400 hover:text-sky-300 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
