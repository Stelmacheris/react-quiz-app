import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import "./Quiz.css";
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const Quiz = ({ onFinished, data }) => {
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [numOfQuestion, setNumOfQuestion] = useState(1);
  const [answer, setAnswer] = useState("");
  const [correctAnswersCount, setCountAnswersCount] = useState(0);
  const questionsLength = useMemo(() => {
    return Object.keys(data).length;
  }, [data]);
  const isQuizFinished = numOfQuestion > questionsLength;

  const possibleAnswers = useCallback(() => {
    if (!isQuizFinished) {
      const answers = [
        ...Object.values(data)[numOfQuestion - 1].incorrectAnswers,
        Object.values(data)[numOfQuestion - 1].correctAnswer,
      ];
      return answers;
    }
  }, [numOfQuestion, isQuizFinished, data]);

  useMemo(() => {
    shuffleArray(possibleAnswers);
  }, [possibleAnswers]);

  const correctAnswer = useMemo(() => {
    if (!isQuizFinished) {
      return Object.values(data)[numOfQuestion - 1].correctAnswer;
    }
  }, [data, numOfQuestion, isQuizFinished]);
  const question = useMemo(() => {
    if (!isQuizFinished) {
      return Object.values(data)[numOfQuestion - 1].question;
    }
  }, [data, numOfQuestion, isQuizFinished]);

  const buttonHandler = () => {
    setNumOfQuestion((prevNum) => (prevNum += 1));
    if (numOfQuestion + 1 === questionsLength) {
      setIsLastQuestion(true);
    }
    if (answer === correctAnswer) {
      setCountAnswersCount((prevState) => (prevState += 1));
    }
  };

  const radioHandleChange = (event) => {
    setAnswer(event.target.value);
  };

  const guesses =
    !isQuizFinished &&
    possibleAnswers().map((item) => {
      return (
        <div key={item} style={{ whiteSpace: "nowrap" }}>
          <label htmlFor={item}>{item}</label>
          <input
            onChange={radioHandleChange}
            type="radio"
            id={item}
            name="answer"
            value={item}
          />
        </div>
      );
    });

  const finishHandler = () => {
    onFinished(correctAnswersCount);
  };

  return (
    <>
      {isQuizFinished ? (
        finishHandler()
      ) : (
        <div div className="box">
          <div className="row">
            {numOfQuestion}/{questionsLength}
          </div>
          <div className="row">
            <h3>{question}</h3>
          </div>
          <div className="row">{guesses}</div>
          <button type="button" onClick={buttonHandler}>
            {isLastQuestion ? "End game" : "Next"}
          </button>
        </div>
      )}
    </>
  );
};

export default Quiz;
