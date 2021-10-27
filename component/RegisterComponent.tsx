import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { translate } from '../languages';
import { requiredStyle } from '../styles';

const RegisterComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const onSubmit = handleSubmit(data => Register(data));

  const Register = async (loginInfo: any) => {
    try {
      const { data } = await axios.post('https://api.pswoo.com/auth/local/register', {
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
      회원가입
      <form onSubmit={onSubmit}>
        <label>아이디 :</label>
        <input {...register('username', { required: true })} />
        {errors.username?.type === 'required' && <div style={requiredStyle}>이름을 입력해주세요!</div>}
        <br />

        <label>이메일 :</label>
        <input {...register('email', { required: true })} type="email" />
        {errors.email?.type === 'required' && <div style={requiredStyle}>이메일을 입력해주세요!</div>}
        <br />

        <label>비밀번호 :</label>
        <input {...register('password', { required: true })} type="password" />
        {errors.password?.type === 'required' && <div style={requiredStyle}>비밀번호를 입력해주세요!</div>}
        <br />

        <input type="submit" value="회원가입" />
      </form>
    </div>
  );
};
export default RegisterComponent;
