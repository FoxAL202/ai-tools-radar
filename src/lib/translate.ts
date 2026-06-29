/**
 * Translation system for AI Tools Radar
 * 
 * Architecture:
 * 1. Source data is always in English (data.ts)
 * 2. Translations are generated via MyMemory API (free, no key needed)
 * 3. Translations are cached in translations.json
 * 4. Client uses useTranslatedTools() hook to get localized content
 * 5. New tools without translations fall back to English
 * 
 * To regenerate translations: npm run translate
 */

import { AITool } from './types';

export interface ToolTranslation {
  name: string;
  description: string;
}

export type TranslationsMap = Record<string, ToolTranslation>;

/**
 * Translate text using MyMemory API (free, no API key required)
 * Rate limit: 1000 words/day for anonymous, more with email
 */
async function translateText(text: string, fromLang: string, toLang: string): Promise<string> {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }
    
    // Fallback: return original text if translation fails
    console.warn(`Translation failed for: "${text.slice(0, 50)}..."`);
    return text;
  } catch (error) {
    console.error(`Translation error: ${error}`);
    return text;
  }
}

/**
 * Generate translations for all tools
 * Respects rate limits by adding delays between requests
 */
export async function generateTranslations(
  tools: AITool[],
  targetLang: string = 'ru'
): Promise<TranslationsMap> {
  const translations: TranslationsMap = {};
  
  for (let i = 0; i < tools.length; i++) {
    const tool = tools[i];
    console.log(`Translating ${i + 1}/${tools.length}: ${tool.name}`);
    
    // Translate name and description
    const [nameRu, descRu] = await Promise.all([
      translateText(tool.name, 'en', targetLang),
      translateText(tool.description, 'en', targetLang),
    ]);
    
    translations[tool.id] = {
      name: nameRu,
      description: descRu,
    };
    
    // Rate limit: wait 100ms between requests to be polite
    if (i < tools.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return translations;
}

/**
 * Merge tools with translations for a given locale
 */
export function getLocalizedTools(
  tools: AITool[],
  translations: TranslationsMap,
  locale: string
): AITool[] {
  if (locale === 'en') return tools;
  
  return tools.map(tool => {
    const translation = translations[tool.id];
    if (!translation) return tool; // Fallback to English
    
    return {
      ...tool,
      name: translation.name,
      description: translation.description,
    };
  });
}
