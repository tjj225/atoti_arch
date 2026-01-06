
import { ArchitectureNode } from './types';

export const ARCHITECTURE_DATA: Record<string, ArchitectureNode> = {
  'data-sources': {
    id: 'data-sources',
    label: 'Data Sources',
    emphasis: 'low',
    description: 'The foundation layer where raw data originates. Atoti is intentionally neutral, supporting various data ingestion patterns.',
    whyItMatters: 'Enables a unified view across disparate systems without requiring complex ETL pipelines up front.',
    items: ['Batch Sources (Files, S3)', 'Streaming (Kafka)', 'Databases & Warehouses']
  },
  'modeling': {
    id: 'modeling',
    label: 'Ingestion & Modeling',
    emphasis: 'medium',
    subLabel: 'Java & Python APIs',
    description: 'The logic layer where data structures are defined. Here, developers specify how raw fields map to multidimensional entities.',
    whyItMatters: 'Transforms raw data into a business-ready model with meaningful measures and hierarchies.',
    items: ['Define measures', 'Hierarchies & Dimensions', 'Incremental & Continuous Updates']
  },
  'engine-store': {
    id: 'engine-store',
    label: 'Pre-Aggregated Store',
    emphasis: 'hero',
    description: 'An optimized in-memory storage layer that keeps multidimensional aggregates ready for instant access.',
    whyItMatters: 'Eliminates the need for massive on-the-fly table scans, enabling sub-second response times even for complex queries.',
    items: ['In-Memory MVCC Storage', 'Near Real-Time Aggregation']
  },
  'engine-calc': {
    id: 'engine-calc',
    label: 'Aggregation & Calculation',
    emphasis: 'hero',
    description: 'The engine that computes complex business logic on top of the aggregated data.',
    whyItMatters: 'Allows for non-linear calculations (like VaR or complex ratios) that are hard to express in standard SQL.',
    items: ['On-the-fly', 'Complex and numerous hierarchies', 'Calculated measures']
  },
  'engine-query': {
    id: 'engine-query',
    label: 'Query Engine',
    emphasis: 'hero',
    description: 'The entry point for analytical queries, optimized for high concurrency and low latency.',
    whyItMatters: 'Serves thousands of concurrent users with consistent performance, regardless of dataset complexity.',
    items: ['Sub-second queries', 'Concurrent users', 'Versioned']
  },
  'hybrid-query': {
    id: 'hybrid-query',
    label: 'Hybrid Query',
    emphasis: 'medium',
    description: 'A clear differentiator that allows Atoti to bridge in-memory speed with massive warehouse scale.',
    whyItMatters: 'Gives users the best of both worlds: extreme speed for active data and vast reach for historical archives.',
    items: ['In-Memory Analytics', 'Direct Query to Warehouse']
  },
  'consumption': {
    id: 'consumption',
    label: 'Consumption',
    emphasis: 'low',
    description: 'The final destination where insights are delivered to the business through various interfaces.',
    whyItMatters: 'Provides flexibility for different personas, from data scientists in Python to business analysts in Excel.',
    items: ['UI, Excel, BI Tools', 'Web Applications', 'WS, REST & GraphQL APIs']
  },
  'security': {
    id: 'security',
    label: 'Security & Governance',
    emphasis: 'low',
    description: 'A cross-cutting layer ensuring that only authorized users can access specific slices of data.',
    whyItMatters: 'Critical for enterprise deployments where data privacy and compliance are non-negotiable.',
    items: ['Authentication', 'Authorization RBAC, raw and aggregates', 'Data Entitlements']
  }
};
