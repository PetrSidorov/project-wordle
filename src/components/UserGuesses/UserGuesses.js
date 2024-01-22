import React from "react";
import Guess from "../Guess/Guess";
import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
function UserGuesses({ guesses }) {
  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((_, i) => (
        <Guess key={i} word={guesses[i]} />
      ))}
    </div>
  );
}

export default UserGuesses;
