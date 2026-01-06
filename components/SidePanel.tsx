
import React, { useState, useEffect } from 'react';
import { ArchitectureNode } from '../types';
import { getDeepDiveExplanation } from '../services/geminiService';
import { Info, HelpCircle, Sparkles, X } from 'lucide-react';

interface Props {
  node: ArchitectureNode | null;
  onClose: () => void;
}

const SidePanel: React.FC<Props> = ({ node, onClose }) => {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    setAiInsight(null);
  }, [node]);

  const handleDeepDive = async () => {
    if (!node) return;
    setLoadingAi(true);
    const insight = await getDeepDiveExplanation(node.label, node.description);
    setAiInsight(insight);
    setLoadingAi(false);
  };

  if (!node) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <Info className="text-slate-400 dark:text-slate-600 w-8 h-8" />
        </div>
        <h3 className="text-slate-600 dark:text-slate-400 font-semibold mb-1">Architecture Explorer</h3>
        <p className="text-slate-400 dark:text-slate-500 text-sm">Select a component to explore how data becomes sub-second analytics.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 overflow-y-auto transition-colors duration-300">
      <div className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start z-10">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{node.label}</h2>
          {node.subLabel && <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-1">{node.subLabel}</p>}
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <X className="w-5 h-5 text-slate-400 dark:text-slate-500" />
        </button>
      </div>

      <div className="p-6 space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-3 text-slate-900 dark:text-slate-100 font-semibold uppercase text-xs tracking-wider">
            <Info className="w-4 h-4 text-blue-500" />
            What it is
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
            "{node.description}"
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3 text-slate-900 dark:text-slate-100 font-semibold uppercase text-xs tracking-wider">
            <HelpCircle className="w-4 h-4 text-blue-500" />
            Why it matters
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-4">
            <p className="text-blue-900 dark:text-blue-300 text-sm leading-relaxed">
              {node.whyItMatters}
            </p>
          </div>
        </section>

        {node.items && (
          <section>
            <div className="flex items-center gap-2 mb-3 text-slate-900 dark:text-slate-100 font-semibold uppercase text-xs tracking-wider">
              <div className="w-4 h-1 bg-slate-300 dark:bg-slate-700 rounded" />
              Key Capabilities
            </div>
            <ul className="grid grid-cols-1 gap-2">
              {node.items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="pt-4 border-t border-slate-100 dark:border-slate-800">
          {!aiInsight ? (
            <button 
              onClick={handleDeepDive}
              disabled={loadingAi}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 dark:bg-blue-600 text-white rounded-xl hover:bg-slate-800 dark:hover:bg-blue-700 transition-all disabled:opacity-50 shadow-sm"
            >
              <Sparkles className={`w-4 h-4 ${loadingAi ? 'animate-pulse' : ''}`} />
              {loadingAi ? 'AI deep diving...' : 'Request AI Deep Dive'}
            </button>
          ) : (
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 p-4 rounded-xl border border-indigo-100 dark:border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-center gap-2 mb-2 text-indigo-700 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Gemini AI Insight
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm italic leading-relaxed">
                {aiInsight}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SidePanel;
