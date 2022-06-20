import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";

import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";

import database from "../../../database.json";

import styles from "./HomeComponent.module.scss";

import config from "../../configuration/config.json";

import Score from "../Score/Score";
import { getProgress } from "../../controllers/quiz-controller";
import ModuleDialog from "../ModuleDialog/ModuleDialog";
import { Start } from "../Start/Start";

export const HomeComponent: NextPage = () => {
  const [modules, setModules] = useState<any[]>([]);
  const [activeModule, setActiveModule] = useState<any>();
  const [score, setScore] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [showIntroduction, setShowIntroduction] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const sessionData = getProgress();
    // setShowIntroduction(sessionData?.completedIntroduction ? false : true);
    setScore(sessionData?.score || 0);
    const newModules = database.modules.map((m) => {
      return {
        ...m,
        completed: sessionData?.completedModules.find(
          (cm: any) => cm.id === m.id
        ),
      };
    });
    setModules([...newModules]);
  }, []);

  const moduleClass = (completed: boolean) => {
    return completed
      ? `${styles.boxModule} ${styles.completed}`
      : styles.boxModule;
  };

  const handleOpenDialog = (module: any) => {
    setActiveModule(module);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setActiveModule(null);
    setOpenDialog(false);
  };

  const handleStartModule = () => {
    handleCloseDialog();
    router.push(`/modules/${activeModule.slug}`);
  };
  const handleFinishIntroduction = () => {
    // const data = localStorage.getItem(config.session);
    // if (data) {
    //   const sessionData = JSON.parse(data);
    //   sessionData.completedIntroduction = true;
    //   localStorage.setItem(config.session, JSON.stringify(sessionData));
    // }
    setShowIntroduction(false);
  };

  return (
    <div className={styles.container}>
      {!showIntroduction ? (
        <>
          <Score score={score} />
          <h1>Modulos</h1>
          <div className={styles.modulesContainer}>
            {modules.map((m) => {
              return (
                <div key={m.id}>
                  <div
                    onClick={() => handleOpenDialog(m)}
                    className={moduleClass(m.completed)}
                  >
                    <div className={styles.icon}>
                      <Icon>{m.icon}</Icon>
                    </div>
                    <div className={styles.description}>
                      <p>{m.name}</p>
                      <span>{m.description}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ModuleDialog
            open={openDialog}
            title={`${activeModule?.name} - ${activeModule?.description}`}
            handleClose={handleCloseDialog}
            handleStart={handleStartModule}
          />
        </>
      ) : (
        <Start next={handleFinishIntroduction} />
      )}
    </div>
  );
};
