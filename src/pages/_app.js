import '@/styles/globals.css'
import "@fontsource/public-sans";
import { Analytics } from '@vercel/analytics/react';
import ViewProvider from '@/contexts/ViewContext';

export default function App({ Component, pageProps }) {
  return (
    <>
      <ViewProvider>
        <Component {...pageProps} />
      </ViewProvider>
      <Analytics />
    </>
  );
}
