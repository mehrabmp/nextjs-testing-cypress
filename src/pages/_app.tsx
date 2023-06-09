import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <main className={`${inter.variable} font-sans`}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <Toaster position="bottom-center" richColors closeButton />
      </SessionProvider>
    </main>
  );
}
