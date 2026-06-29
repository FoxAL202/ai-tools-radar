'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { Category } from '@/lib/types';
import { TOOLS_DATA, searchTools } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import TrendingTools from '@/components/TrendingTools';

export default function HomePage() {
  const [isDark, setIsDark] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tools based on category and search
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
        isDark ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-violet-400" size={28} />
            <h1 className="text-xl font-bold">AI Tools Radar</h1>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <section className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl sm:text-5xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Discover the Best
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400"> AI Tools</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Top 50 AI tools ranked by community votes. Updated weekly.
          </motion.p>
        </section>

        {/* Trending */}
        <TrendingTools tools={TOOLS_DATA} isDark={isDark} />

        {/* Search */}
        <section className="mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} isDark={isDark} />
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            isDark={isDark}
          />
        </section>

        {/* Results count */}
        <div className={`mb-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Showing {filteredTools.length} of 50 tools
        </div>

        {/* Tools Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} isDark={isDark} />
          ))}
        </section>

        {filteredTools.length === 0 && (
          <div className={`text-center py-16 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            No tools found matching your criteria.
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`mt-16 border-t py-8 ${
        isDark ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            AI Tools Radar · Data sourced from Product Hunt & community
          </p>
        </div>
      </footer>
    </div>
  );
}
