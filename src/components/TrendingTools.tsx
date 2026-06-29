'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { AITool } from '@/lib/types';

interface TrendingToolsProps {
  tools: AITool[];
  isDark: boolean;
}

export default function TrendingTools({ tools, isDark }: TrendingToolsProps) {
  const topTrending = [...tools]
    .sort((a, b) => b.trend - a.trend)
    .slice(0, 5);

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="text-emerald-400" size={24} />
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Trending This Week
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {topTrending.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-xl p-4 ${
              isDark
                ? 'bg-emerald-900/20 border border-emerald-700/30'
                : 'bg-emerald-50 border border-emerald-200'
            }`}
          >
            <div className="absolute top-3 right-3 text-xs font-bold text-emerald-400">
              +{tool.trend}%
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold mb-3 ${
              isDark ? 'bg-emerald-800/40 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
            }`}>
              {tool.name.slice(0, 2).toUpperCase()}
            </div>
            <h3 className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {tool.name}
            </h3>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {tool.category}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
