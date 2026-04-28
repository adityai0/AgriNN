import type { Metadata } from 'next';
import { Geist, Geist_Mono, Space_Grotesk, Manrope } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Providers } from '@/components/providers';

const manropeHeading = Manrope({ subsets: ['latin'], variable: '--font-heading' });

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AgriNN | AI-Powered Livestock Classification',
  description:
    "Automate livestock body structure analysis and Animal Type Classification (ATC) with AgriNN's advanced computer vision pipeline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        spaceGrotesk.variable,
        manropeHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
