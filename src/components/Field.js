import React from "react";

function Field(props) {
  const { game } = props;


  return (
    <React.Fragment>
      <p>
        runner on 1st:{game.first.toString() + " "}</p>
      <p>
        runner on 2nd:{game.second.toString() + " "}
      </p>
      <p>
        runner on 3rd:{game.third.toString() + " "}
      </p>
    </React.Fragment>
  );
}


export default Field;








