import React from 'react'
import ListItem from './ListItem'




function PlayList(props) {
  const plays = props.plays;

  console.log(props.plays)
  const listItems = plays.map((plays) =>
    <ListItem key={plays} value={plays.name} color={plays.color} />
  );
  return (
    <ul className="no-bullets">
      <div className="element-selector"><li> {listItems}</li></div>
    </ul >
  );
}

export default PlayList
