import React from 'react'


function ListItem(props) {
  return <div className="background-blue"><li className={props.color} > {props.value}</li ></div>;
}

export default ListItem