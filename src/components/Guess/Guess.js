import React from "react";
import { range } from "../../utils";
const initial = { value: ["", "", "", "", ""] };
function Guess({ word }) {
  console.log(word);
  return (
    <p className="guess">
      {range(5).map((pos, i) => {
        return (
          <span key={i} className={`cell ${word && word.value[pos].status}`}>
            {word && word.value[pos].char}
          </span>
        );
      })}
    </p>
  );
}

export default Guess;
