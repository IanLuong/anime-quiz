import React from "react";

export default function Question(props) {

  const answers = [props.questionInfo.correct_answer, ...props.questionInfo.incorrect_answers]

  function parseQuestion(input) {
    let string = JSON.stringify(input)
    string = string.replace(/&quot;/g, "'")
    string = string.replace(/&#039;/g, "'")
    return string.slice(1, string.length - 1)
  }

  const answerButtons = answers.map(answer => <button className="question--choice">{answer}</button>)

  return (
    <div className="question">
      <h3 className="question--prompt">{parseQuestion(props.questionInfo.question)}</h3>
      <div className="question--choices">
        {answerButtons}
      </div>
      <hr />
    </div>
  )
}