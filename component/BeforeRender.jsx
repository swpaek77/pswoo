import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { loginJotai } from '../jotai';

export default function BeforeRender() {
  const [isLogin, setIsLogin] = useAtom(loginJotai);

  useEffect(() => {
    let userData = localStorage.userData;
    if (userData) {
      userData = JSON.parse(userData);
      setIsLogin(userData);
    } else {
      setIsLogin({});
    }
  }, []);

  return <></>;
}
