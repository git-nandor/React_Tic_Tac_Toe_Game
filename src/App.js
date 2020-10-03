import React from 'react';
import logo from './logo.svg';
import Board from './Modules/Board';
import ShowHistory from './Modules/ShowHistory';
import Slider from './Modules/Slider';
import './App.css';

class Game extends React.Component {
constructor (props) {
  super (props);
  this.clickedSquares = [];
  this.historyBoardNumber = -3; 
  this.winPatternLength = 3;

  this.state = {
    boardSize: null,
    squares: [], 
    xIsNext: true,
    boardHistory: []
  };
} 

  restartGame(event, value) {
    let prepareBoardSize;
     
    if(value) {
      prepareBoardSize = value;
    } else {
      prepareBoardSize = this.state.boardSize;
    }

     let prepareSquares = Array((prepareBoardSize * prepareBoardSize)).fill(null);

      // Evade infinite loop
      if (this.state.boardSize !== value) {
        
        this.clickedSquares = [];
        this.setState({
          boardSize: prepareBoardSize,
          squares: prepareSquares,
          xIsNext: true,
          boardHistory: []
        })
      }
  }

  handleClick(Event,i) {
    let squaresObjectsFromHistory = [];
    let squaresToHistory = [];
    const squares = this.state.squares.slice();

    this.clickedSquares.push(i);
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    if (this.state.boardHistory.length > 0) {
      squaresObjectsFromHistory = this.state.boardHistory.slice();
      squaresToHistory = squaresObjectsFromHistory[squaresObjectsFromHistory.length-1].squares.slice();

    } else {
      squaresToHistory = this.state.squares.slice();
    }

    squaresToHistory[i] = this.state.xIsNext ? 'X' : 'O';
  
    this.setState({
      boardHistory: [
        ...this.state.boardHistory, 
        {
          actualMoveNumber: this.state.boardHistory.length,
          boardHistoryPartNum: this.state.boardHistory.length-1,
          partNumber: this.state.boardHistory.length,
          clicked: this.clickedSquares.slice(),
          squares: squaresToHistory,
          xIsNext: this.state.xIsNext,
        }
      ],
      actualMoveNumber: this.state.boardHistory.length-1,
      squares: squares,
      xIsNext: !this.state.xIsNext,
    })
  }

 handleClickHistory(Event,i) {
  const boardHistoryPartNum = Event.target.closest('.history-item').getAttribute('historypart');
 
  const boardHistoryPart = this.state.boardHistory.slice()[boardHistoryPartNum];
  const newBoardHistory = this.state.boardHistory.slice(0, parseInt(boardHistoryPartNum)+1);
  this.clickedSquares = newBoardHistory[newBoardHistory.length-1].clicked.slice();

  this.setState({
    boardHistory: [...newBoardHistory],
    squares: boardHistoryPart.squares,
    xIsNext: !boardHistoryPart.xIsNext,
    actualMoveNumber: boardHistoryPart.actualMoveNumber,
  });
}

  render() {
    return (
      <div>
        <div className="game">
        <div className={'restart'}>
        <button
          className="restart-button"
          onClick={this.restartGame.bind(this)}
        >
          Restart
        </button>
          </div>
          <div className={'board-slider'}>
            <Slider 
              changeBoardSize={this.restartGame.bind(this)} 
            />
          </div>
          <div className="game-board">
            <Board
              boardSize={this.state.boardSize}
              winPatternLength={this.winPatternLength}
              actualMoveNumber = {this.state.boardHistory.length-1}
              currentFlag={true}
              squares={this.state.squares} 
              xIsNext={this.state.xIsNext}
              clicked={this.clickedSquares.slice()}
              onClick={this.handleClick.bind(this)}
            />
          </div>
          <div className="game-info">
          </div>
        </div>
        <div className="history-container">
          <div className="boards">
          
            <ShowHistory 
              boardSize={this.state.boardSize}
              winPatternLength={this.winPatternLength}
              history={this.state.boardHistory}
              onClick={this.handleClickHistory.bind(this)}
              historyBoardNumber={this.historyBoardNumber}
            />
          </div>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className={'title'}>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tic-Tac-Toe
          </a>
        </h1>
        <p className={'description'}>Hello, let's play!</p>
        <Game />
      </header>
    </div>
  );
}

export default App;