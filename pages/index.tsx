import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { buttonStyle } from '../styles';
import FAQComponent from '../component/FAQComponent';
import { translate } from '../languages';
import { StrapiError } from '../lib/common';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

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

        <div>프론트: JS, React, React Native, Vue.js</div>
        <div>백엔드: Node.js, C#, Java, Next.js</div>
        <div>기타: Strapi, WordPress, Figma, ghidra</div>
        <div>DB: Oracle, SQL Server, MySQL, SQLite</div>
        <div>포트폴리오: 창고 관리 시스템, 리포트 프로그램, B2B 아이템 주문 어플, CRM 영업사원 어플, 특정 제품 판매 어플</div>

        <div style={{ display: 'none' }}>{products.map((res, idx) => idx < 10 && <div key={res.id}>{res.ItemCode}</div>)}</div>

        <Link href="/mypage">
          <a style={buttonStyle}>자세한 정보 보기</a>
        </Link>

        <Link href="/login">
          <a style={buttonStyle}>로그인</a>
        </Link>

        <Link href="/register">
          <a style={buttonStyle}>회원가입</a>
        </Link>

        <Link href="/password-reset">
          <a style={buttonStyle}>비밀번호 초기화</a>
        </Link>

        <FAQComponent />

        <a style={buttonStyle} onClick={getAuthContacts}>
          더 자세한 정보 보기
        </a>
        {contacts.map(
          (res, idx) =>
            idx < 10 && (
              <div key={res.id}>
                [{res.email}] {res.content}
              </div>
            )
        )}
      </main>
    </div>
  );
}
