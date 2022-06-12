import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import styles from "../../styles/Story.module.scss";

import database from "../../database.json";
import config from "../../src/configuration/config.json";

import Questions from "../../src/components/Questions/Questions";
import Introduction from "../../src/components/Introduction/Introduction";
import Presentation from "../../src/components/Presentation/Presentation";

const Story: NextPage = () => {
  const [currentStep, setCurrentStep] = useState("introduction");
  const [module, setModule]: any | null = useState(null);
  const [moduleSlug, setModuleSlug] = useState("");
  const router = useRouter();
  const steps = ["introduction", "contextualization", "questions", "finish"];
  const { story } = router.query;

  useEffect(() => {
    const newModule = database.modules.find((m) => m.slug === moduleSlug);
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
      saveProgress();
      router.push("/");
    }
    if (index < steps.length - 1) {
      changeStep(steps[index + 1]);
    }
  };

  const saveProgress = () => {
    const sessionData = localStorage.getItem(config.session);
    if (sessionData) {
      const data = JSON.parse(sessionData);
      data.completedModules.push({
        name: module?.name,
        slug: module?.slug,
        id: module?.id,
      });
      localStorage.setItem(config.session, JSON.stringify(data));
      return;
    }
    localStorage.setItem(
      config.session,
      JSON.stringify({
        completedModules: [
          { name: module?.name, slug: module?.slug, id: module?.id },
        ],
      })
    );
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
              return <Questions module={module} next={nextStep} />;
          }
        })()}
      </div>
    </>
  );
};

export default Story;
