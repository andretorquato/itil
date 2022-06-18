import React, { useEffect, useState } from "react";

import type { NextPage } from "next";

import Button from "@mui/material/Button";
import Image from "next/image";

import styles from "./Start.module.scss";

interface StartProps {
	next: () => void;
}
export const Start: NextPage<StartProps> = ({ next }) => {
  return (
    <div className={styles.container}>
			<h1>O que é ITIL?</h1>
      <p>
        Phasellus egestas mi mi, eu fringilla velit convallis id. Pellentesque
        eu lacus ultricies velit porta mollis nec ac nibh. Phasellus egestas mi
        mi, eu fringilla velit convallis id. Pellentesque eu lacus ultricies
        velit porta mollis nec ac nibh.
      </p>
      <Image
        src="/itil-4x.png"
        width={200}
        height={200}
        alt="itil ilustration"
      />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed massa
        massa, euismod ut lacus vitae, semper lobortis ante. Phasellus egestas
        mi mi, eu fringilla velit convallis id. Pellentesque eu lacus ultricies
        velit porta mollis nec ac nibh.
      </p>
      <p>
        Phasellus egestas mi mi, eu fringilla velit convallis id. Pellentesque
        eu lacus ultricies velit porta mollis nec ac nibh. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Sed massa massa, euismod ut lacus
        vitae, semper lobortis ante. Phasellus egestas mi mi, eu fringilla velit
        convallis id. Pellentesque eu lacus ultricies velit porta mollis nec ac
        nibh. Phasellus egestas mi mi, eu fringilla velit convallis id.
        Pellentesque eu lacus ultricies velit porta mollis nec ac nibh.
      </p>
      <p>
        Sed massa massa, euismod ut lacus vitae, semper lobortis ante. Phasellus
        egestas mi mi, eu fringilla velit convallis id. Pellentesque eu lacus
        ultricies velit porta mollis nec ac nibh.
      </p>
      <Button variant="contained" onClick={() => next()}>Prosseguir para os módulos</Button>
    </div>
  );
};
