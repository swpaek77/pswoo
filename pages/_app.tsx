import '../styles/globals.css';
import type { AppProps } from 'next/app';
import store from '../redux';
import { Provider } from 'react-redux';
import Particles from '../component/Particles';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';
import { useEffect, useLayoutEffect } from 'react';
import { loginJotai } from '../jotai';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';

const BeforeRender = dynamic(() => import('../component/BeforeRender'));

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <BeforeRender />
      <Particles>
        <Component {...pageProps} />
      </Particles>
    </Provider>
  );
}
export default MyApp;
