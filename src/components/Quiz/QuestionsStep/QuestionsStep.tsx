import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";

import { ModuleProps, Question } from "../../../models/module";
import styles from "./QuestionsStep.module.scss";
import Score from "../../Score/Score";
import ContextStep from "../ContextStep/ContextStep";
import Progress from "../../Progress/Progress";

interface QuestionsStepProps {
  module: ModuleProps;
  next: () => void;
  score: number;
  updateScore: (q: Question) => void;
}

const QuestionsStep: NextPage<QuestionsStepProps> = ({
  module,
  score,
  next,
  updateScore,
}) => {
  const [selectedAnswerID, setSelectedAnswerID] = useState<number | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [ativeQuestionClasses, setActiveQuestionClasses] = useState(
    styles.activeQuestion
  );
  const [isWrongAnswer, setIsWrongAnswer] = useState<boolean>(false);
  const [showActions, setShowActions] = useState<boolean>(true);
  const [indexActiveQuestion, setIndexActiveQuestion] = useState<number>(0);
  const [showContext, setShowContext] = useState<boolean>(false);
  const songEl = useRef<HTMLAudioElement>(null);
  const songElSuccess = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setActiveQuestion(module.questions[indexActiveQuestion]);
    setIndexActiveQuestion(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let classes = styles.activeQuestion;
    isWrongAnswer && (classes = `${classes} ${styles["wrong-question"]}`);
    setActiveQuestionClasses(classes);
  }, [isWrongAnswer]);

  const optionClass = (optionId: number) => {
    // show right answer
    if (!showActions && optionId === activeQuestion?.answer_id)
      return `${styles.option} ${styles.right}`;

    if (
      !showActions &&
      optionId === selectedAnswerID &&
      selectedAnswerID != activeQuestion?.answer_id
    )
      return `${styles.option} ${styles.wrong}`;

    // selected answer
    if (optionId === selectedAnswerID)
      return `${styles.option} ${styles.active}`;

    // default answer
    return styles.option;
  };

  const answer = () => {
    if (!selectedAnswerID) return;
    const isWrongAnswer = selectedAnswerID != activeQuestion?.answer_id;
    if (isWrongAnswer) {
      setIsWrongAnswer(isWrongAnswer);
      songEl && songEl.current?.play();
    }
    if (!isWrongAnswer) {
      updateScore(activeQuestion);
      songElSuccess && songElSuccess.current?.play();
    }
    setShowActions(false);
  };

  const nextQuestion = () => {
    if (indexActiveQuestion < module.questions.length) {
      const nextQuestion = module.questions[indexActiveQuestion];
      setActiveQuestion(null);
      setTimeout(() => {
        setActiveQuestion(nextQuestion);
        setIndexActiveQuestion(indexActiveQuestion + 1);
        setSelectedAnswerID(null);
      }, 100);
    }
    indexActiveQuestion == module.questions.length && next();
    setShowActions(true);
    setIsWrongAnswer(false);
  };

  const getRightAnswer = () => {
    const rightAnswer = activeQuestion?.options.find(
      (option) => option.id == activeQuestion.answer_id
    );
    return rightAnswer?.ctx;
  };

  const questionNeedContext = () => {
    return activeQuestion?.tag && activeQuestion.tag.includes("context");
  };

  const handleChangeVisibleContext = () => {
    setShowContext(!showContext);
  };

  const handleChangeSelectedOption = (optionId: number) => {
    if (!showActions) return;

    setSelectedAnswerID(optionId);
  };
  return (
    <>
      {!showContext ? (
        <div className={styles.container}>
          <Score score={score} />
          <nav className={styles.progressContainer}>
            <span>
              {indexActiveQuestion}/{module.questions.length} questões
              respondidas
            </span>
            <Progress
              activeIndex={indexActiveQuestion}
              total={module.questions.length}
            />
          </nav>
          {activeQuestion && (
            <div className={ativeQuestionClasses}>
              <h2>{activeQuestion.question}</h2>
              {!activeQuestion?.answered && (
                <span style={{ color: "var(--primary)", margin: "1rem 0" }}>
                  +2 pontos
                </span>
              )}
              <ul className={styles.options}>
                {activeQuestion.options.map((op: any) => {
                  return (
                    <li
                      className={optionClass(op.id)}
                      onClick={() => handleChangeSelectedOption(op?.id)}
                      key={op?.id}
                    >
                      <span>{op?.ctx}</span>
                    </li>
                  );
                })}
              </ul>
              {isWrongAnswer && (
                <div>
                  <p className={styles["wrong-answer"]}>
                    Você errou, a resposta correta é: <br />
                    <i>{getRightAnswer()}</i>
                  </p>
                </div>
              )}

              {!showActions && !isWrongAnswer && (
                <div>
                  <p className={styles["right-answer"]}>
                    Você acertou!{" "}
                    {!activeQuestion?.answered ? (
                      <span> +2 pontos</span>
                    ) : (
                      <span>
                        Mas você já recebeu a pontuação por está questão
                      </span>
                    )}
                  </p>
                </div>
              )}

              {!showActions && (
                <div className={styles.actions}>
                  <Button variant="contained" onClick={nextQuestion}>
                    Proxima Questão
                  </Button>
                </div>
              )}

              {showActions && (
                <div className={styles.actions}>
                  {questionNeedContext() && (
                    <Button variant="text" onClick={handleChangeVisibleContext}>
                      Ver cenário
                    </Button>
                  )}
                  <Button variant="contained" onClick={answer}>
                    Responder
                  </Button>
                </div>
              )}
            </div>
          )}
          <audio ref={songEl}>
            <source src="/audio/uepa.mp3" />
          </audio>
          <audio ref={songElSuccess}>
            <source src="/audio/win.mp3" />
          </audio>
        </div>
      ) : (
        <ContextStep
          module={module}
          next={handleChangeVisibleContext}
          buttonText={"Voltar para as questões"}
        />
      )}
    </>
  );
};

export default QuestionsStep;
