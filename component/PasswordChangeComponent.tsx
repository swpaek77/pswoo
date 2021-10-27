import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { translate } from '../languages';
import { requiredStyle } from '../styles';

const PasswordChangeComponent = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const onSubmit = handleSubmit(data => PasswordChange(data));

  const PasswordChange = async (loginInfo: any) => {
    try {
      const { data } = await axios.post('https://api.pswoo.com/auth/reset-password', {
        code: router.query.code,
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
      비밀번호 변경
      <form onSubmit={onSubmit}>
        <label>비밀번호 :</label>
        <input {...register('password', { required: true })} type="password" />
        {errors.password?.type === 'required' && <div style={requiredStyle}>비밀번호를 입력해주세요!</div>}
        <br />

        <label>비밀번호 재입력:</label>
        <input {...register('passwordConfirmation', { required: true })} type="password" />
        {errors.passwordConfirmation?.type === 'required' && <div style={requiredStyle}>비밀번호를 입력해주세요!</div>}
        <br />

        <input type="submit" value="비밀번호 변경" />
      </form>
    </div>
  );
};
export default PasswordChangeComponent;
