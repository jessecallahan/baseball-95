import React from 'react'


function ListItem(props) {
  return <div className="element-selector"><div class="background-blue"><li className={props.color} > {props.value}</li ></div></div>;
}

export default ListItem