import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";

import Progress from "../Progress/Progress";
import { ModuleProps, Question } from "../../../src/models/module";
import styles from "./Question.module.scss";
import Score from "../Score/Score";
import Presentation from "../Presentation/Presentation";

interface QuestionProps {
  module: ModuleProps;
  next: () => void;
  score: number;
  updateScore: (q: Question) => void;
}

const Questions: NextPage<QuestionProps> = ({
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
    const classes = styles.option;
    return optionId == selectedAnswerID
      ? `${styles.option} ${styles.active}`
      : classes;
  };

  const answer = () => {
    if (!selectedAnswerID) return;
    const isWrongAnswer = selectedAnswerID != activeQuestion?.answer_id;
    if (isWrongAnswer) {
      setIsWrongAnswer(isWrongAnswer);
      songEl && songEl.current?.play();
      console.log(songEl);
    }
    if (!isWrongAnswer) updateScore(activeQuestion);
    setShowActions(false);
  };

  const nextQuestion = () => {
    if (indexActiveQuestion < module.questions.length) {
      setActiveQuestion(null);
      setTimeout(() => {
        setActiveQuestion(module.questions[indexActiveQuestion]);
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
  return (
    <>
      {!showContext ? (
        <div className={styles.container}>
          <Score score={score} />
          <nav>
            <div>
              {indexActiveQuestion}/{module.questions.length} questões
              respondidas
            </div>
            <div>
              <Progress
                activeIndex={indexActiveQuestion}
                total={module.questions.length}
              />
            </div>
          </nav>
          {activeQuestion && (
            <div className={ativeQuestionClasses}>
              <h2>{activeQuestion.question}</h2>
              <span>+2 pontos</span>
              <ul className={styles.options}>
                {activeQuestion.options.map((op: any) => {
                  return (
                    <li
                      className={optionClass(op.id)}
                      onClick={() => setSelectedAnswerID(op?.id)}
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
                    <span>
                      <strong>Ops!</strong>
                    </span>
                    <span>Você errou a resposta.</span>
                  </p>
                  <p>
                    <span>
                      <strong>Resposta correta:</strong>
                    </span>
                    <span>{getRightAnswer()}</span>
                  </p>
                </div>
              )}
              {!showActions && !isWrongAnswer && (
                <div>
                  <p className={styles["right-answer"]}>
                    Parabéns! Você acertou.
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
        </div>
      ) : (
        <Presentation
          module={module}
          next={handleChangeVisibleContext}
          buttonText={"Voltar para as questões"}
        />
      )}
    </>
  );
};

export default Questions;
