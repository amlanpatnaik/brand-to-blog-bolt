import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AIBuddy — AI Content Pipeline',
  description:
    'From URL to ranking-ready content. AIBuddy extracts your brand signals, architects a content strategy, and writes SEO-optimized blog articles in seconds.',
  keywords: ['AI content', 'SEO', 'blog writing', 'content pipeline', 'brand extraction'],
  authors: [{ name: 'AIBuddy' }],
  themeColor: '#020617',
  colorScheme: 'dark',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'AIBuddy — AI Content Pipeline',
    description: 'From URL to ranking-ready content. Brand extraction, blog architecture, SEO writing.',
    type: 'website',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIBuddy — AI Content Pipeline',
    description: 'From URL to ranking-ready content.',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta name="theme-color" content="#020617" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body
        className={`${spaceGrotesk.className} antialiased min-h-screen bg-[#020617] text-white`}
        style={{ fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
