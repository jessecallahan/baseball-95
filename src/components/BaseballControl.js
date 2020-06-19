import React from "react";
import ScoreBoard from "./ScoreBoard";
import PlayList from "./PlayList"
import Header from './Header'



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



    //change inning logic
    if (game.outs === 3 && game.bottomOfInning === false) {
      if (game.score > game.cpuScore && game.innning >= 9) { this.state.plays.push({ name: "Cpu: " + game.cpuScore + " Player1: " + game.score, color: "yellow" }, { name: "game over. You Win!", color: "yellow" }) }
      else {
        game.bottomOfInning = true; game.outs = 0; game.first = false; game.second = false; game.third = false; game.strikes = 0; game.balls = 0; this.state.plays.push({ name: "top of inning number " + game.inning + " ends.", color: "yellow" }, { name: "Cpu: " + game.cpuScore + " Player1: " + game.score, color: "yellow" })
      }
    } else if (game.outs === 3 && game.bottomOfInning === true) {
      if (game.score > game.cpuScore && game.innning >= 9) { this.state.plays.push({ name: "Cpu: " + game.cpuScore + " Player1: " + game.score, color: "yellow" }, { name: "game over. You Win!", color: "yellow" }) }
      else if (game.score < game.cpuScore && game.innning >= 9) { this.state.plays.push({ name: "Cpu: " + game.cpuScore + " Player1: " + game.score, color: "yellow" }, { name: "game over. You lose.", color: "yellow" }) }
      else {
        game.bottomOfInning = false; game.inning = game.inning + 1; game.strikes = 0; game.balls = 0; game.first = false; game.second = false; game.third = false; game.outs = 0; this.state.plays.push({ name: "bottom of inning number " + (game.inning - 1) + " ends.", color: "yellow" }, { name: "Cpu: " + game.cpuScore + " Player1: " + game.score, color: "yellow" })
      }
    } else { }


    // if (game.outs === 3 && game.inning === 9 && game.bottomOfInning === false) {
    //   if (game.score > game.cpuScore) { this.state.plays.push({ name: "game over. You win!", color: "yellow" }) }
    //   else { game.outs = 0; game.bottomOfInning = true; game.first = false; game.second = false; game.third = false; game.strikes = 0; game.balls = 0 }
    // }
    // else if (game.outs === 3 && game.inning === 9 && game.bottomOfInning === true) {
    //   if (game.score < game.cpuScore) { this.state.plays.push({ name: "game over. You lose.", color: "yellow" }) }
    //   else if (game.score > game.cpuScore) {
    //     this.state.plays.push({ name: "game over. You win!", color: "yellow" })
    //   }
    //   else { game.outs = 0; game.bottomOfInning = false; game.first = false; game.second = false; game.third = false; game.strikes = 0; game.balls = 0 }

    // }

    //game-over logic
    // if (game.bottomOfInning === true && game.inning === 9 && game.outs === 3) { this.state.plays.push({ name: "game over. You win!", color: "yellow" }) }





    switch (outcome) {
      //outs
      case 1:
        this.state.plays.push({ name: "flyout", color: "red" })
        game.outs++;
        game.strikes = 0;
        game.balls = 0;
        break;
      case 2:
        this.state.plays.push({ name: "groundout", color: "red" })
        game.outs++;
        game.strikes = 0;
        game.balls = 0;
        break;

      //strike
      case 3:
      case 4:
      case 5:
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
      case 6:
      case 7:
        this.state.plays.push({ name: "ball", color: "yellow" })
        game.balls++
        if (game.balls === 4) {
          this.state.plays.push({ name: "Walk", color: "green" });
          if (game.first === true && game.second === true && game.third === true) {
            if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.push({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.push({ name: "WALKEDINARUNscore+1", color: "orange" }) } game.first = true;
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
            if (game.first === true && game.second === true && game.third === true) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.push({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.push({ name: "score+2", color: "orange" }) } game.first = true; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.third === true && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.push({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.push({ name: "score+2", color: "orange" }) } game.first = true; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === true && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.push({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.push({ name: "score+1", color: "orange" }) } game.first = true; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.third === true && game.second === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.push({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.push({ name: "score+1", color: "orange" }) } game.first = true; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { game.first = true; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.first === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.push({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.push({ name: "score+1", color: "orange" }) } game.first = true; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.third === true && game.second === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.push({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.push({ name: "score+1", color: "orange" }) } game.first = true; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { game.first = true; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else { game.first = true; game.balls = 0; game.strikes = 0 }
            break;

          //double
          case 3:
          case 4:
            this.state.plays.push({ name: "double", color: "green" })
            if (game.first === true && game.second === true && game.third === true) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.push({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.push({ name: "score+2", color: "orange" }) } game.first = false; game.second = true; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.third === true && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.push({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.push({ name: "score+2", color: "orange" }) } game.first = false; game.second = true; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === true && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.push({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.push({ name: "score+1", color: "orange" }) } game.first = false; game.second = true; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.third === true && game.second === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.push({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.push({ name: "score+1", color: "orange" }) } game.first = false; game.second = true; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { game.first = false; game.second = true; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.first === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.push({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.push({ name: "score+1", color: "orange" }) } game.first = false; game.second = true; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.third === true && game.second === false && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.push({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.push({ name: "score+1", color: "orange" }) } game.first = false; game.second = true; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { game.first = false; game.second = true; game.third = true; game.balls = 0; game.strikes = 0 }
            else { game.second = true; game.balls = 0; game.strikes = 0 }
            break;

          //triple
          case 5:
            this.state.plays.push({ name: "triple", color: "green" })
            if (game.first === true && game.second === true && game.third === true) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 3; this.state.plays.push({ name: "cpu_score+3", color: "orange" }) } else { game.score = game.score + 3; this.state.plays.push({ name: "score+3", color: "orange" }) } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.third === true && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.push({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.push({ name: "score+2", color: "orange" }) } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === true && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.push({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.push({ name: "score+2", color: "orange" }) } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.third === true && game.second === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.push({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.push({ name: "score+2", color: "orange" }) } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { game.first = false; game.second = false; game.third = true; game.score = game.score + 1; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.first === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.push({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.push({ name: "score+1", color: "orange" }) } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.third === true && game.second === false && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.push({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.push({ name: "score+1", color: "orange" }) } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.push({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.push({ name: "score+1", color: "orange" }) } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else { game.third = true; game.balls = 0; game.strikes = 0 }
            break;

          //homerun
          case 6:
            this.state.plays.push({ name: "HOMERUN", color: "green" })
            if (game.first === true && game.second === true && game.third === true) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 4; this.state.plays.push({ name: "cpu_score+4", color: "orange" }) } else { game.score = game.score + 4; this.state.plays.push({ name: "GRANDSLAM!!!+4", color: "orange" }) } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.third === true && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 3; this.state.plays.push({ name: "cpu_score+3", color: "orange" }) } else { game.score = game.score + 3; this.state.plays.push({ name: "score+3", color: "orange" }) } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === true && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 3; this.state.plays.push({ name: "cpu_score+3", color: "orange" }) } else { game.score = game.score + 3; this.state.plays.push({ name: "score+3", color: "orange" }) } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.third === true && game.second === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 3; this.state.plays.push({ name: "cpu_score+3", color: "orange" }) } else { game.score = game.score + 3; this.state.plays.push({ name: "score+3", color: "orange" }) } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.push({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.push({ name: "score+2", color: "orange" }) } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.first === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.push({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.push({ name: "score+2", color: "orange" }) } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.third === true && game.second === false && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.push({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.push({ name: "score+2", color: "orange" }) } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else {
              if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.push({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.push({ name: "score+1", color: "orange" }) } game.balls = 0; game.strikes = 0
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

        <div class="parent">
          <div className="div1">
            <Header />
          </div>
          <div class="div2">
            <button onClick={this.gameDice}>Pitch the Ball!</button>
            <button onClick={this.gameDice}>Curveball</button>
            <button onClick={this.gameDice}>Fastball</button>
            <ScoreBoard game={this.state.game} /></div>
          <div class="div3">
            <PlayList plays={this.state.plays} />
          </div>
        </div>
      </React.Fragment >
    );
  }

}

export default BaseballControl;