import type { NextPage } from "next";
import Head from "next/head";
import { HomeComponent } from "../src/components/Home/HomeComponent";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Quiz Itil</title>
      </Head>
      <HomeComponent />
    </>
  );
};

export default Home;
