import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";

import styles from "../../styles/Story.module.scss";

import database from "../../database.json";
import config from "../../src/configuration/config.json";

import Questions from "../../src/components/Quiz/QuestionsStep/QuestionsStep";
import IntroductionStep from "../../src/components/Quiz/IntroductionStep/IntroductionStep";
import ContextStep from "../../src/components/Quiz/ContextStep/ContextStep";
import {
  getProgress,
  saveProgress,
} from "../../src/controllers/quiz-controller";
import { Question } from "../../src/models/module";

const steps = ["introduction", "contextualization", "questions", "finish"];

const Story: NextPage = () => {
  const [currentStep, setCurrentStep] = useState("introduction");
  const [activeModule, setActiveModule]: any | null = useState(null);
  const [score, setScore] = useState(0);
  const [moduleSlug, setModuleSlug] = useState("");
  const router = useRouter();
  const { module } = router.query;

  useEffect(() => {
    const data = getProgress();
    let newModule = database.modules.find((m) => m.slug === moduleSlug);
    if (newModule) {
      const completedModule = data?.completedModules.find(
        (cm: any) => cm.id === newModule?.id
      );
      newModule.questions = newModule.questions.map((q: any) => {
        return {
          ...q,
          answered:
            completedModule?.questions?.find((cq: any) => cq.id === q.id)
              ?.answered || false,
        };
      });
    }
    data && setScore(data?.score || 0);
    setActiveModule({ ...newModule });
  }, [moduleSlug]);

  useEffect(() => {
    if (module) setModuleSlug(module as string);
  }, [module]);

  const changeStep = (step: string) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    const index = steps.indexOf(currentStep);
    const isFinishSteps =
      steps[index + 1] !== undefined && steps[index + 1] == "finish";
    if (isFinishSteps) {
      saveProgress(activeModule, score);
      router.push("/");
    }
    if (index < steps.length - 1) {
      changeStep(steps[index + 1]);
    }
  };

  const updateScore = (activeQ: Question) => {
    const question = activeModule.questions.find((q: any) => q.id === activeQ.id);
    if (question && !question.answered) {
      setScore(score + config["default_xp"]);
      setTimeout(() => {
        question.answered = true;
      }, 500);
    }
  };

  return (
    <>
      <Head>
        <title>QUIZ ITIL - {activeModule?.name}</title>
      </Head>
      <div className={styles.container}>
        {(() => {
          switch (currentStep) {
            case "introduction":
              return <IntroductionStep module={activeModule} next={nextStep} />;
            case "contextualization":
              return <ContextStep module={activeModule} next={nextStep} />;
            case "questions":
              return (
                <Questions
                  module={activeModule}
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
