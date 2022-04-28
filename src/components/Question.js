import React from "react";

export default function Question(props) {

  const [answers, setAnswers] = React.useState(scrambleAnswers([props.questionInfo.correct_answer, ...props.questionInfo.incorrect_answers]))

  function parseQuestion(input) {
    let string = JSON.stringify(input)
    string = string.replace(/&quot;/g, "'")
    string = string.replace(/&#039;/g, "'")
    return string.slice(1, string.length - 1)
  }

  function scrambleAnswers(answerArray) {
    const shuffled = [...answerArray]
    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = shuffled[i]
      shuffled[i] = shuffled[j]
      shuffled[j] = temp
    }
    return shuffled
  }

  const answerButtons = answers.map(answer =>
    <button 
    className="question--choice" 
    value={answer} 
    onClick={props.selectAnswer}>
      {answer}
    </button>)

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