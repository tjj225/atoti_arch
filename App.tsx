
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ARCHITECTURE_DATA } from './constants';
import { NodeId, DiagramState } from './types';
import ArchitectureNodeComponent from './components/ArchitectureNode';
import SidePanel from './components/SidePanel';
import { ArrowRight, Share2, Github, ExternalLink, ShieldCheck, Sun, Moon, Image as ImageIcon, FileCode, ArrowDown } from 'lucide-react';
import * as htmlToImage from 'html-to-image';

const App: React.FC = () => {
  const [state, setState] = useState<DiagramState>({
    selectedNode: 'engine-store',
    hoveredNode: null,
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleNodeClick = useCallback((id: NodeId) => {
    setState(prev => ({ ...prev, selectedNode: id }));
  }, []);

  const handleMouseEnter = useCallback((id: NodeId) => {
    setState(prev => ({ ...prev, hoveredNode: id }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setState(prev => ({ ...prev, hoveredNode: null }));
  }, []);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const exportDiagram = async (format: 'png' | 'svg') => {
    if (!diagramRef.current) return;
    
    try {
      const options = {
        backgroundColor: isDarkMode ? '#0f172a' : '#F9FAFB',
        style: {
          borderRadius: '0px',
        }
      };

      let dataUrl;
      if (format === 'png') {
        dataUrl = await htmlToImage.toPng(diagramRef.current, options);
      } else {
        dataUrl = await htmlToImage.toSvg(diagramRef.current, options);
      }

      const link = document.createElement('a');
      link.download = `atoti-architecture.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
    }
  };

  const selectedNodeData = state.selectedNode ? ARCHITECTURE_DATA[state.selectedNode] : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
            <div className="text-white font-black text-xl italic tracking-tighter">A</div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-50 leading-none">Atoti Architecture</h1>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">Interactive Technical Reference</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Docs</a>
            <a href="#" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Github</a>
          </nav>
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm">
              Start Building <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Main Canvas */}
        <div className="flex-1 overflow-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] flex items-center justify-center p-12">
          
          <div ref={diagramRef} className="relative flex items-center gap-8 min-w-max p-12 rounded-3xl transition-colors duration-300">
            
            {/* 1. Combined Ingestion Block (Left) */}
            <div className="flex flex-col items-center gap-4 p-6 bg-slate-100/50 dark:bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 px-4 py-1 rounded-full border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap shadow-sm">
                Data Foundation
              </div>
              <ArchitectureNodeComponent 
                node={ARCHITECTURE_DATA['data-sources']}
                isSelected={state.selectedNode === 'data-sources'}
                isHovered={state.hoveredNode === 'data-sources'}
                onClick={() => handleNodeClick('data-sources')}
                onMouseEnter={() => handleMouseEnter('data-sources')}
                onMouseLeave={handleMouseLeave}
              />
              <ArrowDown className="w-4 h-4 text-slate-300 dark:text-slate-700" />
              <ArchitectureNodeComponent 
                node={ARCHITECTURE_DATA['modeling']}
                isSelected={state.selectedNode === 'modeling'}
                isHovered={state.hoveredNode === 'modeling'}
                onClick={() => handleNodeClick('modeling')}
                onMouseEnter={() => handleMouseEnter('modeling')}
                onMouseLeave={handleMouseLeave}
              />
            </div>

            <ArrowRight className="w-6 h-6 text-slate-400 dark:text-slate-700" />

            {/* 2. ActivePivot Engine (Center Hero) */}
            <div className="flex flex-row items-stretch gap-8 p-8 bg-blue-50/50 dark:bg-blue-900/10 rounded-3xl border-2 border-dashed border-blue-100 dark:border-blue-900/30 relative shadow-sm transition-colors duration-300">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 px-4 py-1 rounded-full border border-blue-200 dark:border-blue-900 text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-[0.2em] whitespace-nowrap shadow-sm z-30 transition-colors duration-300">
                ActivePivot Engine
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <ArchitectureNodeComponent 
                  node={ARCHITECTURE_DATA['engine-store']}
                  isSelected={state.selectedNode === 'engine-store'}
                  isHovered={state.hoveredNode === 'engine-store'}
                  onClick={() => handleNodeClick('engine-store')}
                  onMouseEnter={() => handleMouseEnter('engine-store')}
                  onMouseLeave={handleMouseLeave}
                />
                <ArchitectureNodeComponent 
                  node={ARCHITECTURE_DATA['engine-calc']}
                  isSelected={state.selectedNode === 'engine-calc'}
                  isHovered={state.hoveredNode === 'engine-calc'}
                  onClick={() => handleNodeClick('engine-calc')}
                  onMouseEnter={() => handleMouseEnter('engine-calc')}
                  onMouseLeave={handleMouseLeave}
                />
                <ArchitectureNodeComponent 
                  node={ARCHITECTURE_DATA['engine-query']}
                  isSelected={state.selectedNode === 'engine-query'}
                  isHovered={state.hoveredNode === 'engine-query'}
                  onClick={() => handleNodeClick('engine-query')}
                  onMouseEnter={() => handleMouseEnter('engine-query')}
                  onMouseLeave={handleMouseLeave}
                />
              </div>

              <div className="w-[1px] bg-blue-200/50 dark:bg-blue-800/30 mx-2" />

              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleNodeClick('security')}
                  onMouseEnter={() => handleMouseEnter('security')}
                  onMouseLeave={handleMouseLeave}
                  className={`
                    group relative h-full w-14 flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-300
                    ${state.selectedNode === 'security' 
                      ? 'bg-blue-600 border-blue-600 shadow-lg scale-y-105 z-20' 
                      : 'bg-white dark:bg-slate-900 border-blue-100 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 hover:shadow-md'
                    }
                  `}
                >
                  <ShieldCheck className={`w-5 h-5 mb-4 transition-colors ${state.selectedNode === 'security' ? 'text-white' : 'text-blue-500'}`} />
                  <span className={`
                    text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-colors
                    [writing-mode:vertical-lr] rotate-180
                    ${state.selectedNode === 'security' ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400'}
                  `}>
                    Security & Governance
                  </span>
                </button>
              </div>
            </div>

            <ArrowRight className="w-6 h-6 text-slate-400 dark:text-slate-700" />

            {/* 3. Combined Consumption Block (Right) */}
            <div className="flex flex-col items-center gap-4 p-6 bg-slate-100/50 dark:bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 px-4 py-1 rounded-full border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap shadow-sm">
                Access & Insights
              </div>
              <ArchitectureNodeComponent 
                node={ARCHITECTURE_DATA['hybrid-query']}
                isSelected={state.selectedNode === 'hybrid-query'}
                isHovered={state.hoveredNode === 'hybrid-query'}
                onClick={() => handleNodeClick('hybrid-query')}
                onMouseEnter={() => handleMouseEnter('hybrid-query')}
                onMouseLeave={handleMouseLeave}
              />
              <ArrowDown className="w-4 h-4 text-slate-300 dark:text-slate-700" />
              <ArchitectureNodeComponent 
                node={ARCHITECTURE_DATA['consumption']}
                isSelected={state.selectedNode === 'consumption'}
                isHovered={state.hoveredNode === 'consumption'}
                onClick={() => handleNodeClick('consumption')}
                onMouseEnter={() => handleMouseEnter('consumption')}
                onMouseLeave={handleMouseLeave}
              />
            </div>

          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-[400px] shadow-2xl z-40 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <SidePanel 
            node={selectedNodeData} 
            onClose={() => setState(prev => ({ ...prev, selectedNode: null }))} 
          />
        </aside>
      </main>

      {/* Footer / Status Bar */}
      <footer className="h-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-medium transition-colors duration-300">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            Engine: Operational
          </div>
          <div className="flex items-center gap-1.5">
            Latency: &lt; 50ms
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button 
              onClick={() => exportDiagram('png')}
              className="px-3 py-1 flex items-center gap-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all hover:text-blue-600 dark:hover:text-blue-400"
              title="Download as PNG"
            >
              <ImageIcon className="w-3 h-3" /> PNG
            </button>
            <div className="w-[1px] h-3 bg-slate-300 dark:bg-slate-600 mx-1" />
            <button 
              onClick={() => exportDiagram('svg')}
              className="px-3 py-1 flex items-center gap-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all hover:text-blue-600 dark:hover:text-blue-400"
              title="Download as SVG"
            >
              <FileCode className="w-3 h-3" /> SVG
            </button>
          </div>
          <div className="w-[1px] h-3 bg-slate-200 dark:bg-slate-700"></div>
          <button className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex items-center gap-1">
            <Share2 className="w-3 h-3" /> Share
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
