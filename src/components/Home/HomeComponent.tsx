import React from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";

import database from "../../../database.json";
import styles from "./HomeComponent.module.scss";

export const HomeComponent: NextPage = () => {
  const router = useRouter();
  const modules = database.modules;

  return (
    <div className={styles.container}>
      <h1>Modulos</h1>
      {modules.map((m) => {
        return (
          <div key={m.id}>
            <h2>{m.name}</h2>
            <button onClick={() => router.push(`/modules/${m.slug}`)}>
              Iniciar Modulo
            </button>
          </div>
        );
      })}
    </div>
  );
};
