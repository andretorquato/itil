import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";

import Button from "@mui/material/Button";

import database from "../../../database.json";

import styles from "./HomeComponent.module.scss";
import Score from "../Score/Score";
import { getProgress } from "../../controllers/quiz-controller";

export const HomeComponent: NextPage = () => {
  const [modules, setModules] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const router = useRouter();

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

  return (
    <div className={styles.container}>
      <Score score={score} />
      <h1>Modulos</h1>
      {modules.map((m) => {
        return (
          <div key={m.id}>
            <div className={styles.header}>
              <h2>{m.name}</h2> {m.completed && <i>Completo</i>}
            </div>

            <Button
              variant="contained"
              onClick={() => router.push(`/modules/${m.slug}`)}
            >
              Iniciar Modulo
            </Button>
          </div>
        );
      })}
    </div>
  );
};
