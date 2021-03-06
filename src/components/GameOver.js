import React from 'react'
import GameOverPic from '../assets/gameoverpic.jpg'
import GameOverPic1 from '../assets/game-over1.png'

function GameOver(props) {
  const game = props.game
  if (game.score > game.cpuScore) {
    return (
      <div>
        <p>You won the game!</p>
        <p><img src={GameOverPic} alt="screen with sunset"></img></p>
      </div>
    )
  } else {
    return (
      <div>
        <p>Game over. you lost :(</p>
        <p><img src={GameOverPic1} alt="screen with sunset"></img></p>
      </div>
    )
  }
}

export default GameOver
