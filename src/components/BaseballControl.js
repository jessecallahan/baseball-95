import React from "react";
import ScoreBoard from "./ScoreBoard";
import GameCard from "./GameCard"
import Field from "./Field"


class BaseballControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      game: {
        outs: 0,
        strikes: 0,
        balls: 0,
        score: 0,
        cpuScore: 0,
        first: false,
        second: false,
        third: false,
        inning: 1,
        bottomOfInning: false
      },
      playType: "Play Ball"
    };
    this.gameDice = this.gameDice.bind(this)
  }

  gameDice = () => {
    console.log(this.state.game)
    const game = this.state.game

    //game dice
    const outcome = Math.ceil(Math.random() * 8)
    var hitOutcome = Math.ceil(Math.random() * 6)

    //game-over logic
    if (game.bottomOfInning === true && game.inning >= 9 && game.outs === 3 && game.score !== game.cpuScore) { this.state.playType = "extra innings" } else if (game.bottomOfInning === true && game.inning >= 9 && game.outs === 3) { this.state.playType = "game over" }



    //change inning logic
    if (game.outs === 3) {
      if (game.bottomOfInning === false) { game.bottomOfInning = true; game.outs = 0 }
      else {
        game.bottomOfInning = false; game.inning = game.inning + 1; game.outs = 0
      }
    }
    switch (outcome) {
      //outs
      case 1:
        this.state.playType = "groundout"
      case 2:
        this.state.playType = "flyout"
        game.outs++;
        game.strikes = 0;
        game.balls = 0;
        break;

      //strike
      case 3:
      case 4:
        game.strikes++
        if (game.strikes === 3) {
          game.outs++;
          game.strikes = 0;
          game.balls = 0;
        }
        break;

      //ball
      case 5:
      case 6:
      case 7:
        game.balls++
        if (game.balls === 4) {
          if (game.first === true && game.second === true && game.third === true) {
            if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1 } else { game.score = game.score + 1 } game.first = true;
            game.second = true; game.third = true; game.balls = 0; game.strikes = 0;
          }
          else if (game.first === true) {
            game.first = true; game.second = true; game.balls = 0; game.strikes = 0;
          }
          else if (game.second === true && game.first === true) { game.first = true; game.second = true; game.third = true; game.balls = 0; game.strikes = 0 }
          else {
            game.first = true; game.balls = 0; game.strikes = 0;
          }
        }
        break;

      //hits
      case 8:
        switch (hitOutcome) {
          //single
          case 1:
          case 2:
            if (game.first === true && game.second === true && game.third === true) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2 } else { game.score = game.score + 2 } game.first = true; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.third === true && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2 } else { game.score = game.score + 2 } game.first = true; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === true && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1 } else { game.score = game.score + 1 } game.first = true; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.third === true && game.second === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1 } else { game.score = game.score + 1 } game.first = true; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1 } else { game.score = game.score + 1 } game.first = true; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.first === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1 } else { game.score = game.score + 1 } game.first = true; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.third === true && game.second === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1 } else { game.score = game.score + 1 } game.first = true; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { game.first = true; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else { game.first = true; game.balls = 0; game.strikes = 0 }
            break;

          //double
          case 3:
          case 4:
            if (game.first === true && game.second === true && game.third === true) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2 } else { game.score = game.score + 2 } game.first = false; game.second = true; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.third === true && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2 } else { game.score = game.score + 2 } game.first = false; game.second = true; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === true && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1 } else { game.score = game.score + 1 } game.first = false; game.second = true; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.third === true && game.second === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1 } else { game.score = game.score + 1 } game.first = false; game.second = true; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { game.first = false; game.second = true; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.first === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1 } else { game.score = game.score + 1 } game.first = false; game.second = true; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.third === true && game.second === false && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1 } else { game.score = game.score + 1 } game.first = false; game.second = true; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { game.first = false; game.second = true; game.third = true; game.balls = 0; game.strikes = 0 }
            else { game.second = true; game.balls = 0; game.strikes = 0 }
            break;

          //triple
          case 5:
            if (game.first === true && game.second === true && game.third === true) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 3 } else { game.score = game.score + 3 } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.third === true && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2 } else { game.score = game.score + 2 } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === true && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2 } else { game.score = game.score + 2 } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.third === true && game.second === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2 } else { game.score = game.score + 2 } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { game.first = false; game.second = false; game.third = true; game.score = game.score + 1; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.first === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1 } else { game.score = game.score + 1 } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.third === true && game.second === false && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1 } else { game.score = game.score + 1 } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1 } else { game.score = game.score + 1 } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else { game.third = true; game.balls = 0; game.strikes = 0 }
            break;

          //homerun
          case 6:
            if (game.first === true && game.second === true && game.third === true) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 4 } else { game.score = game.score + 4 } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.third === true && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 3 } else { game.score = game.score + 3 } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === true && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 3 } else { game.score = game.score + 3 } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.third === true && game.second === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 3 } else { game.score = game.score + 3 } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2 } else { game.score = game.score + 2 } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.first === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2 } else { game.score = game.score + 2 } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.third === true && game.second === false && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2 } else { game.score = game.score + 2 } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) {
              if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2 } else { game.score = game.score + 2 } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0
            }
            else {
              if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1 } else { game.score = game.score + 1 } game.balls = 0; game.strikes = 0
            }
            break;
          default:
        }


        break;

      default:
    }


    this.setState({
      game: game
    })
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.gameDice}>
          Pitch the Ball!
</button>
        <p>outs:{this.state.game.outs + " "}
          strikes:{this.state.game.strikes + " "}
          balls:{this.state.game.balls + " "}
          score:{this.state.game.score + " "}
          Computer Score:{this.state.game.cpuScore + " "}
          inning:{this.state.game.inning + " "}
          bottomOfInning:{this.state.game.bottomOfInning.toString() + " "} </p>
        <p>
          runner on 1st:{this.state.game.first.toString() + " "}</p>
        <p>
          runner on 2nd:{this.state.game.second.toString() + " "}
        </p>
        <p>
          runner on 3rd:{this.state.game.third.toString() + " "}
        </p>

        {this.state.playType}
        <ScoreBoard></ScoreBoard>
        <GameCard>

        </GameCard>
        <Field></Field>
      </React.Fragment>
    );
  }

}

export default BaseballControl;