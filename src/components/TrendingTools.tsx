'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Flame } from 'lucide-react';
import { AITool } from '@/lib/types';
import { useI18n } from '@/contexts/I18nContext';

interface TrendingToolsProps {
  tools: AITool[];
  isDark: boolean;
}

export default function TrendingTools({ tools, isDark }: TrendingToolsProps) {
  const { t } = useI18n();

  const topTrending = [...tools]
    .sort((a, b) => b.trend - a.trend)
    .slice(0, 5);

  return (
    <section className="mb-14">
      <div className="flex items-center gap-2.5 mb-6">
        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <Flame size={20} className="text-emerald-400" />
        </div>
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('trendingWeek')}
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {topTrending.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className={`relative rounded-xl p-5 transition-all hover:scale-[1.03] ${
              isDark
                ? 'bg-emerald-950/30 border border-emerald-800/30 hover:border-emerald-700/50'
                : 'bg-emerald-50 border border-emerald-200 hover:border-emerald-300'
            }`}
          >
            <div className="absolute top-3 right-3 text-xs font-bold text-emerald-400 flex items-center gap-0.5">
              <TrendingUp size={11} />
              +{tool.trend}%
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold mb-3 ${
              isDark ? 'bg-emerald-900/50 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
            }`}>
              {tool.name.slice(0, 2).toUpperCase()}
            </div>
            <h3 className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {tool.name}
            </h3>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              {t(tool.category)}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
