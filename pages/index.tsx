import type { NextPage } from "next";
import Head from "next/head";
import { HomeComponent } from "../src/components/Home/HomeComponent";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Quiz ITIL</title>
        <meta name="description" content="O que é ITIL? Vamos descobrir!" />
      </Head>
      <HomeComponent />
    </>
  );
};

export default Home;
