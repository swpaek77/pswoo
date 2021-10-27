import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { translate } from '../languages';
import { requiredStyle } from '../styles';

const LoginComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const onSubmit = handleSubmit(data => Login(data));

  const Login = async (loginInfo: any) => {
    try {
      const { data } = await axios.post('https://api.pswoo.com/auth/local', {
        ...loginInfo,
        identifier: loginInfo.email,
      });
      console.log(data);
    } catch (err: any) {
      console.log(err);
      alert(translate.ko[err.response.data.data[0].messages[0].id] || '치명적인 오류');
    }
  };

  return (
    <div>
      로그인
      <form onSubmit={onSubmit}>
        <label>이메일 :</label>
        <input {...register('email', { required: true })} type="email" />
        {errors.email?.type === 'required' && <div style={requiredStyle}>이메일을 입력해주세요!</div>}
        <br />

        <label>비밀번호 :</label>
        <input {...register('password', { required: true })} type="password" />
        {errors.password?.type === 'required' && <div style={requiredStyle}>비밀번호를 입력해주세요!</div>}
        <br />

        <input type="submit" value="로그인" />
      </form>
    </div>
  );
};
export default LoginComponent;
