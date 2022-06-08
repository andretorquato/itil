import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import database from "../../database.json";

const Story: NextPage = () => {
  const [currentStep, setCurrentStep] = useState("introduction");
  const [module, setModule]: any | null = useState(null);
  const router = useRouter();
  const steps = ["introduction", "contextualization", "questions", "finish"];
  const { story } = router.query;

  useEffect(() => {
    const newModule = database.modules.find((m) => m.slug === story);
    setModule({ ...newModule });
    console.log(module);
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
      <div>
        {(() => {
          switch (currentStep) {
            case "introduction":
              return (
                <div>
                  <h1>Introdução {module.name}</h1>
                  <button onClick={nextStep}>Ver contexto</button>
                </div>
              );
            case "contextualization":
              return (
                <div>
                  <h1>Contexto</h1>
                  <div>
                    {/* <p>{{ module.questions.}}</p> */}
                  </div>
                  <button onClick={nextStep}>Responder questões</button>
                </div>
              );
            case "questions":
              return (
                <div>
                  <h1>Questões</h1>
                  <button onClick={nextStep}>Finalizar</button>
                </div>
              );
            default:
              return <div>Voltar para tela inicial</div>;
          }
        })()}
      </div>
    </>
  );
};

export default Story;
