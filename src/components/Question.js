import React from "react";

export default function Question(props) {

  const answers = [props.question.correct_answer, ...props.question.incorrect_answers] 
  console.log(answers)

  return (
    <h1>{props.question.question}</h1>
  )
}