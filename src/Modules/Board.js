import React from 'react';
import Square from './Square';


export default class Board extends React.Component {

  jelentes(){
    console.log('SQUARES IN BOARD!!!', this.props.squares);
  }

  clearCurrent() {
    let domSquares = Array.from(document.getElementsByClassName('current'));
   
    if(domSquares.length > 0){
      domSquares.forEach(square => {
        square.classList.remove('current');
      });
    }
  }

  renderSquare(i) {
    let prepareValue;
    
    if (this.props.historyFlag && i === this.props.clicked) {
      prepareValue = (<span className="past">{this.props.squares[i]}</span>)

    } else if (this.props.currentFlag && i === this.props.clicked) {
      this.clearCurrent();
      prepareValue = (<span className="current">{this.props.squares[i]}</span>)
      
    } else {
      prepareValue = this.props.squares[i]
    };

    return (
      <Square
        value = {prepareValue}
        onClick = {(Event) => this.props.onClick(Event,i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.props.squares);
    let status;

    if (winner) {
      status = (<span className = "win">Winner: {winner}!</span>);
    } else if (!this.props.historyFlag){
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
    } 


    this.jelentes(this.props.square);



    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      
      // Set win class for the winner pattern
      squares[a] = (<span className="win">{squares[a]}</span>);
      squares[b] = (<span className="win">{squares[b]}</span>);
      squares[c] = (<span className="win">{squares[c]}</span>);

      // Return the winner symbole X/O
      return squares[a];
    }
  }
  return null;
}