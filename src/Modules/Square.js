import React from 'react';

export default function Square(props) {
  
  return (
    <button
      className="square"
      onClick={props.onClick ? (Event) => props.onClick(Event) : null}
    >
      {props.value}
    </button>
  );
} 