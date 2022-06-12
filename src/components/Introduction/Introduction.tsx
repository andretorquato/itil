import { Button } from "@mui/material";
import type { NextPage } from "next";

import { ModuleProps } from "../../models/module";

import styles from "./Introduction.module.scss";

interface IntroductionProps {
  module: ModuleProps;
  next: () => void;
}

const Introduction: NextPage<IntroductionProps> = ({ module, next }) => {
  return (
    <>
      <div className={styles.container}>
        <h1>{module?.name}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: module?.introduction?.html }}
        ></div>
        <Button variant="contained" onClick={next}>
          Prosseguir para o cenário
        </Button>
      </div>
    </>
  );
};

export default Introduction;
