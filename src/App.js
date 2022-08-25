import "./App.css";
import GameSetup from "./components/GameSetup/GameSetup";
import axios from "axios";
import { useState } from "react";
import Quiz from "./components/Quiz/Quiz";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [data, setData] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const setupHandler = async (setup) => {
    const url = `https://the-trivia-api.com/api/questions?categories=${setup.category.toLowerCase()}&limit=${
      setup.numberOfQuestions
    }&difficulty=${setup.difficulty.toLowerCase()}`;

    const res = await axios.get(url);
    setData(res.data);
    setShowQuiz(true);
  };

  const popHandler = (countOfAnswers) => {
    setCorrectAnswers(countOfAnswers);
    setShowPopup(true);
  };

  const newGameHandler = () => {
    setShowPopup(false);
    setShowQuiz(false);
  };
  return (
    <>
      <div>{showQuiz || <GameSetup onSetup={setupHandler} />}</div>
      <div>{showQuiz && <Quiz onFinished={popHandler} data={data} />}</div>
      <div>
        {setShowPopup && (
          <Popup open={showPopup} position="right center">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "2px",
                width: "50vw",
              }}
            >
              <h2>Your score!</h2>
              <h3>{`${correctAnswers} / ${data.length}`}</h3>
              <button onClick={newGameHandler}>Play New game !</button>
            </div>
          </Popup>
        )}
      </div>
    </>
  );
}

export default App;
