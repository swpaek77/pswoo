import axios from 'axios';
import moment from 'moment';
import FormData from 'form-data';

export default async function handler(req, res) {
  const { year } = req.body;

  let final_result = {};
  try {
    const _JSON_ = encodeURIComponent(
      JSON.stringify({
        USER_ID: 'kakao_404631800',
        RGSN_DTTM: 'FLOW_xtbZYsqc%2FseuGlbCS3JYNOwyxBy1QTIh%2FU18tAMKV9BwAbDZcrJCkUIcqfCrBMM3A7dLZwBGk%2BKZ42U28%2BJR7g%3D%3D',
        USE_INTT_ID: 'KAKAO_170414135901',
        FIRST_DT: moment(year?.toString()).startOf('year').format('YYYYMMDD'),
        LAST_DT: moment(year?.toString()).endOf('year').format('YYYYMMDD'),
        PROJECT_SCHD_FILTER: '0,1',
        TASK_SCHD_FILTER: '2',
        COLABO_SRNO: '255217',
      })
    );

    let form = new FormData();
    form.append('_JSON_', _JSON_);
    const form_headers = form.getHeaders();
    const { data } = await axios.post('https://flow.team/COLABO2_SCHD_R005.jct', form, {
      headers: {
        ...form_headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!data.COMMON_HEAD || data.COMMON_HEAD.ERROR) {
      throw Error('data response error');
    } else {
      let step1_res = [];

      data.SCHD_REC.sort((a, b) => a.COLABO_COMMT_SRNO - b.COLABO_COMMT_SRNO);
      data.SCHD_REC.forEach(res => {
        if (res.COLABO_COMMT_SRNO === '-1') {
          return;
        }

        const startDate = moment(res.STTG_DTTM.substr(0, 8));
        const endDate = moment(res.FNSH_DTTM.substr(0, 8));
        let duration = moment.duration(endDate.diff(startDate)).asDays();
        duration = duration < 1 ? 1 : duration;

        step1_res.push({
          키값: res.COLABO_COMMT_SRNO,
          시작일: startDate.format('YYYY-MM-DD'),
          종료일: endDate.format('YYYY-MM-DD'),
          설명: res.TTL,
          장소: res.PLACE,
          기간: duration,
        });
      });
      final_result.result = 'success';
      final_result.data = step1_res;
    }
  } catch (err) {
    final_result.result = 'error';
    final_result.message = err.message;
  }
  res.status(200).json(final_result);
}
