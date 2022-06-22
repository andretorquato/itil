import { Button } from "@mui/material";
import type { NextPage } from "next";

import { ModuleProps } from "../../../models/module";

import styles from "./IntroductionStep.module.scss";

interface IntroductionStepProps {
  module: ModuleProps;
  next: () => void;
}

const IntroductionStep: NextPage<IntroductionStepProps> = ({
  module,
  next,
}) => {
  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: module?.introduction?.html }}
        ></div>
        <Button variant="contained" onClick={next}>
          Prosseguir para o cenário
        </Button>
      </div>
    </>
  );
};

export default IntroductionStep;
