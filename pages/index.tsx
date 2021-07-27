import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [values, setValues] = useState<any>({});
  const [loading, setLoading] = useState<any>(false);

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
      setLoading(true);
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
    } finally {
      setLoading(false);
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

        <div
          style={{
            display: 'none',
          }}
        >
          {products.map((res, idx) => idx < 10 && <div key={res.id}>{res.ItemCode}</div>)}
        </div>

        <Link href="/mypage">
          <a style={{ fontSize: 20, padding: '5px 10px', margin: 10, color: 'white', borderRadius: 10, backgroundColor: '#777' }}>자세한 정보 보기</a>
        </Link>

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
        {loading && <div>전송중...</div>}
      </main>
    </div>
  );
}
