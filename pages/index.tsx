import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { buttonStyle } from '../styles';
import FAQComponent from '../component/FAQComponent';
import { translate } from '../languages';
import { LogoutAction, StrapiError } from '../lib/common';
import { useDispatch, useSelector } from 'react-redux';
import { LoginInfoRedux } from '../redux/LoginRedux';
import Animation from '../component/Animation';

export default function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const loginInfo = useSelector(({ LoginRedux }: any) => LoginRedux.loginInfo);

  useEffect(() => {
    getLoginInfo();
    getProducts();
  }, []);

  const getLoginInfo = async () => {
    const userData = localStorage.userData;

    if (userData) {
      dispatch(LoginInfoRedux(JSON.parse(userData)));
    }
  };

  const getProducts = async () => {
    try {
      const { data } = await axios.get('https://api.pswoo.com/products');
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const preventClick = (e: any) => {
    e.preventDefault();
  };

  const getAuthContacts = async () => {
    try {
      const { data } = await axios.get('https://api.pswoo.com/contacts', {
        params: {
          _sort: 'created_at:DESC',
        },
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.userData).jwt}`,
        },
      });
      setContacts(data);
    } catch (err) {
      console.log(err);
      alert(translate.ko[StrapiError(err)] || '치명적인 오류');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Seungwoo Paek</title>
        <meta name="description" content="Seungwoo Paek Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{' '}
          <a href="#!" onClick={preventClick}>
            Seungwoo Paek!
          </a>
        </h1>

        <div>승우백의 웹사이트에 오신 것을 환영합니다.</div>

        <Animation />

        <Link href="/loft-studio">엑셀 추출</Link>
      </main>
    </div>
  );
}
