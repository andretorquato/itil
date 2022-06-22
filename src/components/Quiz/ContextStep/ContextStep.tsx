import { Button } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";

import { ModuleProps } from "../../../models/module";

import styles from "./ContextStep.module.scss";

interface ContextStepProps {
  module: ModuleProps;
  buttonText?: string;
  next: () => void;
}

const ContextStep: NextPage<ContextStepProps> = ({
  module,
  buttonText,
  next,
}) => {
  return (
    <div className={styles.container}>
      <h1>Cenário {module?.name}</h1>
      <div>
        {module?.context?.images &&
          module.context.images.map((img) => (
            <div key={img} className={styles["image-container"]}>
              <Image
                src={img}
                width={"100%"}
                height={"100%"}
                layout="responsive"
                alt="test"
              />
            </div>
          ))}
      </div>
      <Button variant="contained" onClick={next}>
        {buttonText ? buttonText : "Agora quero ser testado(a)!"}
      </Button>
    </div>
  );
};

export default ContextStep;
