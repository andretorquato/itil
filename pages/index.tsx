import type { NextPage } from "next";
import { HomeComponent } from "../src/components/Home/HomeComponent";
import { ThemeComponent } from "../src/components/themes/Themes";

 const Home: NextPage = () => {
  return (
    <>
      {/* <HomeComponent />; */}
      <ThemeComponent />
    </>
  );
};

export default Home;
