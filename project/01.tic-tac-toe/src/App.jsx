import { useState } from 'react'
import { Square } from './components/Square'
import { TURNS } from './constants/constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { Board } from './components/Board'

function App () {
  // Estado del tablero
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  // De quien es el turno - estado inicial X
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  // null es no hay ganador, false es que hay empate
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return
    // Modificar tablro
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // Cambiar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Guardar partida en localStorage
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    // chequear ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(() => {
        console.log(`Ganador: ${newWinner}`)
        return newWinner
      })
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // Empate
    }
  }
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>

      <Board board={board} updateBoard={updateBoard} />

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />

    </main>
  )
}

export default App
