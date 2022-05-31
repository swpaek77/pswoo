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
import { NotionAPI } from 'notion-client';
import { NotionRenderer } from 'react-notion-x';

// const notion = new NotionAPI()

// const recordMap = await notion.getPage('067dd719a912471ea9a3ac10710e7fdf')

// export default ({ recordMap }) => (
//   <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
// )
// const notion = new NotionAPI();
// let recordMap: any = [];
// <notion.ExtendedRecordMap>
// RecordMap
export default function Home() {
  const preventClick = (e: any) => {
    e.preventDefault();
  };
  // const getNotion = async () => {
  //   recordMap = await notion.getPage('067dd719a912471ea9a3ac10710e7fdf');
  // };

  useEffect(() => {
    // getNotion();
  }, []);

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
        {/* <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} /> */}

        {/* <Link href="/loft-studio">엑셀 추출</Link> */}
        <Link href="/framer-test">Framer 테스트</Link>
      </main>
    </div>
  );
}
