'use client';

import { Category, CATEGORIES } from '@/lib/types';
import { useI18n } from '@/contexts/I18nContext';

interface CategoryFilterProps {
  selectedCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
  isDark: boolean;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  isDark,
}: CategoryFilterProps) {
  const { t } = useI18n();

  const categoryLabels: Record<Category | 'all', () => string> = {
    all: () => t('allTools'),
    text: () => t('textWriting'),
    image: () => t('imageDesign'),
    code: () => t('codeDev'),
    audio: () => t('audioMusic'),
    video: () => t('video'),
    other: () => t('other'),
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
          selectedCategory === 'all'
            ? isDark
              ? 'bg-white text-gray-900 shadow-lg shadow-white/10'
              : 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
            : isDark
              ? 'bg-gray-800/60 text-gray-400 hover:bg-gray-700 hover:text-gray-200 border border-gray-700/50'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent'
        }`}
      >
        {categoryLabels['all']()}
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onCategoryChange(cat.value)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            selectedCategory === cat.value
              ? isDark
                ? 'bg-white text-gray-900 shadow-lg shadow-white/10'
                : 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
              : isDark
                ? 'bg-gray-800/60 text-gray-400 hover:bg-gray-700 hover:text-gray-200 border border-gray-700/50'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent'
          }`}
        >
          {categoryLabels[cat.value]()}
        </button>
      ))}
    </div>
  );
}
