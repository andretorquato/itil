import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useState } from "react";

const Story: NextPage = () => {
  const [currentStep, setCurrentStep] = useState("introduction");
  const router = useRouter();
  const steps = ["introduction", "contextualization", "questions", "finish"];
  const { story } = router.query;

	const changeStep = (step: string) => {
		setCurrentStep(step);
	}
	const nextStep = () => {
		const index = steps.indexOf(currentStep);
		if(steps[index + 1] !== undefined && steps[index + 1] == "finish") {
			router.push("/");
		}
		if (index < steps.length - 1) {
			changeStep(steps[index + 1]);
		}
	}
  return (
    <>
      <div>
        {(() => {
          switch (currentStep) {
            case "introduction":
              return (
                <div>
                  <h1>Introdução</h1>
                  <button onClick={nextStep}>Ver contexto</button>
                </div>
              );
            case "contextualization":
              return (
                <div>
                  <h1>Contexto</h1>
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
