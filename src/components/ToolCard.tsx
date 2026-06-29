'use client';

import { motion } from 'framer-motion';
import { Star, ExternalLink, TrendingUp } from 'lucide-react';
import { AITool } from '../lib/types';

interface ToolCardProps {
  tool: AITool;
  index: number;
  isDark: boolean;
}

export default function ToolCard({ tool, index, isDark }: ToolCardProps) {
  const categoryColors: Record<string, string> = {
    text: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    image: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    code: 'bg-green-500/20 text-green-300 border-green-500/30',
    audio: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    video: 'bg-red-500/20 text-red-300 border-red-500/30',
    other: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={`relative group rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
        isDark
          ? 'bg-gray-800/50 border border-gray-700/50 hover:border-gray-600'
          : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm'
      }`}
    >
      {tool.trend > 5 && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full text-xs font-medium">
            <TrendingUp size={12} />
            +{tool.trend}%
          </div>
        </div>
      )}

      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shrink-0 ${
          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
        }`}>
          {tool.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-lg truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {tool.name}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {tool.rating.toFixed(1)}
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              · {tool.votes.toLocaleString()} votes
            </span>
          </div>
        </div>
      </div>

      <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {tool.description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <span className={`text-xs px-3 py-1 rounded-full border ${categoryColors[tool.category]}`}>
          {tool.category.charAt(0).toUpperCase() + tool.category.slice(1)}
        </span>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1 text-sm transition-colors ${
            isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Visit <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
}
