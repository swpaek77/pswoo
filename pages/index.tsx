import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [values, setValues] = useState<any>({});

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

  const InputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const postContact = async () => {
    try {
      console.log(values);
      const { data } = await axios.post('https://api.pswoo.com/contacts', {
        email: values.email,
        content: values.content,
        // published_at: '2021-07-05T13:13:13.182Z',
        // created_by: 'string',
        // updated_by: 'string',
      });
      console.log(data);
    } catch (err) {
      console.log(err);
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

        {/* <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.js</code>
        </p> */}

        <div
          style={{
            display: 'none',
          }}
        >
          {products.map((res, idx) => idx < 10 && <div key={res.id}>{res.ItemCode}</div>)}
        </div>

        <div>[문의사항]</div>
        <div>
          <label>
            이메일
            <input type="email" name="email" value={values.email} onChange={InputChange} />
          </label>
        </div>
        <div>
          <label>
            내용
            <textarea name="content" value={values.content} onChange={InputChange}></textarea>
          </label>
        </div>
        <button onClick={postContact}>전송</button>

        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/master/examples" className={styles.card}>
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" className={styles.card}>
            <h2>Deploy &rarr;</h2>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div> */}
      </main>

      {/* <footer className={styles.footer}>
        <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a> 
      </footer> */}
    </div>
  );
}
