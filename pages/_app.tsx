import '../styles/globals.css';
import type { AppProps } from 'next/app';
import store from '../redux';
import { Provider } from 'react-redux';
import Particles from '../component/Particles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Particles>
        <Component {...pageProps} />
      </Particles>
    </Provider>
  );
}
export default MyApp;
