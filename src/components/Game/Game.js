import React from "react";

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

  function checkGuess(newGuess) {
    // console.log(newGuess.value);
    // console.log(
    // return newGuess.value.map(({ char, status }) => {
    //   return { char, status: "correct" };
    // });
    // );

    return newGuess;
  }
  console.log({ guesses });
  function handleGuesses(newGuess) {
    const checkedGuess = checkGuess(newGuess);
    if (guesses.length === NUM_OF_GUESSES_ALLOWED) return;
    setGuesses([...guesses, checkedGuess]);
  }

  return (
    <>
      <UserGuesses guesses={guesses} />
      <GuessInput handleGuesses={handleGuesses} />
    </>
  );
}

export default Game;
