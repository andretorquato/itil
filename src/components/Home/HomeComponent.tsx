import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Image from "next/image";

import Button from "@mui/material/Button";

import database from "../../../database.json";
import config from "../../configuration/config.json";

import styles from "./HomeComponent.module.scss";

export const HomeComponent: NextPage = () => {
  const [modules, setModules] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const sessionData = getProgress();

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

  const getProgress = () => {
    const sessionData = localStorage.getItem(config.session);
    if (sessionData) {
      return JSON.parse(sessionData);
    }

    return null;
  };
  return (
    <div className={styles.container}>
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
