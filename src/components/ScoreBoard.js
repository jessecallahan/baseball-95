import React from "react";

function ScoreBoard(props) {
  const { game } = props;


  return (
    <React.Fragment>
      <p>outs:{game.outs + " "}
        strikes:{game.strikes + " "}
        balls:{game.balls + " "}
        score:{game.score + " "}
        Computer Score:{game.cpuScore + " "}
        inning:{game.inning + " "}
        bottomOfInning:{game.bottomOfInning.toString() + " "} </p>

    </React.Fragment>
  );
}


export default ScoreBoard;
