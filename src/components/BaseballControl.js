import React from "react";
import ScoreBoard from "./ScoreBoard";
import PlayList from "./PlayList"
import Header from './Header'
import GameOver from './GameOver'
import FastballButton from '../assets/fastball.jpg'
import CurveballButton from '../assets/curveball.jpg'
import SlowballButton from '../assets/slowball.jpg'


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
      plays: [{ name: "play ball", color: "yellow" }],
      endOfGame: false

    };
    this.gameDiceFast = this.gameDiceFast.bind(this)
    this.gameDiceSlow = this.gameDiceSlow.bind(this)
    this.gameDiceCurve = this.gameDiceCurve.bind(this)
  }

  gameDiceFast = () => {
    return this.gameRoll(8, 6)
  }

  gameDiceSlow = () => {
    return this.gameRoll(Math.ceil(Math.random() * 8), Math.ceil(Math.random() * 6))
  }

  gameDiceCurve = () => {
    return this.gameRoll(Math.ceil(Math.random() * 8), Math.ceil(Math.random() * 6))
  }

  gameWinningLogic = () => {
    const game = this.state.game
    if (game.inning > 9 && game.score > game.cpuScore) {
      this.state.plays.unshift({ name: "game over. You win!", color: "yellow" });
      this.setState({ endOfGame: true });
    } else if (game.inning > 9 && game.score < game.cpuScore) {
      this.state.plays.unshift({ name: "game over. You lose :(", color: "yellow" });
      this.setState({ endOfGame: true });
    }
    else { return game }
  }

  topInningGameWinningLogic = () => {
    const game = this.state.game
    if (game.inning >= 9 && game.score > game.cpuScore) {
      this.state.plays.unshift({ name: "game over. You win!", color: "yellow" });
      this.setState({ endOfGame: true });
    } else if (game.inning >= 9 && game.score < game.cpuScore) { return game }
  }

  walkOffLogic = () => {
    const game = this.state.game
    if (game.bottomOfInning === true && game.inning >= 9 && game.score > game.cpuScore) {
      this.state.plays.unshift({ name: '"It\'s a walk off!" You win!', color: "yellow" });
      this.playListShow("score");
      this.setState({ endOfGame: true });
    }
    else { return game }
  }

  clearBases = () => {
    const game = this.state.game; game.outs = 0; game.strikes = 0; game.balls = 0; game.first = false; game.second = false; game.third = false;
  }

  changeInningLogic = () => {
    const game = this.state.game
    if (game.outs === 3 && game.bottomOfInning === false) {
      game.bottomOfInning = true;
      this.clearBases();
      this.playListShow("top");
      this.playListShow("score");
      this.topInningGameWinningLogic();
    }
    else if (game.outs === 3 && game.bottomOfInning === true) {
      game.bottomOfInning = false;
      game.inning = game.inning + 1;
      this.clearBases();
      this.playListShow("bottom")
      this.playListShow("score");
      this.gameWinningLogic();
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
    if (input === "bottom") { play = { name: "bottom of inning number " + (this.state.game.inning - 1) + " ends.", color: "yellow" } }
    if (input === "top") { play = { name: "top of inning number " + this.state.game.inning + " ends.", color: "yellow" } }

    if (input === "score") { play = { name: "Cpu: " + this.state.game.cpuScore + " Player1: " + this.state.game.score, color: "yellow" } }

    if (input === "groundout") { play = { name: "groundout", color: "red" } }
    if (input === "strike") { play = { name: "strike", color: "red" } }
    if (input === "cpuScores+2") { play = { name: "cpu_score+2", color: "orange" } }

    //this.state.plays.unshift(result the right choice)
    this.state.plays.unshift(play)
  }

  gameRoll = (outcome, hitOutcome) => {
    const game = this.state.game
    /// change inning on each roll
    this.changeInningLogic();
    this.walkOffLogic();
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
        this.state.plays.unshift({ name: "groundout", color: "red" })
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
          this.state.plays.unshift({ name: "strikeout", color: "red" })
          game.outs++;
          game.strikes = 0;
          game.balls = 0;
        }
        break;

      //ball
      case 6:
      case 7:
        this.state.plays.unshift({ name: "ball", color: "yellow" })
        game.balls++
        if (game.balls === 4) {
          this.state.plays.unshift({ name: "Walk", color: "green" });
          if (game.first === true && game.second === true && game.third === true) {
            if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.playListShow("cpuScore+1"); } else { game.score = game.score + 1; this.state.plays.unshift({ name: "WALKEDINARUNscore+1", color: "orange" }) } game.first = true;
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
            console.log(game)
            this.state.plays.unshift({ name: "single", color: "green" })
            if (game.first === true && game.second === true && game.third === true) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.unshift({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.unshift({ name: "score+2", color: "orange" }) } game.first = true; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.third === true && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.unshift({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.unshift({ name: "score+2", color: "orange" }) } game.first = true; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === true && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.unshift({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.unshift({ name: "score+1", color: "orange" }) } game.first = true; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.third === true && game.second === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.unshift({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.unshift({ name: "score+1", color: "orange" }) } game.first = true; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { game.first = true; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.third === true && game.second === false && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.unshift({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.unshift({ name: "score+1", color: "orange" }) } game.first = true; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.first === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.unshift({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.unshift({ name: "score+1", color: "orange" }) } game.first = true; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { game.first = true; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else { game.first = true; game.balls = 0; game.strikes = 0 }
            break;

          //double
          case 3:
          case 4:
            this.state.plays.unshift({ name: "double", color: "green" })
            if (game.first === true && game.second === true && game.third === true) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.unshift({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.unshift({ name: "score+2", color: "orange" }) } game.first = false; game.second = true; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.third === true && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.unshift({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.unshift({ name: "score+2", color: "orange" }) } game.first = false; game.second = true; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === true && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.unshift({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.unshift({ name: "score+1", color: "orange" }) } game.first = false; game.second = true; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.third === true && game.second === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.unshift({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.unshift({ name: "score+1", color: "orange" }) } game.first = false; game.second = true; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { game.first = false; game.second = true; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.first === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.unshift({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.unshift({ name: "score+1", color: "orange" }) } game.first = false; game.second = true; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.third === true && game.second === false && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.unshift({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.unshift({ name: "score+1", color: "orange" }) } game.first = false; game.second = true; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { game.first = false; game.second = true; game.third = true; game.balls = 0; game.strikes = 0 }
            else { game.second = true; game.balls = 0; game.strikes = 0 }
            break;

          //triple
          case 5:
            this.state.plays.unshift({ name: "triple", color: "green" })
            if (game.first === true && game.second === true && game.third === true) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 3; this.state.plays.unshift({ name: "cpu_score+3", color: "orange" }) } else { game.score = game.score + 3; this.state.plays.unshift({ name: "score+3", color: "orange" }) } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.third === true && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.unshift({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.unshift({ name: "score+2", color: "orange" }) } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === true && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.unshift({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.unshift({ name: "score+2", color: "orange" }) } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.third === true && game.second === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.unshift({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.unshift({ name: "score+2", color: "orange" }) } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { game.first = false; game.second = false; game.third = true; game.score = game.score + 1; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.first === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.unshift({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.unshift({ name: "score+1", color: "orange" }) } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.third === true && game.second === false && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.unshift({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.unshift({ name: "score+1", color: "orange" }) } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.unshift({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.unshift({ name: "score+1", color: "orange" }) } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else { game.third = true; game.balls = 0; game.strikes = 0 }
            break;

          //homerun
          case 6:
            this.state.plays.unshift({ name: "HOMERUN", color: "green" })
            if (game.first === true && game.second === true && game.third === true) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 4; this.state.plays.unshift({ name: "cpu_score+4", color: "orange" }) } else { game.score = game.score + 4; this.state.plays.unshift({ name: "GRANDSLAM!!!+4", color: "orange" }) } game.first = false; game.second = false; game.third = true; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.third === true && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 3; this.state.plays.unshift({ name: "cpu_score+3", color: "orange" }) } else { game.score = game.score + 3; this.state.plays.unshift({ name: "score+3", color: "orange" }) } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === true && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 3; this.state.plays.unshift({ name: "cpu_score+3", color: "orange" }) } else { game.score = game.score + 3; this.state.plays.unshift({ name: "score+3", color: "orange" }) } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.third === true && game.second === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 3; this.state.plays.unshift({ name: "cpu_score+3", color: "orange" }) } else { game.score = game.score + 3; this.state.plays.unshift({ name: "score+3", color: "orange" }) } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.first === true && game.second === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.unshift({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.unshift({ name: "score+2", color: "orange" }) } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.second === true && game.first === false && game.third === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.unshift({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.unshift({ name: "score+2", color: "orange" }) } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else if (game.third === true && game.second === false && game.first === false) { if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 2; this.state.plays.unshift({ name: "cpu_score+2", color: "orange" }) } else { game.score = game.score + 2; this.state.plays.unshift({ name: "score+2", color: "orange" }) } game.first = false; game.second = false; game.third = false; game.balls = 0; game.strikes = 0 }
            else {
              if (game.bottomOfInning === false) { game.cpuScore = game.cpuScore + 1; this.state.plays.unshift({ name: "cpu_score+1", color: "orange" }) } else { game.score = game.score + 1; this.state.plays.unshift({ name: "score+1", color: "orange" }) } game.balls = 0; game.strikes = 0
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

    if (this.state.endOfGame === true) {
      return (
        <div className="parent">
          <div className="div1">
            <Header />
          </div>
          <div className="div2">
            <GameOver game={this.state.game}></GameOver> </div>
          <div className="div3">
            <PlayList plays={this.state.plays} />
          </div>
        </div>)
    } else {
      return (
        <div className="parent">
          <div className="div1">
            <Header />
          </div>
          <div className="div2">
            <button><img src={FastballButton} alt="fastball" onClick={this.gameDiceFast} /></button>
            <button><img src={SlowballButton} alt="slowball" onClick={this.gameDiceSlow} /></button>
            <button><img src={CurveballButton} alt="curveball" onClick={this.gameDiceCurve} /></button>
            <ScoreBoard game={this.state.game} /></div>
          <div className="div3">
            <PlayList plays={this.state.plays} />
          </div>
        </div>
      );
    }
  }

}

export default BaseballControl;