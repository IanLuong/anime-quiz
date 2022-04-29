import React from "react";

export default function Answer(props) {

  const selected = props.selectedAnswer === props.answer
  const correct = selected && props.answer === props.isCorrect

  return (
    <button
      className={`question--choice ${selected ? "selected" : ""}`}
      onClick={props.selectAnswer}
    >
      {props.answer}
    </button>
  )
}