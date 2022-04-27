import axios from 'axios';
import FormData from 'form-data';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import styles from '../../styles/Home.module.css';

export default function Flow({ result }) {
  return (
    <div className={styles.container}>
      {!result.COMMON_HEAD || result.COMMON_HEAD.ERROR ? (
        <div>error</div>
      ) : (
        <div>
          {result.SCHD_REC.map((res, idx) => (
            <div key={idx}>
              <div>{res.CNTN}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  let result = {};
  // try {
  //   const _JSON_ = encodeURIComponent(
  //     JSON.stringify({
  //       USER_ID: 'kakao_404631800',
  //       RGSN_DTTM: 'FLOW_xtbZYsqc%2FseuGlbCS3JYNOwyxBy1QTIh%2FU18tAMKV9BwAbDZcrJCkUIcqfCrBMM3A7dLZwBGk%2BKZ42U28%2BJR7g%3D%3D',
  //       USE_INTT_ID: 'KAKAO_170414135901',
  //       FIRST_DT: '20190101',
  //       LAST_DT: '20191231',
  //       PROJECT_SCHD_FILTER: '0,1',
  //       TASK_SCHD_FILTER: '2',
  //       COLABO_SRNO: '255217',
  //     })
  //   );

  //   let form = new FormData();
  //   form.append('_JSON_', _JSON_);
  //   const form_headers = form.getHeaders();
  //   const { data } = await axios.post('https://flow.team/COLABO2_SCHD_R005.jct', form, {
  //     headers: {
  //       ...form_headers,
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //   });

  //   result = data;
  // } catch (err) {
  //   console.log(err);
  // }

  return {
    props: {
      result,
    },
  };
}
