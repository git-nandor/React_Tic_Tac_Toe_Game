import React from 'react';
import Square from './Square';


export default class Board extends React.Component {
  constructor (props) {
    super (props);
    this.win = false;
    this.winner = null;
  }

  renderBoard(boardSizep) {
    let boardSize = 5;
    let prepareBoardRows = [];

    for (let boardRowsNumber = 0; boardRowsNumber < boardSize; boardRowsNumber++) {
      console.log('boardRowsNumber',boardRowsNumber);
      prepareBoardRows.push(<div key={boardRowsNumber} className="board-row"> {this.renderBoardRow(boardRowsNumber, boardSize)}</div>);
    };
    console.log('renderboard: prepareBoardRows:',prepareBoardRows);
    return (
      <div className="board-container">
        {prepareBoardRows}
      </div>
    );
  }

  renderBoardRow(rowNumber, boardSize) {

    let prepareRowSquares = [];

    console.log('renderBoardRow: rowNumber, boardSize', rowNumber,boardSize );
    for (let rowSquare = rowNumber * boardSize; rowSquare < (rowNumber + 1) * boardSize; rowSquare++) {
      console.log('renderSquare:',rowSquare);
      prepareRowSquares.push(<span key={'rs' + rowSquare}>{this.renderSquare(rowSquare)}</span>);
    };
    console.log('renderBoardRow: prepareRowSquares', prepareRowSquares );
    return (
      <>
        {prepareRowSquares}
      </>
    );
    
  }

  renderSquare(i) {
    let prepareValue;
    let unClickable = false;
    console.log('------------------renderSquare(i)',i);

    // Current board Current
    if (this.props.squares[i] !== null && this.props.currentFlag && parseInt(i) === this.props.clicked[this.props.actualMoveNumber] ) {
      prepareValue = (<span key={i} className="current">{this.props.squares[i]}</span>);
      unClickable = true;

    // Current board Normal 
    } else if (this.props.squares[i] !== null && this.props.currentFlag && parseInt(i) !== this.props.clicked[this.props.actualMoveNumber] ){
      prepareValue = (<span key={i} className="normal">{this.props.squares[i]}</span>);
      unClickable = true;

    // Current board Empty 
    } else if (!this.win && this.props.squares[i] === null && this.props.currentFlag){
      prepareValue = (<span key={i} className="null">{null}</span>);
      unClickable = false;
      
    // Current board WIN  
    } else if (this.win === true && this.props.squares[i] === null) { 
      prepareValue = (<span key={i} className="win">{null}</span>);
      unClickable = true;  

    // History board Current 
    } else if (this.props.squares[i] !== null && this.props.historyFlag && parseInt(i) === this.props.clicked[this.props.actualMoveNumber] ) { 
      prepareValue = (<span className="past">{this.props.squares[i]}</span>);

    // History board Normal
    } else if (this.props.squares[i] !== null && this.props.historyFlag && parseInt(i) !== this.props.clicked[this.props.actualMoveNumber] ) { 
      prepareValue = (<span key={i} className="normal">{this.props.squares[i]}</span>);
    } 

    return (
      <Square key={i}
        value = {prepareValue}
        onClick = {unClickable ? null : (Event) => this.props.onClick(Event,i)}
      />
    );
  }

  render() {
    let status;
    this.win = false;
    let winner = null;


    if (this.props.clicked.length > 0  && this.props.currentFlag) {
      winner = calculateWinner(this.props.squares, this.props.clicked[this.props.clicked.length-1]);
    };

    if (winner) {
      status = (<span className = "win">Winner: {winner}!</span>);  
      this.win = true;
    } else if (!this.props.historyFlag){
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
    } 
    return (
      <div>
        <div className="status">{status}</div>
          {this.renderBoard(this.props.boardSize)}
      </div>
    );
  }
}

