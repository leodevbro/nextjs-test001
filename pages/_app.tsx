import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { PermanentLayout } from "components/PermanentLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PermanentLayout>
      <div>
        <Head>
          <title>Leo tutorial</title>
        </Head>

        <Component {...pageProps} />
      </div>
    </PermanentLayout>
  );
}

export default MyApp;
