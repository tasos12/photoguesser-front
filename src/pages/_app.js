import '@/styles/globals.css'
import "@fontsource/public-sans";
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google'
import ViewProvider from '@/contexts/ViewContext';

export default function App({ Component, pageProps }) {

  return (
    <>
      <ViewProvider>
        <Component {...pageProps} />
      </ViewProvider>
      <Analytics />
      <GoogleAnalytics gaId="G-54E2L9SRYP" />
    </>
  );
}
