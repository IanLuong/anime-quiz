import React from "react";

export default function Start(props) {
  return (
    <div className="start-screen">
      <h1 className="start-screen--title">The Gigachad Anime Quiz</h1>
      <p className="start-screen--subtitle">Time to find out who has too much free time on their hands...</p>
      <button className="start-screen--button system-button" onClick={props.startGame}>Start Quiz</button>
    </div>
  )
}