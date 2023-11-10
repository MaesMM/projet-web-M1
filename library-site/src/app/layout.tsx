import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactElement, ReactNode } from 'react';
import Menu from '@/component/menu';
import Header from '@/component/header';
import Provider from '@/component/provider';

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
      <Provider>
        <body className={inter.className}>
          <main className="flex h-screen overflow-hidden px-8 gap-8 pt-8">
            <div className="pb-8 flex flex-1">
              <Menu />
            </div>
            <div className="flex flex-[3] flex-col">
              <Header />
              <div
                style={{ scrollbarWidth: 'none' }}
                className="overflow-y-scroll -mt-12 pt-20 pb-8"
              >
                {children}
              </div>
            </div>
          </main>
        </body>
      </Provider>
    </html>
  );
}
