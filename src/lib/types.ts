export type Category = 'text' | 'image' | 'code' | 'audio' | 'video' | 'other';

export interface AITool {
  id: string;
  name: string;
  description: string;
  category: Category;
  rating: number;
  votes: number;
  votesPrevWeek: number;
  trend: number;
  url: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  source: 'producthunt' | 'manual';
}

export const CATEGORIES: { value: Category; label: string; color: string }[] = [
  { value: 'text', label: 'Text & Writing', color: 'bg-blue-500' },
  { value: 'image', label: 'Image & Design', color: 'bg-purple-500' },
  { value: 'code', label: 'Code & Dev', color: 'bg-green-500' },
  { value: 'audio', label: 'Audio & Music', color: 'bg-orange-500' },
  { value: 'video', label: 'Video', color: 'bg-red-500' },
  { value: 'other', label: 'Other', color: 'bg-gray-500' },
];
