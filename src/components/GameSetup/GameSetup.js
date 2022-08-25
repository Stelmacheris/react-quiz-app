import { useState } from "react";
import Categories from "../../assets/categories";
import "./GameSetup.css";
const categoriesList = Categories.map((category) => (
  <option key={category} value={category}>
    {category}
  </option>
));
const GameSetup = (props) => {
  let [category, setCategory] = useState("");
  let [difficulty, setDifficulty] = useState("");
  let [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [notSelected, setNotSelected] = useState(false);
  const submitHandler = (event) => {
    event.preventDefault();
    if (
      category.trim() === "" ||
      category.includes("-") ||
      difficulty.trim() === "" ||
      difficulty.includes("-") ||
      numberOfQuestions.trim() === "" ||
      numberOfQuestions.includes("-")
    ) {
      setNotSelected(true);
    } else {
      category = category.replaceAll(" ", "_").replaceAll("&", "and");
      difficulty = difficulty.toLowerCase();
      const setup = {
        category,
        difficulty,
        numberOfQuestions,
      };
      setNotSelected(false);
      setCategory("");
      setDifficulty("");
      setNumberOfQuestions("");

      props.onSetup(setup);
    }
  };
  return (
    <div className="game-setup-container">
      <form onSubmit={submitHandler}>
        <div className="game-setup-block">
          <label htmlFor="category">Please select category: </label>
          <select
            name="categories"
            id="category"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          >
            <option key="-" value="-">
              -
            </option>
            {categoriesList}
          </select>
        </div>
        <div className="game-setup-block">
          <label htmlFor="difficulty">Please select difficulty: </label>
          <select
            name="difficulties"
            id="difficulty"
            onChange={(event) => setDifficulty(event.target.value)}
            value={difficulty}
          >
            <option key="-" value="-">
              -
            </option>
            <option key="easy" value="easy">
              Easy
            </option>
            <option key="medium" value="medium">
              Medium
            </option>
            <option key="hard" value="hard">
              Hard
            </option>
          </select>
        </div>
        <div className="game-setup-block">
          <label htmlFor="question">Select number of questions: </label>
          <input
            onChange={(event) => setNumberOfQuestions(event.target.value)}
            type="number"
            id="question"
            name="questions"
            min="1"
            max="20"
            step="1"
            value={numberOfQuestions}
          />
        </div>
        {notSelected && <p className="error-text">Select all fields!</p>}
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
};

export default GameSetup;
