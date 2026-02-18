export interface Product {
  id: string;
  title: string;
  image_url: string;
  engagement_score: number; // Saves/Pins count
  source: 'Pinterest';
}

export interface Supplier {
  id: string;
  source: 'AliExpress' | 'CJdropshipping';
  supplier_name: string;
  product_title: string;
  unit_cost: number;
  suggested_retail: number;
  estimated_margin_pct: number;
  shipping_regions: string[];
  product_url: string;
  image: string;
}

export interface GeneratedContent {
  optimized_title: string;
  description: string;
  bullet_points: string[];
  faq: Array<{ question: string; answer: string }>;
  ad_copy: string;
}

export interface User {
  id: string;
  email: string;
  plan_tier: 'free' | 'starter' | 'pro';
  searches_used: number;
  generations_used: number;
}

export enum GenerationTone {
  STANDARD = 'standard',
  LUXURY = 'luxury',
  CASUAL = 'casual',
  URGENT = 'urgent',
}