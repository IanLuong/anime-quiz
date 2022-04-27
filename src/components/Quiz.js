import React from "react";
import Question from "./Question"

export default function Quiz() {
  const [questions, setQuestions] = React.useState([])

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=31&difficulty=medium&type=multiple")
      .then(response => response.json())
      .then(data => setQuestions(data.results))
  }, [])

  console.log(questions)

  const mappedQuestions = questions.map(question => <Question question={question} />)

  return (
    <div>
      {mappedQuestions}
    </div>
  )
}