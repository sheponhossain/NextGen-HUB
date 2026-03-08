'use client';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/Navbar/Page';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="false">
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
