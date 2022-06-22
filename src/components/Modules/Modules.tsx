import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";

import database from "../../../database.json";

import { getProgress } from "../../controllers/quiz-controller";

import ModuleDialog from "../ModuleDialog/ModuleDialog";
import Score from "../Score/Score";
import { CardModule } from "./CardModule/CardModule";

import styles from "./Modules.module.scss";

export const Modules: NextPage = () => {
  const router = useRouter();

  const [modules, setModules] = useState<any[]>([]);
  const [activeModule, setActiveModule] = useState<any>();
  const [score, setScore] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const sessionData = getProgress();
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

  return (
    <div className={styles.container}>
      <Score score={score} />
      <h1>Módulos</h1>
      <div className={styles.modulesContainer}>
        {modules.map((m) => {
          return (
            <CardModule
              key={m.id}
              module={m}
              completed={m.completed}
              onClick={handleOpenDialog}
            />
          );
        })}
      </div>
      <ModuleDialog
        open={openDialog}
        title={`${activeModule?.name} - ${activeModule?.description}`}
        handleClose={handleCloseDialog}
        handleStart={handleStartModule}
      />
    </div>
  );
};
