export type Locale = 'en' | 'ru';

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Meta
    siteTitle: 'AI Tools Radar',
    siteDescription: 'Top 50 AI tools ranked by community votes. Filter by category, search, and discover what\'s trending this week.',
    
    // Header
    top50Ranked: 'Top 50 AI tools ranked',
    
    // Hero
    updatedWeekly: 'Updated weekly',
    heroTitle1: 'Discover the Best',
    heroTitle2: 'AI Tools',
    heroSubtitle: 'Top 50 AI tools ranked by community votes. Filter by category, search, and discover what\'s trending this week.',
    
    // Search
    searchPlaceholder: 'Search AI tools...',
    
    // Filters
    allTools: 'All Tools',
    textWriting: 'Text & Writing',
    imageDesign: 'Image & Design',
    codeDev: 'Code & Dev',
    audioMusic: 'Audio & Music',
    video: 'Video',
    other: 'Other',
    
    // Results
    showingCount: 'Showing',
    ofTools: 'of 50 tools',
    noToolsFound: 'No tools found',
    tryAdjusting: 'Try adjusting your search or filter criteria.',
    
    // Trending
    trendingWeek: 'Trending This Week',
    
    // Footer
    sourcedFrom: 'Data sourced from Product Hunt & community · Built with Next.js',
    
    // Categories
    text: 'Text',
    image: 'Image',
    code: 'Code',
    audio: 'Audio',
    
    // Card
    visit: 'Visit',
    votes: 'votes',
    
    // Lang
    langEn: 'EN',
    langRu: 'RU',
  },
  ru: {
    // Мета
    siteTitle: 'AI Tools Radar',
    siteDescription: 'Топ-50 AI-инструментов по голосам сообщества. Фильтр по категориям, поиск и тренды недели.',
    
    // Хедер
    top50Ranked: 'Топ-50 AI-инструментов',
    
    // Герой
    updatedWeekly: 'Обновляется еженедельно',
    heroTitle1: 'Открой для себя',
    heroTitle2: 'AI-инструменты',
    heroSubtitle: 'Топ-50 AI-инструментов по голосам сообщества. Фильтруй по категориям, ищи и узнавай что в тренде этой недели.',
    
    // Поиск
    searchPlaceholder: 'Поиск AI-инструментов...',
    
    // Фильтры
    allTools: 'Все инструменты',
    textWriting: 'Текст и написание',
    imageDesign: 'Картинки и дизайн',
    codeDev: 'Код и разработка',
    audioMusic: 'Аудио и музыка',
    video: 'Видео',
    other: 'Другое',
    
    // Результаты
    showingCount: 'Показано',
    ofTools: 'из 50 инструментов',
    noToolsFound: 'Инструменты не найдены',
    tryAdjusting: 'Попробуй изменить поиск или фильтр.',
    
    // Тренды
    trendingWeek: 'Тренды недели',
    
    // Футер
    sourcedFrom: 'Данные Product Hunt и сообщества · Сделано на Next.js',
    
    // Категории
    text: 'Текст',
    image: 'Картинки',
    code: 'Код',
    audio: 'Аудио',
    
    // Карточка
    visit: 'Открыть',
    votes: 'голосов',
    
    // Язык
    langEn: 'EN',
    langRu: 'RU',
  },
};
