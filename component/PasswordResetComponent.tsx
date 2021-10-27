import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { translate } from '../languages';
import { LogoutAction } from '../lib/common';
import { buttonStyle, requiredStyle } from '../styles';

const PasswordResetComponent = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const onSubmit = handleSubmit(data => PasswordReset(data));

  const PasswordReset = async (loginInfo: any) => {
    try {
      const { data } = await axios.post('https://api.pswoo.com/auth/forgot-password', {
        ...loginInfo,
      });
      console.log(data);
    } catch (err: any) {
      console.log(err);
      alert(translate.ko[err.response.data.data[0].messages[0].id] || '치명적인 오류');
    }
  };

  return (
    <div>
      비밀번호 초기화
      <form onSubmit={onSubmit}>
        <label>이메일 :</label>
        <input {...register('email', { required: true })} type="email" />
        {errors.email?.type === 'required' && <div style={requiredStyle}>이메일을 입력해주세요!</div>}
        <br />

        <input type="submit" value="비밀번호 초기화" />
        <a style={buttonStyle} onClick={() => LogoutAction(dispatch)}>
          로그아웃
        </a>
      </form>
    </div>
  );
};
export default PasswordResetComponent;