const calculateWinner = (squares, i) => {
  console.log('calc WINNER ************************** ', squares, i);
  const boardSize = 5;
  const winPatternLength = 3;
  const clicked = parseInt(i);
  let winSquares = [parseInt(i)];
  let hasWinner = false;

  // Check Horizontal+  (board border && length of winner pattern)
  for (let h1 = clicked; 
    h1 < ((Math.floor(clicked/boardSize) * boardSize) + boardSize) && 
    h1 < (clicked + winPatternLength); 
    h1++
  ) {
      if (squares[clicked] === squares[h1]) {
        if (!winSquares.includes(h1)) winSquares.push(h1);
      } else {break} 
    };

  // Check Horizontal-
  for (let h2 = clicked; 
    h2 > ((Math.floor(clicked/boardSize) * boardSize) - 1) && 
    h2 > (clicked - winPatternLength); 
    h2--
  ) {
      if (squares[clicked] === squares[h2]) {
        if (!winSquares.includes(h2)) winSquares.push(h2);
      } else {break} 
    }; 
  // If found in Horizontal set hasWinner  
  if (winSquares.length === winPatternLength) {console.log('FOUND WINNER IN Check Horizontal');hasWinner = true}; 


 // Check Vertical+ 
 if (!hasWinner) {
  winSquares = [parseInt(i)];
  for (let v1 = clicked; 
    v1 <= (clicked + (((boardSize - 1) - Math.floor(clicked/boardSize)) * boardSize)) && 
    v1 <= (clicked + ((winPatternLength-1) * boardSize)); 
    v1 += boardSize
  ) {
      if (squares[clicked] === squares[v1] && !winSquares.includes(v1)) {
        winSquares.push(v1)
      } else {break} 
    };

  // Check Vertical-  
  for (let v2 = clicked; 
    v2 >= (clicked - (Math.floor(clicked/boardSize) * boardSize)) && 
    v2 >= (clicked - ((winPatternLength-1) * boardSize)); 
    v2 -= boardSize
  ) {
      if (squares[clicked] === squares[v2]) {
        if (!winSquares.includes(v2)) winSquares.push(v2);
      } else {break} 
    };
  // If found in Vertical set hasWinner
  if (winSquares.length === winPatternLength) {console.log('FOUND WINNER IN Vertical');hasWinner = true}; 
}


// Check Diagonal_a: vertical+ & horizontal-   
if (!hasWinner) {
  winSquares = [parseInt(i)];
  for (let da1 = clicked; 
    da1 <= (da1 + (((boardSize - 1) - (Math.floor(da1/boardSize))) * boardSize)) && // Vertical+ border
    da1 >= (((Math.floor(da1/boardSize)) * boardSize) - 1) && // Horizontal- border 
    da1 <= (clicked + ((winPatternLength - 1) * (boardSize - 1))); // Full win pattern
    da1 += (boardSize - 1) 
  ) {
      // Check square data && (New row step || Last of win pattern ) 
      if (squares[clicked] === squares[da1] && // Clicked data match 
         ((Math.floor(da1/boardSize) < Math.floor((da1 + (boardSize - 1)) / boardSize)) || // New row step 
         (da1 === (clicked + ((winPatternLength - 1) * (boardSize - 1))))) // Last of win pattern
      ) {
          if (!winSquares.includes(da1)) winSquares.push(da1);
        } else {break} 
    }; 

  // Check Diagonal_a: vertical- & horizontal+   
  for (let da2 = clicked; 
    da2 >= (da2 - ((Math.floor(da2/boardSize)) * boardSize)) && // Vertical- border
    da2 <= ((Math.floor(da2/boardSize) * boardSize) + (boardSize - 1))  && // Horizontal+ border 
    da2 >= (clicked - ((winPatternLength - 1) * (boardSize - 1))); // Full win pattern
    da2 -= (boardSize - 1) 
  ) {
      // Check square data && (New row step || Last of win pattern )
      if (squares[clicked] === squares[da2] && // Clicked data match
         ((Math.floor(da2/boardSize) > Math.floor((da2 - (boardSize - 1)) / boardSize)) || // New row step
         (da2 === (clicked - ((winPatternLength - 1) * (boardSize - 1))))) // Last of win pattern
      ) {
        if (!winSquares.includes(da2)) winSquares.push(da2);
      } else {break} 
    }; 
  // If found in Diagonal_a set hasWinner
  if (winSquares.length === winPatternLength) {console.log('FOUND WINNER IN Diagonal_a');hasWinner = true};  
} 


// Check Diagonal_b: vertical- & horizontal-  
if (!hasWinner) { 
  winSquares = [parseInt(i)];
  for (let db1 = clicked; 
    db1 >= (db1 - ((Math.floor(db1/boardSize) * boardSize))) && 
    db1 >= ((Math.floor(db1/boardSize) * boardSize)  - 1) && 
    db1 >= (clicked - ((winPatternLength - 1) * (boardSize + 1))); 
    db1 -= (boardSize + 1) 
  ) {
      if (squares[clicked] === squares[db1]) {
        if (!winSquares.includes(db1)) winSquares.push(db1);
      } else {break} 
    }; 

  // Check Diagonal_b: vertical+ & horizontal+   
  for (let db2 = clicked; 
    db2 <= (db2 + (((boardSize - 1) - (Math.floor(db2/boardSize))) * boardSize)) && 
    db2 <= ((Math.floor(db2/boardSize) * boardSize) + (boardSize - 1))  && 
    db2 <= (clicked + ((winPatternLength - 1) * (boardSize + 1))); 
    db2 += (boardSize + 1) 
  ) {
      if (squares[clicked] === squares[db2]) {
        if (!winSquares.includes(db2)) winSquares.push(db2);
      } else {break} 
    };
  // If found in Diagonal_a set hasWinner
  if (winSquares.length === winPatternLength) {console.log('FOUND WINNER IN Diagonal_b');hasWinner = true}; 
} 


if (hasWinner) {  
  winSquares.forEach(winSquare => {
    squares[winSquare] = (<span className="win">{squares[winSquare]}</span>);
  });
 
  // Return the winner symbole X/O
  return squares[winSquares[0]];
}
  return null;
}