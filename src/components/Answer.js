import React from "react";

export default function Answer(props) {
  return (
    <button
      className={`question--choice ${props.selectedAnswer === props.answer ? "selected" : ""}`}
      onClick={props.selectAnswer}
    >
      {props.answer}
    </button>
  )
}