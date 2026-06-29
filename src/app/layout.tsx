import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Tools Radar — Top 50 AI Tools Ranked',
  description: 'Discover the best AI tools ranked by community votes. Filter by category, search, and see trending tools of the week.',
  keywords: ['AI tools', 'artificial intelligence', 'product hunt', 'AI directory'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
