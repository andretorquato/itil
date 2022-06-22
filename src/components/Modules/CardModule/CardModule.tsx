import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";

import Icon from "@mui/material/Icon";

import styles from "./CardModule.module.scss";

interface CardModuleProps {
  module: any;
  completed: boolean;
  onClick: (module: any) => void;
}
export const CardModule: NextPage<CardModuleProps> = ({
  module,
  completed,
  onClick,
}) => {
  const moduleClass = (completed: boolean) => {
    return completed
      ? `${styles["module-box"]} ${styles.completed}`
      : styles["module-box"];
  };

  return (
    <div onClick={() => onClick(module)} className={moduleClass(completed)}>
      <div className={styles.icon}>
        <Icon>{module.icon}</Icon>
      </div>
      <div className={styles.description}>
        <p>{module.name}</p>
        <span>{module.description}</span>
      </div>
    </div>
  );
};
