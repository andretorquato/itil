import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import { ModuleProps, Question } from "../../../src/models/module";
import styles from "./Question.module.scss";

interface QuestionProps {
  module: ModuleProps;
  next: () => void;
}

const Questions: NextPage<QuestionProps> = ({ module, next }) => {
  const [selectedAnswerID, setSelectedAnswerID] = useState<number | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);
  const [isWrongAnswer, setIsWrongAnswer] = useState<boolean>(false);
  const [showActions, setShowActions] = useState<boolean>(true);
  const [indexActiveQuestion, setIndexActiveQuestion] = useState<number>(0);
  const [attemps, setAttemps] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);

  useEffect(() => {
    if (module && module.questions) {
      const questions = module?.questions ? module.questions : [];
      setQuestions(questions);
      setActiveQuestion(module?.questions[0]);
      setIndexActiveQuestion(1);
      setTotalQuestions(module?.questions.length);
    }
  }, [module]);

  const setAnswer = (answer: number) => setSelectedAnswerID(answer);

  const answer = () => {
    const isWrongAnswer = selectedAnswerID != activeQuestion?.answer_id;
    if (isWrongAnswer) setIsWrongAnswer(isWrongAnswer);

    setShowActions(false);
  };

  const optionClass = (optionId: number) => {
    const classes = styles.option;
    return optionId == selectedAnswerID
      ? `${styles.option} ${styles.active}`
      : classes;
  };

  const getRightAnswer = () => {
    const rightAnswer = activeQuestion?.options.find(
      (option) => option.id == activeQuestion.answer_id
    );
    return rightAnswer?.ctx;
  };

  const nextQuestion = () => {
    if (indexActiveQuestion < totalQuestions) {
      setActiveQuestion(questions[indexActiveQuestion]);
      setSelectedAnswerID(null);
      setIndexActiveQuestion(indexActiveQuestion + 1);
      setAttemps(attemps + 1);
      if (isWrongAnswer) setWrongQuestion();
    } else if (indexActiveQuestion == totalQuestions) {
      const hasWrongQuestion = wrongQuestions.length > 0;
      if (hasWrongQuestion) {
        setActiveQuestion(wrongQuestions[0]);
        setSelectedAnswerID(null);
        setAttemps(attemps + 1);

        isWrongAnswer
          ? setWrongQuestion()
          : () => {
						setWrongQuestions(wrongQuestions.slice(1))
						setActiveQuestion(wrongQuestions[0]);
        		setSelectedAnswerID(null);
					};
				
				console.log(wrongQuestions);
      }

      !hasWrongQuestion && next();
    }

    setShowActions(true);
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
  return (
    <div>
      <h1>Questões</h1>
      <div>
        {indexActiveQuestion}/{totalQuestions} - Tentativas: {attemps}
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
              <Button variant="outlined">Ver cenario</Button>
              {/* <Button onClick={next}>Finalizar</Button> */}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Questions;
