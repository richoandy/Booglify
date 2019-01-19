const fs = require('fs')
eval(fs.readFileSync('./data.js') + '')

class BoggleBoard {
  constructor (row, col) {
    this.board = [ [ 'K', 'U', 'D' ], [ 'A', 'B', 'E' ], [ 'M', 'O', 'T' ] ]
    this.results = []
    this.counts = 0
    
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    
    // to generate random board
    function shake (row, col) {
      let rows = []
      for (let i = 0; i < row; i++) {
        let cols = []
        for (let j = 0; j < col; j++) {
          const randomAlphabet = String.fromCharCode(getRandomInt(65 , 91))
          cols.push(randomAlphabet)
        }
        rows.push(cols)
      }
      return rows
    }
  }

  isWord (str) {
    if (words.indexOf(str) === -1) {
      return false
    } else {
      return true
    }
  }

  isBorder (row, col) {
    if (row > -1 
      && row < this.board.length 
      && col > -1 
      && col < this.board[0].length) {
        return true
      } else {
        return false
      }
  }

  isVisitedYet (history, x, y) {
    if (history.indexOf(x + '-' + y) === -1) {
      return true
    } else {
      return false
    }
  }

  isValidCoord (coords, row, col) {
    if (this.isVisitedYet(coords, row, col) && this.isBorder(row, col)) {
      return true
    } else {
      return false
    }
  }

  boggle (history) { // to check every directions
    let word = ''
    this.counts++
    for (let i = 0; i < history.length; i++) {
      const xy = history[i].split('-')
      word += this.board[xy[0]][xy[1]]
    }

    if (this.isWord(word) && this.results.indexOf(word) === -1) {
      this.results.push(word)
    }

    const currXY = history[history.length - 1].split('-')
    let currX = currXY[0]
    let currY = currXY[1]
    const compass = [
      { x: -1, y: 0 }, // north
      { x: -1, y: +1 }, // north-east
      { x: 0, y: +1 }, // east
      { x: +1, y: +1 }, // south-east
      { x: +1, y: 0 }, // south
      { x: +1, y: -1 }, // south-west
      { x: 0, y: -1 }, // west
      { x: -1, y: -1 }, // north-west
    ]

    compass.forEach(data => {
      const newX = parseInt(currX) + data.x
      const newY = parseInt(currY) + data.y
      if(this.isValidCoord(history, newX, newY)) {
        this.boggle([...history, `${newX}-${newY}`])
      }
    })
    console.log(this.counts)
  }

  main () {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        const startPoint = [ `${i}-${j}` ] 
        this.boggle(startPoint)
      }
    }
    return this.results
  }
}

// runner
const game = new BoggleBoard()
game.main()
console.log(game)


