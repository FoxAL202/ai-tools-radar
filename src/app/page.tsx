'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { Category } from '@/lib/types';
import { TOOLS_DATA, searchTools } from '@/lib/data';
import { useI18n } from '@/contexts/I18nContext';
import ToolCard from '@/components/ToolCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import TrendingTools from '@/components/TrendingTools';

export default function HomePage() {
  const { locale, setLocale, t } = useI18n();
  const [isDark, setIsDark] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  let filteredTools = TOOLS_DATA;

  if (selectedCategory !== 'all') {
    filteredTools = filteredTools.filter(t => t.category === selectedCategory);
  }

  if (searchQuery) {
    filteredTools = searchTools(searchQuery);
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b ${
        isDark ? 'bg-gray-950/80 border-gray-800/50' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/20">
              <Sparkles size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">{t('siteTitle')}</h1>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {t('top50Ranked')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className={`flex items-center rounded-xl p-1 ${
              isDark ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <button
                onClick={() => setLocale('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  locale === 'en'
                    ? isDark
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'bg-gray-900 text-white shadow-sm'
                    : isDark
                      ? 'text-gray-400 hover:text-gray-200'
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t('langEn')}
              </button>
              <button
                onClick={() => setLocale('ru')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  locale === 'ru'
                    ? isDark
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'bg-gray-900 text-white shadow-sm'
                    : isDark
                      ? 'text-gray-400 hover:text-gray-200'
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t('langRu')}
              </button>
            </div>
            <a
              href="https://github.com/FoxAL202/ai-tools-radar"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-xl transition-all ${
                isDark
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-xl transition-all ${
                isDark
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
              <Sparkles size={14} />
              {t('updatedWeekly')}
            </div>
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('heroTitle1')}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400">
                {t('heroTitle2')}
              </span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('heroSubtitle')}
            </p>
          </motion.div>
        </section>

        {/* Trending */}
        <TrendingTools tools={TOOLS_DATA} isDark={isDark} />

        {/* Search */}
        <section className="mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} isDark={isDark} />
        </section>

        {/* Category Filter */}
        <section className="mb-10">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            isDark={isDark}
          />
        </section>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            {t('showingCount')} <span className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{filteredTools.length}</span> {t('ofTools')}
          </p>
        </div>

        {/* Tools Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} isDark={isDark} />
          ))}
        </section>

        {filteredTools.length === 0 && (
          <div className={`text-center py-20 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            <p className="text-lg font-medium mb-2">{t('noToolsFound')}</p>
            <p className="text-sm">{t('tryAdjusting')}</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`mt-20 border-t py-10 ${
        isDark ? 'border-gray-800/50' : 'border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-violet-400" />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('siteTitle')}
              </span>
            </div>
            <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              {t('sourcedFrom')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
