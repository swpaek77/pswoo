import axios from 'axios';
import { useEffect, useState } from 'react';

const userTitle = { margin: '5px 10px' };

const container = {
  // backgroundColor: '#f5f5f5',
  height: '100vh',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: 5,
};

const contentBox = {
  padding: '5px 10px',
};

const personalStyle = {
  display: 'flex',
  alignItems: 'flex-end',
  flexDirection: 'column',
};

export default function mypage() {
  return (
    <div style={container}>
      <div>
        <h1 style={userTitle}>Seungwoo Paek</h1>

        <div style={contentBox}>최고의 꼼꼼한 Oracle PL/SQL 개발자</div>
        <div style={contentBox}>Microsoft Dynamics ERP 개발자</div>
        <div style={contentBox}>React Native 개발자</div>
        <div style={contentBox}>WordPress 개발자</div>
        <div style={contentBox}>Ghidra 디컴파일 전문가</div>
        <div style={contentBox}>Report Program 개발자</div>
        <div style={contentBox}>B2B Item Order App 개발</div>
        <div style={contentBox}>CRM Salesman App 개발</div>
      </div>

      <div style={personalStyle}>
        <div>백승우</div>
        <div>App Developer</div>
      </div>
    </div>
  );
}
