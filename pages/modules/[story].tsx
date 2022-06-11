import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import styles from "../../styles/Story.module.scss";

import database from "../../database.json";
import Questions from "../../src/components/Questions/Questions";

const Story: NextPage = () => {
  const [currentStep, setCurrentStep] = useState("introduction");
  const [module, setModule]: any | null = useState(null);
  const router = useRouter();
  const steps = ["introduction", "contextualization", "questions", "finish"];
  const { story } = router.query;

  useEffect(() => {
    const newModule = database.modules.find((m) => m.slug === story);
    setModule({ ...newModule });
    
  }, []);

  const changeStep = (step: string) => {
    setCurrentStep(step);
  };
  const nextStep = () => {
    const index = steps.indexOf(currentStep);
    const isFinishSteps =
      steps[index + 1] !== undefined && steps[index + 1] == "finish";
    if (isFinishSteps) {
      router.push("/");
    }
    if (index < steps.length - 1) {
      changeStep(steps[index + 1]);
    }
  };
  return (
    <>
      <div className={styles.container}>
        {(() => {
          switch (currentStep) {
            case "introduction":
              return (
                <div>
                  <h1>Introdução</h1>
                  <p>{module?.name}</p>
                  <button onClick={nextStep}>Ver contexto</button>
                </div>
              );
            case "contextualization":
              return (
                <div>
                  <h1>Contexto</h1>
                  <div></div>
                  <button onClick={nextStep}>Responder questões</button>
                </div>
              );
            case "questions":
              return <Questions module={module} next={nextStep} />;
            default:
              return <div>Voltar para tela inicial</div>;
          }
        })()}
      </div>
    </>
  );
};

export default Story;
