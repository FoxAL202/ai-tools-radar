import { TOOLS_DATA } from '../lib/data';
import { CATEGORIES } from '../lib/types';

export default function sitemap() {
  const baseUrl = 'https://ai-tools-radar-two.vercel.app';
  
  const toolUrls = TOOLS_DATA.map(tool => ({
    url: `${baseUrl}/tool/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const categoryUrls = CATEGORIES.map(cat => ({
    url: `${baseUrl}/category/${cat.value}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...categoryUrls,
    ...toolUrls,
  ];
}
