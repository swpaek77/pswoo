const LOGIN_INFO = 'login/LOGIN_INFO';

export const LoginInfoRedux = (loginInfo: any) => ({ type: LOGIN_INFO, loginInfo });

const initialState = {
  loginInfo: {},
};

const LoginRedux = (state: any = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_INFO:
      return { ...state, loginInfo: action.loginInfo };
    default:
      return state;
  }
};

export default LoginRedux;
