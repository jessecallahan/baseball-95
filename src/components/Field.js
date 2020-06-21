import React from "react";
import FieldPic from "../assets/baseball_diamond_solid_page.jpg"
import FieldPic1 from "../assets/1.jpg"
import FieldPic2 from "../assets/2.jpg"
import FieldPic3 from "../assets/3.jpg"
import FieldPic123 from "../assets/123.jpg"
import FieldPic12 from "../assets/12.jpg"
import FieldPic23 from "../assets/23.jpg"
import FieldPic13 from "../assets/13.jpg"
import hFieldPic1 from "../assets/h1.jpg"
import hFieldPic2 from "../assets/h2.jpg"
import hFieldPic3 from "../assets/h3.jpg"
import hFieldPic123 from "../assets/h123.jpg"
import hFieldPic12 from "../assets/h12.jpg"
import hFieldPic23 from "../assets/h23.jpg"
import hFieldPic13 from "../assets/h13.jpg"


function Field(props) {
  const { game } = props;

  if (game.bottomOfInning === false) {
    if (game.first === true && game.second === false && game.third === false) {
      return (
        <React.Fragment>
          <img alt="No one on Field" src={FieldPic1}></img>
        </React.Fragment>
      );
    }
    else if (game.first === false && game.second === true && game.third === false) {
      return (
        <img alt="No one on Field" src={FieldPic2}></img>
      );
    }
    else if (game.first === false && game.second === false && game.third === true) {
      return (
        <img alt="No one on Field" src={FieldPic3}></img>
      );
    } else if (game.first === true && game.second === true && game.third === true) {
      return (
        <img alt="No one on Field" src={FieldPic123}></img>
      );
    } else if (game.first === false && game.second === true && game.third === true) {
      return (
        <img alt="No one on Field" src={FieldPic23}></img>
      );
    } else if (game.first === true && game.second === false && game.third === true) {
      return (
        <img alt="No one on Field" src={FieldPic13}></img>
      );
    } else if (game.first === true && game.second === true && game.third === false) {
      return (
        <img alt="No one on Field" src={FieldPic12}></img>
      );
    } else {
      return (
        <img alt="No one on Field" src={FieldPic} ></ img>
      );
    }
  } else {
    if (game.first === true && game.second === false && game.third === false) {
      return (
        <React.Fragment>
          <img alt="No one on Field" src={hFieldPic1}></img>
        </React.Fragment>
      );
    }
    else if (game.first === false && game.second === true && game.third === false) {
      return (
        <img alt="No one on Field" src={hFieldPic2}></img>
      );
    }
    else if (game.first === false && game.second === false && game.third === true) {
      return (
        <img alt="No one on Field" src={hFieldPic3}></img>
      );
    } else if (game.first === true && game.second === true && game.third === true) {
      return (
        <img alt="No one on Field" src={hFieldPic123}></img>
      );
    } else if (game.first === false && game.second === true && game.third === true) {
      return (
        <img alt="No one on Field" src={hFieldPic23}></img>
      );
    } else if (game.first === true && game.second === false && game.third === true) {
      return (
        <img alt="No one on Field" src={hFieldPic13}></img>
      );
    } else if (game.first === true && game.second === true && game.third === false) {
      return (
        <img alt="No one on Field" src={hFieldPic12}></img>
      );
    } else {
      return (
        <img alt="No one on Field" src={FieldPic} ></img>
      );
    }

  }

}

export default Field;








