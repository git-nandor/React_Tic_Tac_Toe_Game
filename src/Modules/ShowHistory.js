import React from 'react';
import Board from './Board';


export default function ShowHistory(props) {

  const historyParts = props.history.slice(props.historyMoves-1);
  historyParts.splice(-1);
 

    const HistoryBoards = historyParts.map((element, index) => 
      <li className='history-item' key={index} historypart={element.partNumber}>
        <Board
          historyFlag={true}
          clicked={element.clicked}
          squares={element.squares} 
          xIsNext={element.xIsNext}
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