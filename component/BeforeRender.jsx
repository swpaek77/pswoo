import { useAtom } from 'jotai';
import Head from 'next/head';
import { useEffect } from 'react';
import { loginJotai } from '../jotai';
import { GA_TRACKING_ID } from '../lib/gtag';

export default function BeforeRender() {
  const [isLogin, setIsLogin] = useAtom(loginJotai);

  useEffect(() => {
    let userData = localStorage.userData;
    if (userData) {
      userData = JSON.parse(userData);
      setIsLogin(userData);
    }
  }, []);

  return <>{isLogin.jwt}</>;
}
