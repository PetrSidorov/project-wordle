import React, { useEffect } from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";

import GuessInput from "../GuessInput/GuessInput";
import UserGuesses from "../UserGuesses/UserGuesses";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [gameStatus, setGameStatus] = React.useState({
    gameOver: false,
    userWin: false,
  });

  function checkStatus(newGuess, charPos) {
    if (newGuess.value[charPos].char === answer[charPos]) {
      return "correct";
    }

    if (
      answer.split("").includes(newGuess.value[charPos].char) &&
      newGuess.value[charPos].char !== answer[charPos]
    ) {
      return "misplaced";
    }
    return "incorrect";
  }

  // useEffect(() => {
  console.log("gameStatus: ", gameStatus);
  // }, [gameStatus]);

  function handleGameOver(newGuesses) {
    const newGuess = newGuesses[newGuesses.length - 1];
    if (newGuess.value.every((char) => char.status === "correct")) {
      setGameStatus({ userWin: true, gameOver: true });
    }

    if (
      newGuesses.length >= NUM_OF_GUESSES_ALLOWED &&
      newGuess.value.every((char) => char.status != "correct")
    ) {
      setGameStatus({ userWin: false, gameOver: true });
    } else if (
      newGuesses.length >= NUM_OF_GUESSES_ALLOWED &&
      newGuess.value.every((char) => char.status == "correct")
    ) {
      setGameStatus({ userWin: true, gameOver: true });
    }
  }

  function getStatus(newGuess) {
    const charsWithStatus = newGuess.value.map(({ char, status }, charPos) => {
      const newStatus = checkStatus(newGuess, charPos);
      return { char, status: newStatus };
    });
    newGuess.value = charsWithStatus;
    return newGuess;
  }

  function handleGuesses(newGuess) {
    const checkedGuess = getStatus(newGuess);
    if (guesses.length === NUM_OF_GUESSES_ALLOWED) return;
    const newGuesses = [...guesses, checkedGuess];
    handleGameOver(newGuesses);
    setGuesses(newGuesses);
  }

  function GameOverBanner({ userWin }) {
    return (
      <div className={`${userWin ? "happy" : "sad"} banner`}>
        {userWin ? (
          <p>
            <strong>Congratulations!</strong> Got it in{" "}
            <strong>{guesses.length} guesses</strong>.
          </p>
        ) : (
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <UserGuesses guesses={guesses} />
      <GuessInput
        gameOver={gameStatus.gameOver}
        handleGuesses={handleGuesses}
      />
      {gameStatus.gameOver && <GameOverBanner userWin={gameStatus.userWin} />}
    </>
  );
}

export default Game;
