import React from "react";
import FieldPic from "../assets/baseball_diamond_solid_page.jpg"
import FieldPic1 from "../assets/home1.jpg"
import FieldPic12 from "../assets/home12.jpg"
import FieldPic123 from "../assets/home123.jpg"


function Field(props) {
  const { game } = props;
  if (game.first === true && game.second === false && game.third === false) {
    return (
      <React.Fragment>

        <img width="600" height="400" alt="No one on Field" src={FieldPic1}></img>
      </React.Fragment>
    );
  }
  else if (game.first === true && game.second === true && game.third === false) {
    return (
      <img width="600" height="400" alt="No one on Field" src={FieldPic12}></img>
    );
  }
  else if (game.first === true && game.second === true && game.third === true) {
    return (
      <img width="600" height="400" alt="No one on Field" src={FieldPic123}></img>
    );
  } else {
    return (
      <img width="600" height="400" alt="No one on Field" src={FieldPic}></img>
    );
  }
}

export default Field;








