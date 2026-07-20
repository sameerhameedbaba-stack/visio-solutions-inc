import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeScript } from '@/components/ui/ThemeScript';
import { OrganizationSchema, WebSiteSchema } from '@/components/seo/StructuredData';
import { Analytics } from '@/components/seo/Analytics';
import { rootMetadata } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F9FC' },
    { media: '(prefers-color-scheme: dark)', color: '#08111F' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only rounded-control focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-brand focus:px-4 focus:py-2 focus:font-semibold focus:text-white focus:shadow-float"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <OrganizationSchema />
        <WebSiteSchema />
        <Analytics />
      </body>
    </html>
  );
}
