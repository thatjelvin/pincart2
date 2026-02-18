import { GoogleGenAI, Type } from "@google/genai";
import { Product, Supplier, GeneratedContent, GenerationTone } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- 1. Discover Products (Gemini 3 Flash) ---
export const mockSearchProducts = async (keyword: string): Promise<Product[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a Pinterest trend analyst. Generate 8 specific, trending dropshipping product ideas related to the keyword "${keyword}".
      For each product, provide a short, catchy, descriptive title (max 6 words) and a realistic engagement score (saves/pins count) between 500 and 15000.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              engagement_score: { type: Type.NUMBER },
            },
            required: ['title', 'engagement_score']
          }
        }
      }
    });

    const parsed = JSON.parse(response.text || '[]');
    
    // Enrich with client-side generated data (IDs, images)
    return parsed.map((item: any, i: number) => ({
      id: `pin_${Date.now()}_${i}`,
      title: item.title,
      // Using keyword + index as seed for visual variety in placeholders
      image_url: `https://picsum.photos/seed/${encodeURIComponent(item.title)}/400/600`, 
      engagement_score: item.engagement_score,
      source: 'Pinterest' as const
    }));

  } catch (error) {
    console.error("Gemini Search Error:", error);
    // Fallback if API fails
    return [];
  }
};

// --- 2. Match Suppliers (Gemini 3 Flash) ---
export const mockMatchSuppliers = async (productTitle: string): Promise<Supplier[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a dropshipping sourcing agent. Find 3 plausible suppliers for the product "${productTitle}".
      They must be from either 'AliExpress' or 'CJdropshipping'.
      Estimate realistic costs, margins, and shipping details.
      Provide a specific supplier name.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              source: { type: Type.STRING, enum: ['AliExpress', 'CJdropshipping'] },
              supplier_name: { type: Type.STRING },
              product_title: { type: Type.STRING },
              unit_cost: { type: Type.NUMBER },
              suggested_retail: { type: Type.NUMBER },
              estimated_margin_pct: { type: Type.NUMBER },
              shipping_regions: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['source', 'supplier_name', 'product_title', 'unit_cost', 'suggested_retail', 'estimated_margin_pct', 'shipping_regions']
          }
        }
      }
    });

    const parsed = JSON.parse(response.text || '[]');

    return parsed.map((item: any, i: number) => ({
      ...item,
      id: `sup_${Date.now()}_${i}`,
      product_url: '#', // Placeholder link
      image: `https://picsum.photos/seed/${encodeURIComponent(item.supplier_name)}/300/300`
    }));

  } catch (error) {
    console.error("Gemini Match Error:", error);
    return [];
  }
};

// --- 3. Generate Content (Gemini 3 Pro for better creative writing) ---
export const mockGenerateContent = async (
  productTitle: string, 
  supplier: Supplier, 
  tone: GenerationTone
): Promise<GeneratedContent> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Write a high-converting product page for the product "${productTitle}".
      Target Audience Tone: ${tone}.
      
      Requirements:
      1. optimized_title: SEO friendly title.
      2. description: 2-3 paragraphs of persuasive HTML text (use <p>, <strong> tags).
      3. bullet_points: 5 key benefits/features.
      4. faq: 3 common questions and answers.
      5. ad_copy: Short, punchy social media ad copy with hashtags.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            optimized_title: { type: Type.STRING },
            description: { type: Type.STRING },
            bullet_points: { type: Type.ARRAY, items: { type: Type.STRING } },
            faq: { 
              type: Type.ARRAY, 
              items: { 
                type: Type.OBJECT, 
                properties: { 
                  question: { type: Type.STRING }, 
                  answer: { type: Type.STRING } 
                } 
              } 
            },
            ad_copy: { type: Type.STRING }
          },
          required: ['optimized_title', 'description', 'bullet_points', 'faq', 'ad_copy']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return parsed as GeneratedContent;

  } catch (error) {
    console.error("Gemini Generate Error:", error);
    throw error;
  }
};

// --- Export Utility ---
export const mockExportCsv = async (content: GeneratedContent, title: string): Promise<void> => {
  console.log("Generating CSV for:", title);
  
  const headers = ['Handle', 'Title', 'Body (HTML)', 'Vendor', 'Tags', 'Published', 'Option1 Name', 'Option1 Value'];
  const row = [
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    content.optimized_title,
    `"${content.description.replace(/"/g, '""')}"`, // Basic CSV escaping
    'PinCart AI',
    'dropshipping, trending',
    'TRUE',
    'Title',
    'Default Title'
  ];

  const csvContent = "data:text/csv;charset=utf-8," 
    + headers.join(",") + "\n" 
    + row.join(",");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${title.replace(/\s+/g, '_')}_export.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};