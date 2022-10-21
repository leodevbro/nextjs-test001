import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { PermanentLayout } from "components/PermanentLayout";
import Layout from "components/layout/Layout";
import { useEffect } from "react";
import { getDbConnection, gloBack } from "./api/new-meetup";

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   if (!gloBack.vvv) {
  //     getDbConnection().then((connection) => {
  //       gloBack.vvv = connection;
  //     });
  //   }
  // }, []);

  return (
    <PermanentLayout>
      <Layout>
        <div>
          <Head>
            <title>Leo tutorial</title>
          </Head>

          <Component {...pageProps} />
        </div>
      </Layout>
    </PermanentLayout>
  );
}

export default MyApp;
