import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { translate } from '../languages';
import { requiredStyle } from '../styles';

const FAQComponent = () => {
  const [loading, setLoading] = useState<any>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const onSubmit = handleSubmit(data => postContact(data));

  const postContact = async (info: any) => {
    try {
      setLoading(true);
      const { data } = await axios.post('https://api.pswoo.com/contacts', {
        ...info,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      문의사항
      <form onSubmit={onSubmit}>
        <label>이메일 :</label>
        <input {...register('email', { required: true })} type="email" />
        {errors.email?.type === 'required' && <div style={requiredStyle}>이메일을 입력해주세요!</div>}
        <br />

        <label>내용 :</label>
        <textarea {...register('content')} />
        <br />

        <input type="submit" />
      </form>
      {loading && <div>전송중...</div>}
    </div>
  );
};
export default FAQComponent;
