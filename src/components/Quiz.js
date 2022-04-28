import React from "react";
import Answer from "./Answer";
import { nanoid } from "nanoid"

export default function Quiz(props) {

  const [finished, setFinished] = React.useState(false)
  const [questions, setQuestions] = React.useState([])

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=31&difficulty=medium&type=multiple")
      .then(response => response.json())
      .then(data => setUpQuestionObjects(data.results))
  }, [])

  function setUpQuestionObjects(results) {
    const questionObjects = []
    for (let result of results) {
      questionObjects.push({
        id: nanoid(),
        question: parseQuestion(result.question),
        correct_answer: result.correct_answer,
        answers: scrambleAnswers([result.correct_answer, ...result.incorrect_answers]),
        selected_answer: "",
        is_correct: false
      })
    }
    setQuestions(questionObjects)
  }

  console.log(questions)

  function selectAnswer(id, answer) {
    setQuestions(prevQuestions => prevQuestions.map(question => {
      return question.id === id ?
        {...question, selected_answer: answer} :
        question
    }))
  }

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


  const mappedQuestions = questions.map(questionObject => (
    <div className="question">
      <h3 className="question--prompt">{questionObject.question}</h3>
      <div className="question--choices">

        <Answer
          selectAnswer={() => selectAnswer(questionObject.id, questionObject.answers[0])}
          answer={questionObject.answers[0]}
          selectedAnswer={questionObject.selected_answer}
        />

        <Answer
          selectAnswer={() => selectAnswer(questionObject.id, questionObject.answers[1])}
          answer={questionObject.answers[1]}
          selectedAnswer={questionObject.selected_answer}
        />

        <Answer
          selectAnswer={() => selectAnswer(questionObject.id, questionObject.answers[2])}
          answer={questionObject.answers[2]}
          selectedAnswer={questionObject.selected_answer}
        />

        <Answer
          selectAnswer={() => selectAnswer(questionObject.id, questionObject.answers[3])}
          answer={questionObject.answers[3]}
          selectedAnswer={questionObject.selected_answer}
        />

      </div>
      <hr />
    </div>
  ))

  return (
    <div className="form">
      {mappedQuestions}
      {!finished && <button className="submit-button">Check answers</button>}
      {finished && <button className="replay-button">Play again</button>}
    </div>
  )
}