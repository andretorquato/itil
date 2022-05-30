import React from "react";

import type { NextPage } from 'next'
import styles from "./HomeComponent.module.scss";

export const HomeComponent: NextPage = () => {
  return (
		<div className={styles.container}>
			<h1>Hello World</h1>
    </div>
  )
}
