import Layout from "@/components/layout/Layout";
import { store } from "@/store";
import { ThemeProvider } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { theme } from "../../utils/theme";
import "../styles/globals.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
