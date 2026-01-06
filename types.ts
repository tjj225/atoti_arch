
export type NodeId = 
  | 'data-sources' 
  | 'modeling' 
  | 'engine-store' 
  | 'engine-calc' 
  | 'engine-query' 
  | 'hybrid-query' 
  | 'consumption'
  | 'security';

export interface ArchitectureNode {
  id: NodeId;
  label: string;
  description: string;
  whyItMatters: string;
  emphasis: 'low' | 'medium' | 'hero';
  items?: string[];
  subLabel?: string;
}

export interface DiagramState {
  selectedNode: NodeId | null;
  hoveredNode: NodeId | null;
}
