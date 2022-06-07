import React, { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import styles from "./ThemeComponent.module.scss";

export const ThemeComponent: NextPage = () => {
  const router = useRouter();
  const [progress, getProgress] = useState(false);
  const modules = [
    {
      title: "Fundamentos",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam" +
        "cupiditate excepturi modi voluptatem cum. Deserunt qui",
      image: "/bookBlue.svg",
      link: "www.google.com",
      finished: false,
    },
    {
      title: "Fundamentos 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam" +
        "cupiditate excepturi modi voluptatem cum. Deserunt qui",
      image: "/bookBlue.svg",
      link: "www.github.com/brunossales",
      finished: true,
    },
    {
      title: "Fundamentos 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam" +
        "cupiditate excepturi modi voluptatem cum. Deserunt qui",
      image: "/bookBlue.svg",
      link: "www.github.com/brunossales",
      finished: true,
    },
    {
      title: "Fundamentos 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam" +
        "cupiditate excepturi modi voluptatem cum. Deserunt qui",
      image: "/bookBlue.svg",
      link: "www.github.com/brunossales",
      finished: true,
    },
    {
      title: "Fundamentos 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam" +
        "cupiditate excepturi modi voluptatem cum. Deserunt qui",
      image: "/bookBlue.svg",
      link: "www.github.com/brunossales",
      finished: true,
    },
  ];

  function redirect(link: string) {
    return router.push(link);
  }

  return (
    <div className={styles.container}>
      <header>
        Você tem <strong>0 pontos</strong>
      </header>

      <h1>Módulos</h1>
      {modules.map((module) => {
        return (
          <div onClick={() => redirect(module.link)}>
            <div className={module.finished ? styles.boxContainer : ""}>
              <img src={module.image} alt="" />
            </div>

            <div className={styles.containerModule}>
              <h3>{module.title}</h3>
              <p>{module.description} </p>
            </div>
          </div>
        );
      })}
        <footer>Resolva todos os módulos para revisar o aprendizado</footer>
    </div>
  );
};
