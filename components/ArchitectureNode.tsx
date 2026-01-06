
import React from 'react';
import { NodeId, ArchitectureNode as NodeData } from '../types';
import { Database, Zap, Cpu, Layers, Layout, ShieldCheck, ChevronRight } from 'lucide-react';

interface Props {
  node: NodeData;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const getIcon = (id: NodeId) => {
  switch (id) {
    case 'data-sources': return <Database className="w-5 h-5" />;
    case 'modeling': return <Zap className="w-5 h-5" />;
    case 'engine-store': return <Layers className="w-5 h-5" />;
    case 'engine-calc': return <Cpu className="w-5 h-5" />;
    case 'engine-query': return <ChevronRight className="w-5 h-5" />;
    case 'hybrid-query': return <Zap className="w-5 h-5" />;
    case 'consumption': return <Layout className="w-5 h-5" />;
    case 'security': return <ShieldCheck className="w-5 h-5" />;
    default: return null;
  }
};

const ArchitectureNodeComponent: React.FC<Props> = ({ 
  node, 
  isSelected, 
  isHovered, 
  onClick, 
  onMouseEnter, 
  onMouseLeave 
}) => {
  const isHero = node.emphasis === 'hero';
  const isLow = node.emphasis === 'low';

  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        relative flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 border-2
        ${isSelected 
          ? 'scale-105 border-blue-500 bg-blue-50 dark:bg-blue-900/20 z-20 shadow-lg' 
          : 'border-transparent bg-white dark:bg-slate-900 shadow-sm dark:shadow-slate-950/50'
        }
        ${isHovered && !isSelected ? 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10 -translate-y-1' : ''}
        ${isHero 
          ? 'w-56 h-36 border-slate-200 dark:border-slate-800 hero-glow' 
          : 'w-48 h-32'
        }
        ${isLow ? 'opacity-80 scale-95 grayscale hover:grayscale-0 focus:grayscale-0 dark:opacity-60 dark:hover:opacity-100' : ''}
      `}
    >
      <div className={`mb-2 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
        {getIcon(node.id)}
      </div>
      
      <span className={`text-sm font-bold text-center leading-tight ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'}`}>
        {node.label}
      </span>
      
      {node.subLabel && (
        <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1 font-semibold">
          {node.subLabel}
        </span>
      )}

      {isHero && (
        <div className="absolute -bottom-2 -right-2 bg-blue-600 dark:bg-blue-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
          Hero Zone
        </div>
      )}
    </button>
  );
};

export default ArchitectureNodeComponent;
