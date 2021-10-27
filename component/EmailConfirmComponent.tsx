import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { translate } from '../languages';
import { StrapiError } from '../lib/common';
import { requiredStyle } from '../styles';

const EmailConfirmComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const onSubmit = handleSubmit(data => EmailConfirm(data));

  const EmailConfirm = async (loginInfo: any) => {
    try {
      const { data } = await axios.post('https://api.pswoo.com/auth/send-email-confirmation', {
        ...loginInfo,
      });
      console.log(data);
    } catch (err: any) {
      console.log(err);
      alert(translate.ko[StrapiError(err)] || '치명적인 오류');
    }
  };

  return (
    <div>
      이메일 인증 재전송
      <form onSubmit={onSubmit}>
        <label>이메일 :</label>
        <input {...register('email', { required: true })} type="email" />
        {errors.email?.type === 'required' && <div style={requiredStyle}>이메일을 입력해주세요!</div>}
        <br />

        <input type="submit" value="재전송" />
      </form>
    </div>
  );
};
export default EmailConfirmComponent;
