import { Button } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";

import { ModuleProps } from "../../models/module";

import styles from "./Presentation.module.scss";

interface PresentationProps {
  module: ModuleProps;
  next: () => void;
}

const Presentation: NextPage<PresentationProps> = ({ module, next }) => {
  return (
    <div className={styles.container}>
      <h1>Cenário {module?.name}</h1>
      <div>
        {module?.context?.images &&
          module.context.images.map((img) => (
            <div key={img} className={styles['image-container']}>
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
        Agora quero ser testado(a)!
      </Button>
    </div>
  );
};

export default Presentation;
