import React from "react";

export default function Answer(props) {

  const selected = (props.selectedAnswer === props.answer) && !props.finished 
  const correct = props.finished && props.answer === props.correctAnswer
  const incorrect = props.finished && (props.selectedAnswer === props.answer)

  let status
  if(selected) {
    status = "selected"
  } else if(correct) {
    status = "correct"
  } else if(incorrect) {
    status = "incorrect"
  }

  return (
    <button
      className={`question--choice${props.finished ? "--finished" : ""} ${status}`}
      onClick={!props.finished && props.selectAnswer}
    >
      {props.answer}
    </button>
  )
}