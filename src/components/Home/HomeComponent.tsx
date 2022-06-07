import React from "react";

import type { NextPage } from 'next'
import styles from "./HomeComponent.module.scss";
import { useRouter } from "next/router";

export const HomeComponent: NextPage = () => {
  const router = useRouter();
  return (
		<div className={styles.container}>
			<h1>Modulos</h1>
      <button onClick={() => router.push("/modules/module-1")}>Modulo 1</button>
      <button onClick={() => router.push("/modules/module-2")}>Modulo 2</button>
      <button onClick={() => router.push("/modules/module-3")}>Modulo 3</button>
      <button onClick={() => router.push("/modules/module-4")}>Modulo 4</button>
    </div>
  )
}
