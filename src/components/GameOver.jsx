export default function GameOver({winner,restart}){
    console.log('rematch',restart)
    return(
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner && <p>Winner is {winner}</p>}
            {!winner && <p>The match has drawn</p>}
            
            <p><button onClick={restart}>Rematch</button></p>
        </div>
    )
}