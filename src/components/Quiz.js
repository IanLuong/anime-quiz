import React from "react";
import Question from "./Question"
import {nanoid} from "nanoid"

export default function Quiz() {
  const [finished, setFinished] = React.useState(false)
  const [questions, setQuestions] = React.useState([])

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=31&difficulty=medium&type=multiple")
      .then(response => response.json())
      .then(data => setUpQuestionObjects(data.results))
  }, [])

  function setUpQuestionObjects(results) {
    const questionObjects = []
    for(let result of results) {
      questionObjects.push({
        key: nanoid(),
        question: result.question,
        correct_answer: result.correct_answer,
        incorrect_answers: result.incorrect_answers,
        selected_answer: "",
        is_correct: false
      })
    }
    setQuestions(questionObjects)
  }

  console.log(questions)

  const mappedQuestions = questions.map(questionInfo => (
    <Question 
      questionInfo={questionInfo}
    />
  ))

  return (
    <div className="form">
      {mappedQuestions}
      {!finished && <button className="submit-button">Check answers</button>}
      {finished && <button className="replay-button">Play again</button>}
    </div>
  )
}