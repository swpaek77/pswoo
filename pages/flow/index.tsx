import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import styles from '../../styles/Home.module.css';

export default function Home() {
  const getFlowList = async () => {
    try {
      // const { data } = await axios.post('https://flow.team/COLABO2_SCHD_R005.jct', {
      //   _JSON_: {
      //     USER_ID: 'kakao_404631800',
      //     RGSN_DTTM: 'FLOW_xtbZYsqc%2FseuGlbCS3JYNOwyxBy1QTIh%2FU18tAMKV9BwAbDZcrJCkUIcqfCrBMM3A7dLZwBGk%2BKZ42U28%2BJR7g%3D%3D',
      //     USE_INTT_ID: 'KAKAO_170414135901',
      //     FIRST_DT: '20190101',
      //     LAST_DT: '20191231',
      //     PROJECT_SCHD_FILTER: '0,1',
      //     TASK_SCHD_FILTER: '2',
      //     COLABO_SRNO: '255217',
      //   },
      // });
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFlowList();
  }, []);
  return (
    <div className={styles.container}>
      <div>1234</div>
    </div>
  );
}
