import React, { useState } from "react";

function GuessInput({ handleGuesses, gameOver }) {
  const [userInput, setUserInput] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    setUserInput("");

    handleGuesses({
      value: userInput.split("").map((inputChar) => {
        return { char: inputChar, status: "" };
      }),
      key: crypto.randomUUID(),
    });
  }
  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        disabled={gameOver}
        required
        minLength="5"
        maxLength="5"
        pattern="[A-Za-z]{5}"
        title="5 letter word"
        id="guess-input"
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value.toUpperCase())}
      />
      {userInput.length != 5 && (
        <p>Your answer should be 5 chararcters long </p>
      )}
    </form>
  );
}

export default GuessInput;
