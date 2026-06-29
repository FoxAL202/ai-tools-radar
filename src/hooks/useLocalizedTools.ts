'use client';

import { useMemo } from 'react';
import { AITool } from '@/lib/types';

// Pre-generated translations (auto-translated + manually curated)
import translationsData from '@/lib/translations.json';

interface ToolTranslation {
  name: string;
  description: string;
}

const translations: Record<string, ToolTranslation> = translationsData;

/**
 * Hook that returns tools with localized names and descriptions.
 * 
 * Architecture:
 * - English is the source of truth (data.ts)
 * - Russian translations are pre-generated and stored in translations.json
 * - New tools without translations automatically fall back to English
 * - To add translations for new tools: npm run translate
 * 
 * @param tools - Array of tools from data source
 * @param locale - Current locale ('en' | 'ru')
 * @returns Localized tools array
 */
export function useLocalizedTools(tools: AITool[], locale: string): AITool[] {
  return useMemo(() => {
    if (locale === 'en') return tools;
    
    return tools.map(tool => {
      const translation = translations[tool.id];
      if (!translation) {
        // No translation available — fallback to English
        return tool;
      }
      
      return {
        ...tool,
        name: translation.name,
        description: translation.description,
      };
    });
  }, [tools, locale]);
}
