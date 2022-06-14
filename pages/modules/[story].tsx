import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import styles from "../../styles/Story.module.scss";

import database from "../../database.json";
import config from "../../src/configuration/config.json";

import Questions from "../../src/components/Questions/Questions";
import Introduction from "../../src/components/Introduction/Introduction";
import Presentation from "../../src/components/Presentation/Presentation";
import {
  getProgress,
  saveProgress,
} from "../../src/controllers/quiz-controller";

const steps = ["introduction", "contextualization", "questions", "finish"];

const Story: NextPage = () => {
  const [currentStep, setCurrentStep] = useState("introduction");
  const [module, setModule]: any | null = useState(null);
  const [score, setScore] = useState(0);
  const [moduleSlug, setModuleSlug] = useState("");
  const router = useRouter();
  const { story } = router.query;

  useEffect(() => {
    const newModule = database.modules.find((m) => m.slug === moduleSlug);
    const data = getProgress();
    data && setScore(data?.score || 0);
    setModule({ ...newModule });
  }, [moduleSlug]);

  useEffect(() => {
    if (story) setModuleSlug(story as string);
  }, [story]);

  const changeStep = (step: string) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    const index = steps.indexOf(currentStep);
    const isFinishSteps =
      steps[index + 1] !== undefined && steps[index + 1] == "finish";
    if (isFinishSteps) {
      saveProgress(module, score);
      router.push("/");
    }
    if (index < steps.length - 1) {
      changeStep(steps[index + 1]);
    }
  };

  const updateScore = () => {
    setScore(score + config["default_xp"]);
  };

  return (
    <>
      <div className={styles.container}>
        {(() => {
          switch (currentStep) {
            case "introduction":
              return <Introduction module={module} next={nextStep} />;
            case "contextualization":
              return <Presentation module={module} next={nextStep} />;
            case "questions":
              return (
                <Questions
                  module={module}
                  score={score}
                  next={nextStep}
                  updateScore={updateScore}
                />
              );
          }
        })()}
      </div>
    </>
  );
};

export default Story;
