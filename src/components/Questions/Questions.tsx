import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import { ModuleProps, Question } from "../../../src/models/module";
import styles from "./Question.module.scss";
import Score from "../Score/Score";

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
  const [isWrongAnswer, setIsWrongAnswer] = useState<boolean>(false);
  const [showActions, setShowActions] = useState<boolean>(true);
  const [indexActiveQuestion, setIndexActiveQuestion] = useState<number>(0);

  useEffect(() => {
    setActiveQuestion(module.questions[indexActiveQuestion]);
    setIndexActiveQuestion(1);
  }, []);

  const optionClass = (optionId: number) => {
    const classes = styles.option;
    return optionId == selectedAnswerID
      ? `${styles.option} ${styles.active}`
      : classes;
  };

  const answer = () => {
    if (!selectedAnswerID) return;
    const isWrongAnswer = selectedAnswerID != activeQuestion?.answer_id;
    if (isWrongAnswer) setIsWrongAnswer(isWrongAnswer);
    if (!isWrongAnswer) updateScore(activeQuestion);
    setShowActions(false);
  };

  const nextQuestion = () => {
    if (indexActiveQuestion < module.questions.length) {
      setActiveQuestion(module.questions[indexActiveQuestion]);
      setIndexActiveQuestion(indexActiveQuestion + 1);
      setSelectedAnswerID(null);
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

  return (
    <div className={styles.container}>
      <Score score={score} />
      <h1>Questões</h1>
      <div>
        {indexActiveQuestion}/{module.questions.length}
      </div>
      {activeQuestion && (
        <div>
          <h2>{activeQuestion.question}</h2>

          <ul>
            {activeQuestion.options.map((op: any) => {
              return (
                <li
                  className={optionClass(op.id)}
                  onClick={() => setSelectedAnswerID(op?.id)}
                  key={op?.id}
                >
                  {op?.ctx}
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
              <p className={styles["right-answer"]}>Parabéns! Você acertou.</p>
            </div>
          )}
          {!showActions && (
            <Button variant="contained" onClick={nextQuestion}>
              Proxima Questão
            </Button>
          )}

          {showActions && (
            <>
              <Button variant="contained" onClick={answer}>
                Responder
              </Button>
              {/* <Button variant="outlined">Ver cenario</Button> */}
              {/* <Button onClick={next}>Finalizar</Button> */}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Questions;
