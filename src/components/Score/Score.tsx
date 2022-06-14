import type { NextPage } from "next";

import styles from "./Score.module.scss";

interface ScoreProps {
  score: number;
}

const Score: NextPage<ScoreProps> = ({ score }) => {
  return (
    <div>
      Você tem <span className={styles.score}>{score} pontos</span>
    </div>
  );
};

export default Score;
