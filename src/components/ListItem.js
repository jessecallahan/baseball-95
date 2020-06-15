import React from 'react'


function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <div class="background-blue"><li className={props.color} > {props.value}</li ></div>;
}

export default ListItem