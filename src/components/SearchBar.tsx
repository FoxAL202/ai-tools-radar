'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  isDark: boolean;
}

export default function SearchBar({ value, onChange, isDark }: SearchBarProps) {
  return (
    <div className="relative max-w-lg mx-auto w-full">
      <Search
        size={20}
        className={`absolute left-4 top-1/2 -translate-y-1/2 ${
          isDark ? 'text-gray-500' : 'text-gray-400'
        }`}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search AI tools..."
        className={`w-full pl-12 pr-5 py-4 rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 ${
          isDark
            ? 'bg-gray-900/60 border border-gray-800 text-white placeholder-gray-500 focus:ring-violet-500/50 focus:border-violet-500/50'
            : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-violet-500/30 focus:border-violet-400 shadow-sm'
        }`}
      />
    </div>
  );
}
