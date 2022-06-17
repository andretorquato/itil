import { Button } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import config from "../src/configuration/config.json";

const Home: NextPage = () => {
  const router = useRouter();
  const reset = () => {
    localStorage.removeItem(config.session);
    router.push("/");
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Button variant="outlined" onClick={() => reset()}>
        Reiniciar Quiz
      </Button>
    </div>
  );
};

export default Home;
