'use client';

import { Category, CATEGORIES } from '../lib/types';

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
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selectedCategory === 'all'
            ? isDark
              ? 'bg-white text-gray-900'
              : 'bg-gray-900 text-white'
            : isDark
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        All Tools
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onCategoryChange(cat.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === cat.value
              ? isDark
                ? 'bg-white text-gray-900'
                : 'bg-gray-900 text-white'
              : isDark
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
