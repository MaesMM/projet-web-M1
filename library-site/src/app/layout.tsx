import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactElement, ReactNode } from 'react';
import Menu from '@/component/menu';
import Header from '@/component/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Library',
  description: 'Book management system',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen px-8 gap-8 py-8">
          <Menu />
          <div className="flex flex-[3] flex-col gap-8">
            <Header />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
