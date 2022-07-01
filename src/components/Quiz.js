import React from "react";
import Answer from "./Answer";
import { nanoid } from "nanoid"

export default function Quiz(props) {

  const [finished, setFinished] = React.useState(false)
  const [questions, setQuestions] = React.useState([])
  const [score, setScore] = React.useState(0)

  React.useEffect(() => {
    if (!finished) {
      fetch("https://opentdb.com/api.php?amount=10&category=31")
        .then(response => response.json())
        .then(data => setUpQuestionObjects(data.results))
    }
    setScore(finished ? questions.filter(question => question.is_correct).length : 0)
  }, [finished])

  function setUpQuestionObjects(results) {
    const questionObjects = []
    for (let result of results) {

      const decodedQuestion = decodeHtml(result.question)
      const decodedCorrectAnswer = decodeHtml(result.correct_answer)
      const decodedIncorrectAnswers = result.incorrect_answers.map(answer => decodeHtml(answer))

      questionObjects.push({
        id: nanoid(),
        question: decodedQuestion,
        correct_answer: decodedCorrectAnswer,
        answers: scrambleAnswers([decodedCorrectAnswer, ...decodedIncorrectAnswers]),
        selected_answer: "",
        is_correct: false
      })
    }
    setQuestions(questionObjects)
  }


  function selectAnswer(id, answer) {
    setQuestions(prevQuestions => prevQuestions.map(question => {
      return question.id === id ?
        { ...question, selected_answer: answer } :
        question
    }))
  }

  function decodeHtml(input) {
    var txt = document.createElement("textarea");
    txt.innerHTML = input;
    return txt.value;
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

  function checkAnswers() {

    const allAnswered = questions.filter(question => question.selected_answer).length === questions.length

    if (allAnswered) {
      setQuestions(prevState => prevState.map(question => {
        return question.correct_answer === question.selected_answer ?
          { ...question, is_correct: true } :
          question
      }))
      setFinished(true)
    } else {
      alert("You ain't answered all the questions blud")
    }
  }

  function startNewGame() {
    setFinished(false)
  }


  const mappedQuestions = questions.map(questionObject => (
    <div className="question">
      <h3 className="question--prompt">{questionObject.question}</h3>
      <div className="question--choices">

        {questionObject.answers.map(answer => (
          <Answer
            key={answer}
            selectAnswer={() => selectAnswer(questionObject.id, answer)}
            answer={answer}
            selectedAnswer={questionObject.selected_answer}
            isCorrect={questionObject.is_correct}
            correctAnswer={questionObject.correct_answer}
            finished={finished}
          />
        ))}

      </div>
      <hr />
    </div>
  ))

  return (
    <div className="form">
      {mappedQuestions}
      {finished ?
        <div className="results">
          <h4 className="results--score">You got {score}/{questions.length} correct!</h4>
          <button className="submit-button system-button" onClick={startNewGame}>Play again (New Questions)</button>
        </div> :
        <button className="submit-button system-button" onClick={checkAnswers}>Check answers</button>}
    </div>
  )
}