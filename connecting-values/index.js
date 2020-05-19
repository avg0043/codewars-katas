const isInsideBoard = (x, y, board) =>
  x >= 0 && x <= board.length - 1 && y >= 0 && y <= board[0].length - 1

const getConnectedCoord = (x, y, board, targetVal) =>
  isInsideBoard(x, y, board) && board[x][y] === targetVal && [x, y]

const getConnectedCoords = (board, targetVal, actualCoord) => {
  const [x, y] = actualCoord
  const connectedCoords = [
    getConnectedCoord(x - 1, y, board, targetVal), // N
    getConnectedCoord(x - 1, y - 1, board, targetVal), // NW
    getConnectedCoord(x, y - 1, board, targetVal), // W
    getConnectedCoord(x + 1, y - 1, board, targetVal), // SW
    getConnectedCoord(x + 1, y, board, targetVal), // S
    getConnectedCoord(x + 1, y + 1, board, targetVal), // SE
    getConnectedCoord(x, y + 1, board, targetVal), // E
    getConnectedCoord(x - 1, y + 1, board, targetVal), // NE
  ]

  return connectedCoords.filter(coord => coord)
}

const deleteDuplicateCoords = coords => {
  let t
  return coords.filter(((t = {}), a => !(t[a] = a in t)))
}

const getAllConnectedCoords = (board, targetVal, initialConnectedCoords) => {
  let idxCoord = 0
  let connectedCoordsSize = initialConnectedCoords.length
  let connectedCoords = [...initialConnectedCoords]
  let actualCoord

  while (idxCoord < connectedCoordsSize) {
    actualCoord = connectedCoords[idxCoord]
    connectedCoords = [
      ...connectedCoords,
      ...getConnectedCoords(board, targetVal, actualCoord),
    ]
    connectedCoords = deleteDuplicateCoords(connectedCoords)
    connectedCoordsSize = connectedCoords.length

    idxCoord++
  }

  return connectedCoords
}

const connectedValues = (arr, val, coord) => {
  if (arr[coord[0]][coord[1]] !== val) return []

  const connectedCoords = [coord, ...getConnectedCoords(arr, val, coord)]

  return getAllConnectedCoords(arr, val, connectedCoords)
}

export default connectedValues
