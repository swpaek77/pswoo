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
  const preventClick = (e: any) => {
    e.preventDefault();
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
