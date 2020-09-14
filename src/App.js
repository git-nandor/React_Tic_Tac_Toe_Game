import React from 'react';
import logo from './logo.svg';
import Board from './Modules/Board';
import ShowHistory from './Modules/ShowHistory'
import './App.css';

    // A létrehozott JSX element class-át módosíthatom?

class Game extends React.Component {
constructor (props) {
  super (props);
  this.clickedSquare = null;
  this.historyMoves = -3;

  this.state = {
    squares: Array(9).fill(null),
    xIsNext: true,
    boardHistory: []
  };
}

  handleClick(Event,i) {
    console.log('In handleClick',this.state.boardHistory.slice());
    this.checkState();

    let squaresObjectsFromHistory = [];
    let squaresToHistory = [];
    this.clickedSquare = i;
    
    const squares = this.state.squares.slice();
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
        partNumber: this.state.boardHistory.length,
        xIsNext: this.state.xIsNext,
        clicked: this.clickedSquare,
        squares: squaresToHistory,
        }
      ],
      squares: squares,
      xIsNext: !this.state.xIsNext,
    })
  }

 handleClickHistory(Event,i) {
  console.log('Volt',this.state.boardHistory.slice());

  const boardHistoryPartNum = Event.target.closest('.history-item').getAttribute('historypart');
  console.log('From ', this.state.boardHistory.length-1,  this.state.boardHistory[this.state.boardHistory.length-1].squares);
  console.log('Back to history ', boardHistoryPartNum, 'For:', this.state.boardHistory.slice()[boardHistoryPartNum].squares);
  
  const oldHist = (this.state.boardHistory.slice());
  console.log('Get a slice from old: ', oldHist);



  console.log('Setting new history...');

  this.setState({
    boardHistory: [{partNumber: 10, xIsNext: false, clicked: 110, squares: ["O", "O", "O", "O", "O", "O", "O", "O", "O"]},
      {partNumber: 11, xIsNext: false, clicked: 111, squares: ["LoL", null, null, null, null, null, null, null, null]},
      {partNumber: 12, xIsNext: false, clicked: 112, squares: ["LoL", null, null, null, null, null, null, null, null]}],
    squares: ["LoL", "LoL", "LoL", "LoL", "LoL", "LoL", "LoL", "LoL", "LoL"],
    xIsNext: false,
  });



    const boardHistoryPart = this.state.boardHistory.slice()[boardHistoryPartNum];
    console.log('Lett',this.state.boardHistory.slice());

    console.log('Calling HANDLECLICK for:',boardHistoryPart.clicked);
    this.handleClick(2);
    console.log('Lett after call handleClick',this.state.boardHistory.slice());


   const newHist = (this.state.boardHistory.slice());
   console.log('Get a slice from new: ', newHist);


 /*
   console.log('Volt',this.state.boardHistory.slice());

    const boardHistoryPartNum = Event.target.closest('.history-item').getAttribute('historypart');
    console.log('boardHistoryPartNum', boardHistoryPartNum);

    const boardHistoryPart = this.state.boardHistory.slice()[boardHistoryPartNum];
    console.log('boardHistoryPart squares', boardHistoryPart.squares);

    const newBoardHistory = this.state.boardHistory.slice(0, boardHistoryPartNum);
    console.log('newBoardHistory', newBoardHistory);
    
    this.setState({
      boardHistory: [...newBoardHistory],
      squares: boardHistoryPart.squares,
      xIsNext: !boardHistoryPart.xIsNext,
    });
  */


  /*
   const newHist = (this.state.boardHistory.slice());
   console.log('Get a slice from new: ', newHist);
   this.checkState();
  */
  }


  checkState(){
    const againNewHist = (this.state.boardHistory.slice());
    console.log('Get a slice AGAIN from new: ', againNewHist);
  }

  clearState() {
    console.log('Clearing');
    this.setState({
      boardHistory: [0],
      squares: [0],
      xIsNext: true,
    })
  }


  render() {
    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              currentFlag={true}
              squares={this.state.squares} 
              xIsNext={this.state.xIsNext}
              clicked={this.clickedSquare}
              onClick={(Event,i) => this.handleClick(Event,i)}
            />
          </div>
          <div className="game-info">
          </div>
        </div>
        <div className="history-container">
          <div className="boards">
          
            <ShowHistory 
              history={this.state.boardHistory}
              onClick={(Event,i) => this.handleClickHistory(Event,i)}
              historyMoves={this.historyMoves}
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



