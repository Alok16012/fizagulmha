import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'CLATians — Best CLAT Coaching in Patna | Bihar',
  description: 'India\'s leading CLAT coaching institute. Expert faculty, real mock tests, 15,000+ students mentored. Join CLATians for CLAT 2026 preparation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className={plusJakarta.className} style={{ overflowX: 'clip', maxWidth: '100%' }}>{children}</body>
    </html>
  );
}
