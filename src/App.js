import React from "react"
import Start from "./components/Start"
import Quiz from "./components/Quiz"
import "./style.css"

export default function App() {

  const [newGame, setNewGame] = React.useState(true)

  function startGame() {
    setNewGame(prevState => !prevState)
  }

  return (
    <div className="container">
      {/* {newGame ? <Start startGame={startGame}/> : <Quiz /> */}
      <Quiz />
    </div>
  )
}
