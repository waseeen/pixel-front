import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './main.css';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  styles: {
    global: {
      body: {
        bg: '#9f9f9f',
        overflow: 'hidden',
      },
    },
  },
  fonts: {
    body: `'Roboto mono', monospace`,
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <I18nextProvider i18n={i18n}>
      <ChakraProvider theme={theme}>
        <App />
        <ToastContainer
          position="bottom-right"
          autoClose={1500}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </ChakraProvider>
    </I18nextProvider>
  </>,
);
