import { LoginInfoRedux } from '../redux/LoginRedux';

export const StrapiError = err => {
  switch (err.response.data.statusCode) {
    case 403:
      return 'FORBIDDEN_ERROR';
    default:
      return err.response.data.data?.[0].messages[0].id;
  }
};

export const LogoutAction = dispatch => {
  localStorage.removeItem('userData');
  dispatch(LoginInfoRedux({}));
};
