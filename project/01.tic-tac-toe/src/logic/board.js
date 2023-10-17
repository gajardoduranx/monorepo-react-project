import { WINNER_COMBOS } from '../constants/constants'

export const checkWinnerFrom = (boardToCheck) => {
  // Revisamos las combinaciones ganadoras
  // para encontrar X u O
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  // si no hay ganador
  return null
}
export const checkEndGame = (newBoard) => {
  // Chequear que todas las posiciones esten ocupadas por x u o
  return newBoard.every(square => square !== null)
}
