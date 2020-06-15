import React from "react";

function ScoreBoard(props) {
  const { game } = props;


  return (
    <React.Fragment>
      <p>
        SCORE:{game.score + " "}
        CPU_SCORE:{game.cpuScore + " "}
      </p>
      <p>
        STRIKES:{game.strikes + " "}
        BALLS:{game.balls + " "}
        OUTS:{game.outs + " "}
      </p>
      <p>
        INNING:{game.inning + " "}
        BOTTOMOFINNING:{game.bottomOfInning.toString() + " "} </p>
      <p>
        1ST:{game.first.toString() + " "}
        2ND:{game.second.toString() + " "}
        3RD:{game.third.toString() + " "}
      </p>
    </React.Fragment>
  );
}


export default ScoreBoard;
