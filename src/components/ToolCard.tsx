'use client';

import { motion } from 'framer-motion';
import { Star, ExternalLink, TrendingUp, Zap } from 'lucide-react';
import { AITool } from '@/lib/types';

interface ToolCardProps {
  tool: AITool;
  index: number;
  isDark: boolean;
}

export default function ToolCard({ tool, index, isDark }: ToolCardProps) {
  const categoryStyles: Record<string, { bg: string; text: string; border: string }> = {
    text: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
    image: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
    code: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    audio: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
    video: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
    other: { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20' },
  };

  const cat = categoryStyles[tool.category] || categoryStyles.other;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-2xl p-6 transition-all duration-300 ${
        isDark
          ? 'bg-gray-900/60 border border-gray-800 hover:border-gray-700 hover:bg-gray-900/80'
          : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-200/50'
      }`}
    >
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        isDark ? 'bg-gradient-to-br from-violet-500/5 to-blue-500/5' : 'bg-gradient-to-br from-violet-500/5 to-transparent'
      }`} />

      {/* Trending badge */}
      {tool.trend > 5 && (
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.04 + 0.3, type: 'spring' }}
            className="flex items-center gap-1 bg-emerald-500/15 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-emerald-500/20"
          >
            <TrendingUp size={11} />
            +{tool.trend}%
          </motion.div>
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
            isDark
              ? 'bg-gradient-to-br from-gray-800 to-gray-700 text-gray-300 group-hover:from-violet-900/50 group-hover:to-gray-700'
              : 'bg-gradient-to-br from-gray-100 to-gray-50 text-gray-600 group-hover:from-violet-50 group-hover:to-gray-50'
          }`}>
            {tool.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-base truncate transition-colors ${
              isDark ? 'text-white group-hover:text-violet-300' : 'text-gray-900 group-hover:text-violet-700'
            }`}>
              {tool.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="flex items-center gap-0.5">
                <Star size={13} className="text-amber-400 fill-amber-400" />
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {tool.rating.toFixed(1)}
                </span>
              </div>
              <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>·</span>
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                {tool.votes.toLocaleString()} votes
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className={`text-sm leading-relaxed mb-5 line-clamp-2 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {tool.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className={`text-xs px-3 py-1.5 rounded-full border font-medium ${cat.bg} ${cat.text} ${cat.border}`}>
            {tool.category.charAt(0).toUpperCase() + tool.category.slice(1)}
          </span>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-sm font-medium transition-all ${
              isDark
                ? 'text-gray-500 hover:text-violet-400'
                : 'text-gray-400 hover:text-violet-600'
            }`}
          >
            Visit
            <ExternalLink size={13} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
