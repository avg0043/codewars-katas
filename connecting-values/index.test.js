const connectedValues = require('.')

describe('Fixed tests', function () {
  let arr1 = [
    [0, 0, 0, 1, 3, 4, 0, 3],
    [0, 2, 0, 0, 2, 0, 0, 5],
    [0, 0, 0, 2, 0, 1, 1, 1],
    [2, 3, 4, 1, 3, 1, 0, 0],
    [0, 1, 5, 1, 6, 0, 2, 0],
    [2, 0, 2, 3, 1, 1, 1, 1],
    [2, 0, 2, 3, 1, 1, 1, 1],
  ]

  let arr2 = [
    [0, 0, 2, 2, 4, 6, 2, 5, 3],
    [1, 2, 1, 1, 2, 1, 1, 1, 3],
    [0, 0, 0, 3, 2, 3, 2, 2, 1],
    [4, 5, 5, 2, 5, 2, 1, 1, 3],
    [1, 3, 6, 3, 6, 0, 4, 1, 3],
    [2, 1, 2, 5, 2, 1, 1, 3, 3],
    [4, 1, 4, 3, 3, 3, 2, 3, 3],
    [2, 2, 4, 3, 2, 2, 3, 3, 1],
    [4, 2, 4, 3, 1, 1, 2, 1, 3],
  ]

  let arr3 = [
    [2, 1, 1, 2, 4, 4],
    [0, 1, 0, 1, 2, 0],
    [2, 0, 0, 1, 0, 1],
    [3, 4, 5, 1, 3, 1],
    [0, 2, 5, 1, 6, 0],
    [2, 3, 3, 4, 8, 2],
    [2, 1, 2, 4, 3, 2],
    [2, 1, 2, 4, 1, 3],
    [2, 2, 3, 2, 2, 6],
    [2, 0, 2, 3, 1, 1],
    [2, 0, 2, 3, 1, 1],
  ]

  test('Should return [] when arr at coord != val', function () {
    expect(connectedValues(copyArr(arr1), 0, [4, 2])).toEqual([])
    expect(connectedValues(copyArr(arr1), 3, [4, 2])).toEqual([])
    expect(connectedValues(copyArr(arr2), 4, [2, 2])).toEqual([])
    expect(connectedValues(copyArr(arr2), 6, [0, 7])).toEqual([])
    expect(connectedValues(copyArr(arr3), 2, [4, 2])).toEqual([])
    expect(connectedValues(copyArr(arr3), 6, [4, 2])).toEqual([])
  })

  test('Should return the correct array of coordinates with length == 1', function () {
    expect(connectedValues(copyArr(arr1), 2, [1, 1])).toEqual([[1, 1]])
    expect(connectedValues(copyArr(arr1), 4, [3, 2])).toEqual([[3, 2]])
    expect(connectedValues(copyArr(arr2), 3, [2, 5])).toEqual([[2, 5]])
    expect(connectedValues(copyArr(arr2), 4, [6, 0])).toEqual([[6, 0]])
    expect(connectedValues(copyArr(arr3), 8, [5, 4])).toEqual([[5, 4]])
    expect(connectedValues(copyArr(arr3), 0, [4, 0])).toEqual([[4, 0]])
  })

  test('Should return the correct array of coordinates with length > 1', function () {
    let ans1 = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 6],
      [1, 0],
      [1, 2],
      [1, 3],
      [1, 5],
      [1, 6],
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 4],
    ]
    expect(connectedValues(copyArr(arr1), 0, [0, 0]).sort()).toEqual(
      ans1.sort(),
    )

    let ans2 = [
      [3, 3],
      [4, 3],
      [5, 4],
      [5, 5],
      [5, 6],
      [5, 7],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
    ]
    expect(connectedValues(copyArr(arr1), 1, [6, 5]).sort()).toEqual(
      ans2.sort(),
    )

    let ans3 = [
      [3, 8],
      [4, 8],
      [5, 7],
      [5, 8],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 7],
      [6, 8],
      [7, 3],
      [7, 6],
      [7, 7],
      [8, 3],
      [8, 8],
    ]
    expect(connectedValues(copyArr(arr2), 3, [6, 4]).sort()).toEqual(
      ans3.sort(),
    )

    let ans4 = [
      [1, 2],
      [1, 3],
    ]
    expect(connectedValues(copyArr(arr2), 1, [1, 2]).sort()).toEqual(
      ans4.sort(),
    )

    let ans5 = [
      [10, 0],
      [10, 2],
      [4, 1],
      [5, 0],
      [6, 0],
      [6, 2],
      [7, 0],
      [7, 2],
      [8, 0],
      [8, 1],
      [8, 3],
      [8, 4],
      [9, 0],
      [9, 2],
    ]
    expect(connectedValues(copyArr(arr3), 2, [6, 2]).sort()).toEqual(
      ans5.sort(),
    )

    let ans6 = [
      [10, 4],
      [10, 5],
      [9, 4],
      [9, 5],
    ]
    expect(connectedValues(copyArr(arr3), 1, [9, 5]).sort()).toEqual(
      ans6.sort(),
    )
  })
})

function copyArr(arr) {
  return JSON.parse(JSON.stringify(arr))
}

function solution(m, n, [x, y]) {
  if (m[x][y] !== n) return []
  m = JSON.parse(JSON.stringify(m))
  let r = [[x, y]],
    z = -1
  m[x][y]++
  while (++z < r.length) {
    for (let i = -1, j = -1; i < 2; j < 1 ? j++ : ((j = -1), i++)) {
      let k = r[z][0] + i,
        l = r[z][1] + j
      if (
        k >= 0 &&
        k < m.length &&
        l >= 0 &&
        l < m[0].length &&
        m[k][l] === n
      ) {
        r.push([k, l])
        m[k][l]++
      }
    }
  }
  return r
}

const randint = (a, b) => a + ~~(Math.random() * (b - a + 1))

describe('Random tests', function () {
  test('Tests', function () {
    for (let i = 0; i < 100; i++) {
      let r = randint(1, 10),
        c = randint(1, 10),
        max = randint(3, 5)
      let m = Array.from({ length: r }, x =>
        Array.from({ length: c }, y => randint(1, max)),
      )
      let x = randint(1, r) - 1,
        y = randint(1, c) - 1
      let v = randint(1, 5) === 1 ? randint(1, max) : m[x][y]
      let result = solution(m, v, [x, y]).sort()
      let user = connectedValues(m, v, [x, y]).sort()
      expect(user).toEqual(result)
    }
  })
})
