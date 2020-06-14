import React from 'react'
import ListItem from './ListItem'



function PlayList(props) {
  const plays = props.plays;
  console.log(props.plays)
  const listItems = plays.map((plays) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={plays} value={plays} />
  );
  return (
    <ul className="no-bullets">
      <li>{listItems}</li>
    </ul>
  );
}

export default PlayList
