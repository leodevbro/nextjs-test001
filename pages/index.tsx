import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import sty from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={sty.container}>
      <Head>
        <title>Leo tutorial</title>
      </Head>
      <Link href={"/about"}>about</Link>
      <h1 className={sty.hello}>Hello</h1>
    </div>
  );
};

export default Home;
