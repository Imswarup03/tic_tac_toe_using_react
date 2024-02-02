import Player from './components/Player.jsx'
function App() {
  return (
    <main>
     <div id="game-container">
      <ol id="players">
        <Player initialName="Swarup" symbol="x"/>
        <Player initialName="Ashutosh" symbol="0"/>
      </ol>
      GAME BOARD
      </div>
      LOG
    </main>
    
  )
}

export default App



