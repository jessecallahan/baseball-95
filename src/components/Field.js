import React from "react";
import FieldPic from "../assets/baseball_diamond_solid_page.jpg"

function Field(props) {
  const { game } = props;


  return (
    <React.Fragment>
      <p>
        1st:{game.first.toString() + " "}
        2nd:{game.second.toString() + " "}
        3rd:{game.third.toString() + " "}
      </p>
      <img width="600" height="400" alt="No one on Field" src={FieldPic}></img>

    </React.Fragment>
  );
}


export default Field;








