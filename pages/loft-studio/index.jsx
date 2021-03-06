import axios from 'axios';
import FormData from 'form-data';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import moment from 'moment';
import styles from '../../styles/Home.module.css';
import XLSX from 'xlsx-js-style';
import { loginJotai, startLogout } from '../../jotai';
import { useAtom } from 'jotai';
import { buttonStyle } from '../../styles';
import 'file-saver';

const excelExport = async year => {
  if (!year) {
    alert('년도를 선택해주세요!');
    return;
  }

  try {
    const { data } = await axios.post('/api/flow', { year });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data.data);

    // 자동으로 할 경우 아래것
    // autofitColumns(ws, data.data);
    // 수동으로 변경
    ws['!cols'] = [
      //
      { width: 10 },
      { width: 11 },
      { width: 11 },
      { width: 40 },
      { width: 40 },
      { width: 8 },
    ];
    // 스타일 추가
    columnStyles(ws);

    XLSX.utils.book_append_sheet(wb, ws, `${year} LOFT STUDIO`);
    XLSX.writeFile(wb, `[${year}] LOFT STUDIO.xlsx`);
  } catch (err) {
    alert('치명적인 에러!');
    console.log(err);
  }
};

function autofitColumns(ws, json) {
  let objectMaxLength = [];

  json.map(jsonData => {
    Object.entries(jsonData).map(([, v], idx) => {
      let columnValue = v;
      let columnLength = isNaN(columnValue.length) ? 10 : columnValue.length;
      objectMaxLength[idx] = objectMaxLength[idx] >= columnLength ? objectMaxLength[idx] : columnLength;
    });
  });

  ws['!cols'] = objectMaxLength.map(w => ({ width: w + 2 }));
}

function columnStyles(ws) {
  Object.entries(ws).forEach(([header, value]) => {
    if (header.slice(0, 1) !== '!') {
      value.s = {
        font: {
          name: '맑은 고딕',
          sz: 10,
        },
      };

      const splitHeader = header.split('1');
      if (splitHeader.length === 2 && splitHeader[0].length === 1 && splitHeader[1] === '') {
        value.s.font.bold = true;
        value.s.font.sz = 12;
      }
    }
  });
}

function getYears() {
  const firstYear = 2016;
  const currentYear = moment().year();
  const yearMap = [];

  for (let i = firstYear; i <= currentYear; i++) {
    yearMap.push(i);
  }

  return yearMap;
}

export default function LoftStudio() {
  const [year, setYear] = useState('');
  const [isLogin, setIsLogin] = useAtom(loginJotai);

  return (
    <div className={styles.container}>
      {isLogin.isFirst ? (
        <></>
      ) : Object.keys(isLogin).length === 0 ? (
        <>
          <div>로그인이 필요합니다</div>

          <Link href="/login">
            <a style={buttonStyle}>로그인</a>
          </Link>

          <Link href="/register">
            <a style={buttonStyle}>회원가입</a>
          </Link>
        </>
      ) : (
        <div>
          <select onChange={e => setYear(e.target.value)} value={year}>
            <option>-- 년도 선택 --</option>
            {getYears()
              .reverse()
              .map((res, idx) => (
                <option key={idx}>{res}</option>
              ))}
          </select>

          <button onClick={() => excelExport(year)} style={buttonStyle}>
            엑셀 추출!
          </button>

          <a style={buttonStyle} onClick={() => startLogout(setIsLogin)}>
            로그아웃
          </a>

          <Link href="/">
            <a style={buttonStyle}>홈으로</a>
          </Link>
        </div>
      )}
    </div>
  );
}
