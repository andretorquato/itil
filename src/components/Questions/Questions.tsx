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
  updateScore: () => void;
}

const Questions: NextPage<QuestionProps> = ({
  module,
  score,
  next,
  updateScore,
}) => {
  const [selectedAnswerID, setSelectedAnswerID] = useState<number | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [listQuestions, setListQuestions] = useState<Question[]>([]);
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);
  const [isWrongAnswer, setIsWrongAnswer] = useState<boolean>(false);
  const [showActions, setShowActions] = useState<boolean>(true);
  const [indexActiveQuestion, setIndexActiveQuestion] = useState<number>(0);
  const [totalListQuestions, setTotalListQuestions] = useState<number>(0);

  useEffect(() => {
    if (module && module.questions) {
      const questions = module?.questions ? module.questions : [];
      setAllQuestions(questions);
      setListQuestions(questions);
    }
  }, [module]);

  useEffect(() => {
    const totalListQuestions = listQuestions.length;
    setTotalListQuestions(totalListQuestions);
    setActiveQuestion(listQuestions[0]);
    setIndexActiveQuestion(1);
  }, [listQuestions]);

  const optionClass = (optionId: number) => {
    const classes = styles.option;
    return optionId == selectedAnswerID
      ? `${styles.option} ${styles.active}`
      : classes;
  };

  const setAnswer = (answer: number) => setSelectedAnswerID(answer);

  const answer = () => {
    if (!selectedAnswerID) return;
    const isWrongAnswer = selectedAnswerID != activeQuestion?.answer_id;
    if (isWrongAnswer) setIsWrongAnswer(isWrongAnswer);
    if(!isWrongAnswer) updateScore();
    setShowActions(false);
  };

  const nextQuestion = () => {
    if (isWrongAnswer) setWrongQuestion();

    if (indexActiveQuestion < totalListQuestions) {
      updateActiveQuestion();
    } else {
      if (wrongQuestions.length > 0) {
        const newQuestions = wrongQuestions;
        setListQuestions([...newQuestions]);
        updateActiveQuestion();
        setWrongQuestions([]);
      } else {
        wrongQuestions.length == 0 && next();
      }
    }
    setShowActions(true);
  };

  const updateActiveQuestion = () => {
    setActiveQuestion(listQuestions[indexActiveQuestion]);
    setIndexActiveQuestion(indexActiveQuestion + 1);
    setSelectedAnswerID(null);
  };

  const setWrongQuestion = () => {
    const questionHasAdded = wrongQuestions.find(
      (question) => question.id == activeQuestion?.id
    );
    if (!questionHasAdded && activeQuestion) {
      setWrongQuestions([...wrongQuestions, activeQuestion]);
    }
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
        {indexActiveQuestion}/{totalListQuestions}
      </div>
      {activeQuestion && (
        <div>
          <h2>{activeQuestion.question}</h2>

          <ul>
            {activeQuestion.options.map((op: any) => {
              return (
                <li
                  className={optionClass(op.id)}
                  onClick={() => setAnswer(op?.id)}
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
