import React from 'react';
import Board from './Board';


export default function ShowHistory(props) {
  let lastFewHistoryParts = props.history.slice(props.historyBoardNumber-1);
  let lastFewHistoryPartsWithouthEnd =  lastFewHistoryParts.slice();
  lastFewHistoryPartsWithouthEnd.splice(-1);
  let historyParts = lastFewHistoryPartsWithouthEnd; 
  
    const HistoryBoards = historyParts.map((element, index) => 
    
      <li className={`history-item`} key={index} historypart={element.partNumber}>
        <Board
          historyFlag={true}
          actualMoveNumber={element.actualMoveNumber}
          clicked={element.clicked}
          squares={element.squares} 
          xIsNext={element.xIsNext}
          partNumber={element.partNumber}
          onClick={(Event) => props.onClick(Event,index)}
          boardSize={props.boardSize}
          winPatternLength={element.winPatternLength}
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