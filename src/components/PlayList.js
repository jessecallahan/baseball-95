import React from 'react'
import ListItem from './ListItem'





function PlayList(props) {
  const plays = props.plays;
  // const reversedPlays = plays.reverse();
  // console.log(reversedPlays);
  const listItems = plays.map((plays) =>
    <ListItem key={plays} value={plays.name} color={plays.color} />
  );
  return (
    <ul className="no-bullets">
      {listItems}
    </ul>
  );
}

export default PlayList
