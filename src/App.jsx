import {useState} from 'react'
import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import Log from './components/Log.jsx'
import { WINNING_COMBINATIONS } from './components/winning-combinations.js'
import GameOver from './components/GameOver.jsx'

const initialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

// console.log('winning combination',WINNING_COMBINATIONS)

function deriveActivePlayer(gameTurns){
  let currentPlayer= "X";

  if (gameTurns.length>0 && gameTurns[0].player==='X'){
    currentPlayer='0'
  }
  return currentPlayer
}

function App() {
  const [gameTurns,setGameTurns]= useState([])
  const [players,setPlayers]= useState({
    X:"Player-1",
    0:"Player-2"
  })
  // const [activePlayer,setActivePlayer]= useState('X')

  const currentPlayer = deriveActivePlayer(gameTurns)
  
  const gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard,players)
  

  function deriveGameBoard(gameTurns){
    let gameBoard = [...initialGameBoard.map(array=>[...array])];
    for (const turn of gameTurns){
      const { square, player} =turn;
      const {row, col}=square;
      gameBoard[row][col]=player;
  }
    return gameBoard;
  }
  

  function deriveWinner(gameBoard,players){
    let winner;
    for (const combination of WINNING_COMBINATIONS){

      const firstSquareSymbol= gameBoard[combination[0].row][combination[0].column]
      const secSquareSymbol = gameBoard[combination[1].row][combination[1].column]
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
      if (firstSquareSymbol && firstSquareSymbol===secSquareSymbol && firstSquareSymbol===thirdSquareSymbol){

      winner = players[firstSquareSymbol];
      }
    }
    return winner;
  }
  
  const hasDraw = gameTurns.length===9 && !winner;
  
  function handleSelectSquare(rowIndex,colIndex){
    
    setGameTurns((prevTurns)=>{
      const currentPlayer = deriveActivePlayer(prevTurns)
      // if (prevTurns.length>0 && prevTurns[0].player==='X'){
      //   currentPlayer = '0';
      // }
      const updatedTurns=[{
        square:{row:rowIndex,col:colIndex}, player: currentPlayer},
        ...prevTurns
      ]
      return updatedTurns;
    })
  }
  function handleRestart(){
    setGameTurns([])
    // console.log('setGameTurns',setGameTurns)
    // console.log('gameBoard',gameBoard)
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers(prevPlayers=>{
      return {
        ...prevPlayers,
        [symbol]:newName
      }
    })
  }
  
  return (
    <main>
     <div id="game-container">
      <ol id="players" className='highlight-player'>
        <Player initialName="Player-1" symbol="X" isActive={currentPlayer === 'X'} onNameChange={handlePlayerNameChange}/>
        <Player initialName="Player-2" symbol="0" isActive={currentPlayer==='0'} onNameChange={handlePlayerNameChange}/>
      </ol>
      {(winner || hasDraw) && (<GameOver winner = {winner} restart= {handleRestart}/>) }
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
    
  )
}

export default App



