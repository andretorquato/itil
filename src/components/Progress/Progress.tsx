import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./Progress.module.scss";

interface ProgressProps {
  activeIndex: number;
  total: number;
}

const Progress: NextPage<ProgressProps> = ({ activeIndex, total }) => {
  const [width, setWidth] = useState("0%");

  useEffect(() => {
    setWidth(`${(activeIndex / total) * 100}%`);
  }, [activeIndex, total]);

  return (
    <div className={styles.progress}>
      <div
			className={styles.progressBar}
        style={{
          width: width,
          height: 6,
          borderRadius: 3,
          backgroundColor: "var(--primary)",
          transition: "width 0.5s ease-in-out",
        }}
      />
    </div>
  );
};

export default Progress;
