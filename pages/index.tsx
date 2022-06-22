import type { NextPage } from "next";
import Head from "next/head";

import { Modules } from "../src/components/Modules/Modules";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Quiz ITIL</title>
        <meta name="description" content="O que é ITIL? Vamos descobrir!" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Modules />
    </>
  );
};

export default Home;
