import React from 'react';
import Board from './Board';


export default function ShowHistory(props) {
  // OMG TODO historyBoardNumber
  let historyParts2 = props.history.slice(-4);
  let x =  historyParts2.slice();
  x.splice(-1);
  let historyParts = x;
  


    const HistoryBoards = historyParts.map((element, index) => 
      <li className='history-item' key={index} historypart={element.partNumber}>
        <Board
          historyFlag={true}
          actualMoveNumber={element.actualMoveNumber}
          clicked={element.clicked}
          squares={element.squares} 
          xIsNext={element.xIsNext}
          partNumber={element.partNumber}
          onClick={(Event) => props.onClick(Event,index)}
        />
      </li>
    );

    if (historyParts.length > 0) {
      return (
        <div>
          <p className = "history-description">Past moves:</p>
          <ul className={'history'}>
            {HistoryBoards}
          </ul>
        </div>
      )
    } else {
      return (
        <div>
          
        </div>
      )
    }
}