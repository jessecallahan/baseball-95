import React from "react";
import ScoreBoard from "./ScoreBoard";
import PlayList from "./PlayList"
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
      plays: [{ name: "play ball", color: "yellow" }]

    };
    this.gameDice = this.gameDice.bind(this)
  }

  gameDice = () => {
    console.log(this.state.game)
    const game = this.state.game

    //game dice
    const outcome = Math.ceil(Math.random() * 8)
    const hitOutcome = Math.ceil(Math.random() * 6)

    //game-over logic
    if (game.bottomOfInning === true && game.inning === 9 && game.outs === 3) { this.state.plays.push({ name: "game over. You win! Cpu: " + game.cpuScore + " Player1: " + game.score, color: "yellow" }) }



    //change inning logic
    if (game.outs === 3) {
      if (game.bottomOfInning === false) { game.bottomOfInning = true; game.outs = 0; this.state.plays.push({ name: "top of inning number " + game.inning + " ends. Cpu: " + game.cpuScore + " Player1: " + game.score, color: "yellow" }) }
      else {
        game.bottomOfInning = false; game.inning = game.inning + 1; game.outs = 0; this.state.plays.push({ name: "bottom of inning number " + (game.inning - 1) + " ends. Player1: " + game.score + " Cpu: " + game.cpuScore, color: "yellow" })
      }
    }
    switch (outcome) {
      //outs
      case 1:
        this.state.plays.push({ name: "flyout", color: "red" })
      case 2:
        this.state.plays.push({ name: "groundout", color: "red" })
        game.outs++;
        game.strikes = 0;
        game.balls = 0;
        break;

      //strike
      case 3:
      case 4:
        this.state.plays.push({ name: "strike", color: "red" })
        game.strikes++
        if (game.strikes === 3) {
          this.state.plays.push({ name: "strikeout", color: "red" })
          game.outs++;
          game.strikes = 0;
          game.balls = 0;
        }
        break;

      //ball
      case 5:
      case 6:
      case 7:
        this.state.plays.push({ name: "ball", color: "yellow" })
        game.balls++
        if (game.balls === 4) {
          this.state.plays.push({ name: "Walk", color: "green" });
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
            this.state.plays.push({ name: "single", color: "green" })
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
            this.state.plays.push({ name: "double", color: "green" })
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
            this.state.plays.push({ name: "triple", color: "green" })
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
            this.state.plays.push({ name: "HOMERUN", color: "green" })
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
        <div class="row">
          <div class="column">
            <button onClick={this.gameDice}>Pitch the Ball!</button>
            <ScoreBoard game={this.state.game} />
            <Field game={this.state.game}></Field></div>
          <div class="column"><PlayList plays={this.state.plays}></PlayList>
          </div></div>
      </React.Fragment >
    );
  }

}

export default BaseballControl;