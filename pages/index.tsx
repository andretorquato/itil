import type { NextPage } from "next";
import Head from "next/head";
import { HomeComponent } from "../src/components/Home/HomeComponent";

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
      <HomeComponent />
    </>
  );
};

export default Home;
