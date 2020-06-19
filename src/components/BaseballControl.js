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
        bottomOfInning: true
      },
      plays: [{ name: "play ball", color: "yellow" }]

    };
    this.gameDiceFast = this.gameDiceFast.bind(this)
    this.gameDiceSlow = this.gameDiceSlow.bind(this)
    this.gameDiceCurve = this.gameDiceCurve.bind(this)
  }

  gameDiceFast = () => {
    return this.gameRoll(Math.ceil(Math.random() * 8), Math.ceil(Math.random() * 6))
  }
  gameDiceSlow = () => {
    return this.gameRoll(Math.ceil(Math.random() * 8), Math.ceil(Math.random() * 6))
  }
  gameDiceCurve = () => {
    return this.gameRoll(Math.ceil(Math.random() * 8), Math.ceil(Math.random() * 6))
  }
  gameWinningLogic = () => {
    const game = this.state.game
    if (game.inning >= 9 && game.score > game.cpuScore) {
      return this.state.plays.push({ name: "game over. You win!", color: "yellow" })
    } else if (game.inning >= 9 && game.score < game.cpuScore) { return this.state.plays.push({ name: "game over. You lose :(", color: "yellow" }) }
    else { return game }
  }

  topInningGameWinningLogic = () => {
    const game = this.state.game
    if (game.inning >= 9 && game.score > game.cpuScore) {
      return this.state.plays.push({ name: "game over. You win!", color: "yellow" })
    } else if (game.inning >= 9 && game.score < game.cpuScore) { return game }
  }


  changeInningLogic = () => {
    const game = this.state.game
    if (game.outs === 3 && game.bottomOfInning === false) {
      game.bottomOfInning = true; game.outs = 0; game.first = false; game.second = false; game.third = false; game.strikes = 0; game.balls = 0; this.state.plays.push({ name: "top of inning number " + game.inning + " ends.", color: "yellow" }, { name: "Cpu: " + game.cpuScore + " Player1: " + game.score, color: "yellow" }); this.topInningGameWinningLogic();
    }
    else if (game.outs === 3 && game.bottomOfInning === true) {
      game.bottomOfInning = false; game.inning = game.inning + 1; game.strikes = 0; game.balls = 0; game.first = false; game.second = false; game.third = false; game.outs = 0; this.state.plays.push({ name: "bottom of inning number " + (game.inning - 1) + " ends.", color: "yellow" }, { name: "Cpu: " + game.cpuScore + " Player1: " + game.score, color: "yellow" }); this.gameWinningLogic();
    } else { return game }
  }


  playListShow = (input) => {
    let play;
    //take in game.score and game.cpuscore as an arguement
    //let score = game.score
    //let cpu = game.cpu.score

    //take in the pre-built object - ex { name: "Cpu: " + game.cpuScore + " Player1: " + game.score, color: "yellow" }

    //let result1 = { name: "Cpu: " + cpu + " Player1: " + score, color: "yellow" }
    //let result2 = {}
    if (input === "groundout") { play = { name: "groundout", color: "red" } }
    if (input === "strike") { play = { name: "strike", color: "red" } }
    if (input === "cpuScores+2") { play = { name: "cpu_score+2", color: "orange" } }

    //this.state.plays.push(result the right choice)
    this.state.plays.push(play)
  }



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
  // if (game.outs === 3 && game.bottomOfInning === false) {
  //   if (game.score > game.cpuScore && game.innning >= 9) { this.state.plays.push({ name: "Cpu: " + game.cpuScore + " Player1: " + game.score, color: "yellow" }, { name: "game over. You Win!", color: "yellow" }) }
  //   else {
  //     game.bottomOfInning = true; game.outs = 0; game.first = false; game.second = false; game.third = false; game.strikes = 0; game.balls = 0; this.state.plays.push({ name: "top of inning number " + game.inning + " ends.", color: "yellow" }, { name: "Cpu: " + game.cpuScore + " Player1: " + game.score, color: "yellow" })
  //   }
  // } else if (game.outs === 3 && game.bottomOfInning === true) {
  //   if (game.score > game.cpuScore && game.innning >= 9) { this.state.plays.push({ name: "Cpu: " + game.cpuScore + " Player1: " + game.score, color: "yellow" }, { name: "game over. You Win!", color: "yellow" }) }
  //   else if (game.score < game.cpuScore && game.innning >= 9) { this.state.plays.push({ name: "Cpu: " + game.cpuScore + " Player1: " + game.score, color: "yellow" }, { name: "game over. You lose.", color: "yellow" }) }
  //   else {
  //     game.bottomOfInning = false; game.inning = game.inning + 1; game.strikes = 0; game.balls = 0; game.first = false; game.second = false; game.third = false; game.outs = 0; this.state.plays.push({ name: "bottom of inning number " + (game.inning - 1) + " ends.", color: "yellow" }, { name: "Cpu: " + game.cpuScore + " Player1: " + game.score, color: "yellow" })
  //   }
  // } else { }
  // }


  gameRoll = (outcome, hitOutcome) => {
    const game = this.state.game
    /// change inning on each roll
    this.changeInningLogic();

    /// 8 dice outcomes
    switch (outcome) {
      //outs
      case 1:
        this.playListShow("groundout");
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
        this.playListShow("strike");
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
            if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.playListShow("cpuScore+1"); } else { game.score = game.score + 1; this.state.plays.push({ name: "WALKEDINARUNscore+1", color: "orange" }) } game.first = true;
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
            <button onClick={this.gameDiceFast}>Fastball!</button>
            <button onClick={this.gameDiceSlow}>Slowball</button>
            <button onClick={this.gameDiceCurve}>Curveball</button>
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