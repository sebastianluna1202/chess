
const squares = { 
    'a1' : [1, 1], 'a2' : [1, 2], 'a3' : [1, 3], 'a4' : [1, 4], 'a5' : [1, 5], 'a6' : [1, 6], 'a7' : [1, 7], 'a8' : [1, 8],
    'b1' : [2, 1], 'b2' : [2, 2], 'b3' : [2, 3], 'b4' : [2, 4], 'b5' : [2, 5], 'b6' : [2, 6], 'b7' : [2, 7], 'b8' : [2, 8],
    'c1' : [3, 1], 'c2' : [3, 2], 'c3' : [3, 3], 'c4' : [3, 4], 'c5' : [3, 5], 'c6' : [3, 6], 'c7' : [3, 7], 'c8' : [3, 8], 
    'd1' : [4, 1], 'd2' : [4, 2], 'd3' : [4, 3], 'd4' : [4, 4], 'd5' : [4, 5], 'd6' : [4, 6], 'd7' : [4, 7], 'd8' : [4, 8],
    'e1' : [5, 1], 'e2' : [5, 2], 'e3' : [5, 3], 'e4' : [5, 4], 'e5' : [5, 5], 'e6' : [5, 6], 'e7' : [5, 7], 'e8' : [5, 8],
    'f1' : [6, 1], 'f2' : [6, 2], 'f3' : [6, 3], 'f4' : [6, 4], 'f5' : [6, 5], 'f6' : [6, 6], 'f7' : [6, 7], 'f8' : [6, 8],
    'g1' : [7, 1], 'g2' : [7, 2], 'g3' : [7, 3], 'g4' : [7, 4], 'g5' : [7, 5], 'g6' : [7, 6], 'g7' : [7, 7], 'g8' : [7, 8],
    'h1' : [8, 1], 'h2' : [8, 2], 'h3' : [8, 3], 'h4' : [8, 4], 'h5' : [8, 5], 'h6' : [8, 6], 'h7' : [8, 7], 'h8' : [8, 8]
}
const letter = [
    'a', 'b', 'c', 'd', 
    'e', 'f', 'g', 'h'
]
const piecesClassList = [
    'whitesQueensRook',
    'whitesQueensKnight',
    'whitesQueensBishop',
    'whitesQueen',
    'whitesKing',
    'whitesKingsBishop',
    'whitesKingsKnight',
    'whitesKingsRook',
    'whitesAPawn',
    'whitesBPawn',
    'whitesCPawn',
    'whitesDPawn',
    'whitesEPawn',
    'whitesFPawn',
    'whitesGPawn', 
    'whitesHPawn',
    'blacksQueensRook',
    'blacksQueensKnight',
    'blacksQueensBishop',
    'blacksQueen',
    'blacksKing',
    'blacksKingsBishop',
    'blacksKingsKnight',
    'blacksKingsRook',
    'blacksAPawn',
    'blacksBPawn',
    'blacksCPawn',
    'blacksDPawn',
    'blacksEPawn',
    'blacksFPawn',
    'blacksGPawn', 
    'blacksHPawn'
]

const board = document.getElementById('chess-board')

const cleanBoard = () => {
    const squareBoard = document.querySelectorAll('.moves')
    squareBoard.forEach( square => square.classList.remove('moves'))
    const activePiece = document.querySelectorAll('.active')
    activePiece.forEach( square => square.classList.remove('active'))
    const capturePieces = document.querySelectorAll('.capturePiece')
    capturePieces.forEach( square => square.classList.remove('capturePiece'))
    const castleMoves = document.querySelectorAll('.castle')
    castleMoves.forEach( square => square.classList.remove('castle'))

}

const active = (event) => {
    if (event.target.classList.contains('active')) {
        cleanBoard()
    } else if (event.target.classList.contains('moves')) {
        let activeSquare = document.querySelector('.active')
        piecesClassList.forEach( piece => {
            if (activeSquare.classList.contains(piece)) {  
                pieces[piece].delete()
                pieces[piece].move(event.target.id)
                pieces[piece].create()
            }
        })
        newGame.movePiece()
        cleanBoard()
    } else if (event.target.classList.contains('capturePiece')) {
        piecesClassList.forEach( piece => {
            if (event.target.classList.contains(piece)) {
                pieces[piece].delete()
            }
        })
        let activeSquare = document.querySelector('.active')
        piecesClassList.forEach( piece => {
            if (activeSquare.classList.contains(piece)) {  
                pieces[piece].delete()
                pieces[piece].move(event.target.id)
                pieces[piece].create()
            }
        })
        newGame.movePiece()
        cleanBoard()        
    } else if (event.target.classList.contains('castle')) {
        let activeSquare = document.querySelector('.active')
        piecesClassList.forEach( piece => {
            if (activeSquare.classList.contains(piece)) {  
                pieces[piece].delete()
                pieces[piece].move(event.target.id)
                pieces[piece].create()
            }
        })
        if (event.target.id === 'g1') {
            whitesKingsRook.delete()
            whitesKingsRook.move('f1')
            whitesKingsRook.create()
        } else if (event.target.id === 'g8') {
            blacksKingsRook.delete()
            blacksKingsRook.move('f8')
            blacksKingsRook.create()
        } else if (event.target.id === 'c1') {
            whitesQueensRook.delete()
            whitesQueensRook.move('d1')
            whitesQueensRook.create()
        } else if (event.target.id === 'c8') {
            blacksQueensRook.delete()
            blacksQueensRook.move('d8')
            blacksQueensRook.create()
        }
        newGame.movePiece()
        cleanBoard()  
    } else {
        cleanBoard()
        piecesClassList.forEach( piece => {
            if (event.target.classList.contains(piece) && event.target.classList.contains(newGame.turn)) {
                pieces[piece].active()
                pieces[piece].showMoves() 
            }
        })
    }
}

const getKeyByValue = (position) => {
    let column = `${letter[`${position[0] - 1}`]}`
    let row = `${position[1]}`
    let key = `${column}${row}`
    return key
}

class Game {
    constructor() {
        this.turn = 'white'
    }
    movePiece() {
        switch (this.turn) {
            case 'white':
                this.turn = 'black'
            break
            case 'black':
                this.turn = 'white'
                break
            }
            switch (this.turn) {
                case 'white':
                    setTimeout(() => {board.classList.remove('reverse')}, 500)
            break
            case 'black':
                setTimeout(() => {board.classList.add('reverse')}, 500)  
                break
            }
        }
    startGame() {
        board.addEventListener('click', active)
    }
    endGame() {
        board.removeEventListener('click', active)
    }
}
class Piece {
    constructor(square, namePiece, color) {
        this.namePiece = namePiece
        this.position = squares[square]
        this.key = square
        this.square = document.getElementById(this.key)
        this.colorPiece = color
        this.moves = 0
    }
    create() {
        this.square.classList.add(this.namePiece)
        this.square.classList.add(this.colorPiece)
    }
    delete() {
        this.square.classList.remove(this.namePiece)
        this.square.classList.remove(this.colorPiece)
    }
    move(newPosition) {
        this.key = newPosition
        this.position = squares[this.key]
        this.square = document.getElementById(this.key)
        this.moves += 1
    }
    active() {
        this.square.classList.add('active')
    }
}
class Bishop extends Piece {
    constructor(square, namePiece, color) {
        super(square, namePiece, color)
    }
    showMoves() {
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        //cuadrante (- , -)
         while (true) {
            if (this.showColumn === 1 || this.showRow === 1 ){
                break
            }
            this.showColumn -= 1
            this.showRow -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white'){
                    if (this.showSquare.classList.contains('black')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.square.classList.contains('white')) {
                        break
                    }
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.showSquare.classList.contains('black')) {
                        break
                    }
                }
            }
            this.showSquare.classList.add('moves') 
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        // cuadrante (- , +)
        while (true) {
            if (this.showColumn === 1 || this.showRow === 8) {
                break
            }
            this.showColumn -= 1
            this.showRow += 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white'){
                    if (this.showSquare.classList.contains('black')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.square.classList.contains('white')) {
                        break
                    }
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.showSquare.classList.contains('black')) {
                        break
                    }
                }
            }
            this.showSquare.classList.add('moves')
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        //cuadrante (+ , -)
        while (true) {
            if (this.showColumn === 8 || this.showRow === 1) {
                break
            }
            this.showColumn += 1
            this.showRow -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white'){
                    if (this.showSquare.classList.contains('black')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.square.classList.contains('white')) {
                        break
                    }
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.showSquare.classList.contains('black')) {
                        break
                    }
                }
            }
            this.showSquare.classList.add('moves')
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        //cuadrante (+ , +)
        while (true) {
            if (this.showColumn === 8 || this.showRow === 8) {
                break
            }
            this.showColumn += 1
            this.showRow += 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white'){
                    if (this.showSquare.classList.contains('black')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.square.classList.contains('white')) {
                        break
                    }
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.showSquare.classList.contains('black')) {
                        break
                    }
                }
            }
            this.showSquare.classList.add('moves')
        }
    }
}
class Rook extends Piece {
    constructor(square, namePiece, color) {
        super(square, namePiece, color)
    }
    showMoves() {
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        //direction -x
         while (true) {
            if (this.showColumn === 1) {
                break
            }
            this.showColumn -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white'){
                    if (this.showSquare.classList.contains('black')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.square.classList.contains('white')) {
                        break
                    }
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.showSquare.classList.contains('black')) {
                        break
                    }
                }
            }
            this.showSquare.classList.add('moves') 
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        // direction y
        while (true) {
            if ( this.showRow === 8) {
                break
            }
            this.showRow += 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white'){
                    if (this.showSquare.classList.contains('black')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.square.classList.contains('white')) {
                        break
                    }
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.showSquare.classList.contains('black')) {
                        break
                    }
                }
            }
            this.showSquare.classList.add('moves')
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        //direction x 
        while (true) {
            if (this.showColumn === 8) {
                break
            }
            this.showColumn += 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white'){
                    if (this.showSquare.classList.contains('black')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.square.classList.contains('white')) {
                        break
                    }
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.showSquare.classList.contains('black')) {
                        break
                    }
                }
            }
            this.showSquare.classList.add('moves')
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        //direction -y
        while (true) {
            if (this.showRow === 1) {
                break
            }
            this.showRow -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white'){
                    if (this.showSquare.classList.contains('black')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.square.classList.contains('white')) {
                        break
                    }
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.showSquare.classList.contains('black')) {
                        break
                    }
                }
            }
            this.showSquare.classList.add('moves')
        }
    }
}
class Queen extends Piece {
    constructor(square, namePiece, color) {
        super(square, namePiece, color)
    }
    showMoves() {
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        //cuadrante (- , -)
         while (true) {
            if (this.showColumn === 1 || this.showRow === 1 ){
                break
            }
            this.showColumn -= 1
            this.showRow -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white'){
                    if (this.showSquare.classList.contains('black')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.square.classList.contains('white')) {
                        break
                    }
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.showSquare.classList.contains('black')) {
                        break
                    }
                }
            }
            this.showSquare.classList.add('moves') 
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        // cuadrante (- , +)
        while (true) {
            if (this.showColumn === 1 || this.showRow === 8) {
                break
            }
            this.showColumn -= 1
            this.showRow += 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white'){
                    if (this.showSquare.classList.contains('black')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.square.classList.contains('white')) {
                        break
                    }
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.showSquare.classList.contains('black')) {
                        break
                    }
                }
            }
            this.showSquare.classList.add('moves')
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        //cuadrante (+ , -)
        while (true) {
            if (this.showColumn === 8 || this.showRow === 1) {
                break
            }
            this.showColumn += 1
            this.showRow -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white'){
                    if (this.showSquare.classList.contains('black')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.square.classList.contains('white')) {
                        break
                    }
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.showSquare.classList.contains('black')) {
                        break
                    }
                }
            }
            this.showSquare.classList.add('moves')
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        //cuadrante (+ , +)
        while (true) {
            if (this.showColumn === 8 || this.showRow === 8) {
                break
            }
            this.showColumn += 1
            this.showRow += 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white'){
                    if (this.showSquare.classList.contains('black')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.square.classList.contains('white')) {
                        break
                    }
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.showSquare.classList.contains('black')) {
                        break
                    }
                }
            }
            this.showSquare.classList.add('moves')
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        //direction -x
         while (true) {
            if (this.showColumn === 1) {
                break
            }
            this.showColumn -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white'){
                    if (this.showSquare.classList.contains('black')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.square.classList.contains('white')) {
                        break
                    }
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.showSquare.classList.contains('black')) {
                        break
                    }
                }
            }
            this.showSquare.classList.add('moves') 
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        // direction y
        while (true) {
            if ( this.showRow === 8) {
                break
            }
            this.showRow += 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white'){
                    if (this.showSquare.classList.contains('black')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.square.classList.contains('white')) {
                        break
                    }
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.showSquare.classList.contains('black')) {
                        break
                    }
                }
            }
            this.showSquare.classList.add('moves')
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        //direction x 
        while (true) {
            if (this.showColumn === 8) {
                break
            }
            this.showColumn += 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white'){
                    if (this.showSquare.classList.contains('black')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.square.classList.contains('white')) {
                        break
                    }
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.showSquare.classList.contains('black')) {
                        break
                    }
                }
            }
            this.showSquare.classList.add('moves')
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        //direction -y
        while (true) {
            if (this.showRow === 1) {
                break
            }
            this.showRow -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white'){
                    if (this.showSquare.classList.contains('black')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.square.classList.contains('white')) {
                        break
                    }
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')){
                        this.showSquare.classList.add('capturePiece')
                        break
                    } else if (this.showSquare.classList.contains('black')) {
                        break
                    }
                }
            }
            this.showSquare.classList.add('moves')
        }
    }
}
class Knight extends Piece {
    constructor(square, namePiece, color) {
        super(square, namePiece, color)
    }
    showMoves() {
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        this.showRow += 2
        this.showColumn += 1
        if ( this.showRow <= 8 && this.showColumn <= 8) {
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white') {
                    if (this.showSquare.classList.contains('black')) {
                        this.showSquare.classList.add('capturePiece')
                    } 
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')) {
                        this.showSquare.classList.add('capturePiece')
                    }
                }
            } else {
                this.showSquare.classList.add('moves') 
            }
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        this.showRow += 2
        this.showColumn -= 1
        if ( this.showRow <= 8 && this.showColumn >= 1) {
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white') {
                    if (this.showSquare.classList.contains('black')) {
                        this.showSquare.classList.add('capturePiece')
                    } 
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')) {
                        this.showSquare.classList.add('capturePiece')
                    }
                }
            } else {
                this.showSquare.classList.add('moves') 
            }
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        this.showRow -= 2
        this.showColumn += 1
        if ( this.showRow >= 1 && this.showColumn <= 8) {
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white') {
                    if (this.showSquare.classList.contains('black')) {
                        this.showSquare.classList.add('capturePiece')
                    } 
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')) {
                        this.showSquare.classList.add('capturePiece')
                    }
                }
            } else {
                this.showSquare.classList.add('moves') 
            }
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        this.showRow -= 2
        this.showColumn -= 1
        if ( this.showRow >= 1 && this.showColumn >= 1) {
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white') {
                    if (this.showSquare.classList.contains('black')) {
                        this.showSquare.classList.add('capturePiece')
                    } 
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')) {
                        this.showSquare.classList.add('capturePiece')
                    }
                }
            } else {
                this.showSquare.classList.add('moves') 
            }
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        this.showColumn += 2
        this.showRow += 1
        if ( this.showRow <= 8 && this.showColumn <= 8) {
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white') {
                    if (this.showSquare.classList.contains('black')) {
                        this.showSquare.classList.add('capturePiece')
                    } 
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')) {
                        this.showSquare.classList.add('capturePiece')
                    }
                }
            } else {
                this.showSquare.classList.add('moves') 
            }
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        this.showColumn += 2
        this.showRow -= 1
        if ( this.showRow >= 1 && this.showColumn <= 8) {
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white') {
                    if (this.showSquare.classList.contains('black')) {
                        this.showSquare.classList.add('capturePiece')
                    } 
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')) {
                        this.showSquare.classList.add('capturePiece')
                    }
                }
            } else {
                this.showSquare.classList.add('moves') 
            }
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        this.showColumn -= 2
        this.showRow += 1
        if ( this.showRow <= 8 && this.showColumn >= 1) {
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white') {
                    if (this.showSquare.classList.contains('black')) {
                        this.showSquare.classList.add('capturePiece')
                    } 
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')) {
                        this.showSquare.classList.add('capturePiece')
                    }
                }
            } else {
                this.showSquare.classList.add('moves') 
            }
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        this.showColumn -= 2
        this.showRow -= 1
        if ( this.showRow >= 1 && this.showColumn >= 1) {
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                if (newGame.turn === 'white') {
                    if (this.showSquare.classList.contains('black')) {
                        this.showSquare.classList.add('capturePiece')
                    } 
                } else if (newGame.turn === 'black') {
                    if (this.showSquare.classList.contains('white')) {
                        this.showSquare.classList.add('capturePiece')
                    }
                }
            } else {
                this.showSquare.classList.add('moves') 
            }
        }
    }    
}
class Pawn extends Piece {
    constructor(square, namePiece, color) {
        super(square, namePiece, color)
    }
    showMoves() {
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        if (this.square.classList.contains('white')){
            this.showRow += 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('black') != true && this.showSquare.classList.contains('white') != true ) {
                this.showSquare.classList.add('moves')
            } 
            if (this.moves === 0) {
                this.showRow += 1
                this.valueSquare = [this.showColumn, this.showRow]
                this.keySquare = getKeyByValue(this.valueSquare)
                this.showSquare = document.getElementById(this.keySquare)
                if (this.showSquare.classList.contains('black') != true && this.showSquare.classList.contains('white') != true) {
                    this.showSquare.classList.add('moves')
                } 
            } 
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showColumn += 1
            this.showRow += 1
            if (this.showColumn <= 8) {
                this.valueSquare = [this.showColumn, this.showRow]
                this.keySquare = getKeyByValue(this.valueSquare)
                this.showSquare = document.getElementById(this.keySquare)
                if (this.showSquare.classList.contains('black')) {
                    this.showSquare.classList.add('capturePiece')
                }
            }
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showColumn -= 1
            this.showRow += 1
            if (this.showColumn >= 1) {
                this.valueSquare = [this.showColumn, this.showRow]
                this.keySquare = getKeyByValue(this.valueSquare)
                this.showSquare = document.getElementById(this.keySquare)
                if (this.showSquare.classList.contains('black')) {
                    this.showSquare.classList.add('capturePiece')
                }
            }
        } else {
            this.showRow -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if (this.showSquare.classList.contains('black') != true && this.showSquare.classList.contains('white') != true) {
                this.showSquare.classList.add('moves')
            }
            if (this.moves === 0) {
                this.showRow -= 1
                this.valueSquare = [this.showColumn, this.showRow]
                this.keySquare = getKeyByValue(this.valueSquare)
                this.showSquare = document.getElementById(this.keySquare)
                if (this.showSquare.classList.contains('black') != true && this.showSquare.classList.contains('white') != true) {
                    this.showSquare.classList.add('moves')
                }
            }
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showColumn -= 1
            this.showRow -= 1
            if (this.showColumn >= 1) {
                this.valueSquare = [this.showColumn, this.showRow]
                this.keySquare = getKeyByValue(this.valueSquare)
                this.showSquare = document.getElementById(this.keySquare)
                if (this.showSquare.classList.contains('white')) {
                    this.showSquare.classList.add('capturePiece')
                } 
            }
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showColumn += 1
            this.showRow -= 1
            if (this.showColumn <= 8) {
                this.valueSquare = [this.showColumn, this.showRow]
                this.keySquare = getKeyByValue(this.valueSquare)
                this.showSquare = document.getElementById(this.keySquare)
                if (this.showSquare.classList.contains('white')) { 
                    this.showSquare.classList.add('capturePiece')
                }
            }
        }
    } 
}
class King extends Piece {
    constructor(square, namePiece, color) {
        super(square, namePiece, color)
    }
    create() {
        this.square.classList.add(this.namePiece)
        this.square.classList.add(this.colorPiece)
        
        if (this.colorPiece === 'white') {
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showRow += 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.roundSquares = getKeyByValue(this.valueSquare)
            if (this.roundSquares in squares) {
                this.kingsRoundSquares = document.getElementById(this.roundSquares)
                this.kingsRoundSquares.classList.add('whitesKingsRoundSquare') 
            }
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showRow += 1
            this.showColumn += 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.roundSquares = getKeyByValue(this.valueSquare)
            if (this.roundSquares in squares) {
                this.kingsRoundSquares = document.getElementById(this.roundSquares)
                this.kingsRoundSquares.classList.add('whitesKingsRoundSquare') 
            }
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showColumn += 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.roundSquares = getKeyByValue(this.valueSquare)
            if (this.roundSquares in squares) {
                this.kingsRoundSquares = document.getElementById(this.roundSquares)
                this.kingsRoundSquares.classList.add('whitesKingsRoundSquare') 
            }
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showRow -= 1
            this.showColumn += 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.roundSquares = getKeyByValue(this.valueSquare)
            if (this.roundSquares in squares) {
                this.kingsRoundSquares = document.getElementById(this.roundSquares)
                this.kingsRoundSquares.classList.add('whitesKingsRoundSquare') 
            }
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showRow -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.roundSquares = getKeyByValue(this.valueSquare)
            if (this.roundSquares in squares) {
                this.kingsRoundSquares = document.getElementById(this.roundSquares)
                this.kingsRoundSquares.classList.add('whitesKingsRoundSquare') 
            }
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showRow -= 1
            this.showColumn -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.roundSquares = getKeyByValue(this.valueSquare)
            if (this.roundSquares in squares) {
                this.kingsRoundSquares = document.getElementById(this.roundSquares)
                this.kingsRoundSquares.classList.add('whitesKingsRoundSquare') 
            }
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showColumn -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.roundSquares = getKeyByValue(this.valueSquare)
            if (this.roundSquares in squares) {
                this.kingsRoundSquares = document.getElementById(this.roundSquares)
                this.kingsRoundSquares.classList.add('whitesKingsRoundSquare') 
            }
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showRow += 1
            this.showColumn -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.roundSquares = getKeyByValue(this.valueSquare)
            if (this.roundSquares in squares) {
                this.kingsRoundSquares = document.getElementById(this.roundSquares)
                this.kingsRoundSquares.classList.add('whitesKingsRoundSquare') 
            }
        } else {
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showRow += 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.roundSquares = getKeyByValue(this.valueSquare)
            if (this.roundSquares in squares) {
                this.kingsRoundSquares = document.getElementById(this.roundSquares)
                this.kingsRoundSquares.classList.add('blacksKingsRoundSquare') 
            }
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showRow += 1
            this.showColumn += 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.roundSquares = getKeyByValue(this.valueSquare)
            if (this.roundSquares in squares) {
                this.kingsRoundSquares = document.getElementById(this.roundSquares)
                this.kingsRoundSquares.classList.add('blacksKingsRoundSquare') 
            }
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showColumn += 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.roundSquares = getKeyByValue(this.valueSquare)
            if (this.roundSquares in squares) {
                this.kingsRoundSquares = document.getElementById(this.roundSquares)
                this.kingsRoundSquares.classList.add('blacksKingsRoundSquare') 
            }
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showRow -= 1
            this.showColumn += 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.roundSquares = getKeyByValue(this.valueSquare)
            if (this.roundSquares in squares) {
                this.kingsRoundSquares = document.getElementById(this.roundSquares)
                this.kingsRoundSquares.classList.add('blacksKingsRoundSquare') 
            }
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showRow -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.roundSquares = getKeyByValue(this.valueSquare)
            if (this.roundSquares in squares) {
                this.kingsRoundSquares = document.getElementById(this.roundSquares)
                this.kingsRoundSquares.classList.add('blacksKingsRoundSquare') 
            }
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showRow -= 1
            this.showColumn -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.roundSquares = getKeyByValue(this.valueSquare)
            if (this.roundSquares in squares) {
                this.kingsRoundSquares = document.getElementById(this.roundSquares)
                this.kingsRoundSquares.classList.add('blacksKingsRoundSquare') 
            }
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showColumn -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.roundSquares = getKeyByValue(this.valueSquare)
            if (this.roundSquares in squares) {
                this.kingsRoundSquares = document.getElementById(this.roundSquares)
                this.kingsRoundSquares.classList.add('blacksKingsRoundSquare') 
            }
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showRow += 1
            this.showColumn -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.roundSquares = getKeyByValue(this.valueSquare)
            if (this.roundSquares in squares) {
                this.kingsRoundSquares = document.getElementById(this.roundSquares)
                this.kingsRoundSquares.classList.add('blacksKingsRoundSquare') 
            }
        }
    }
    delete() {
        this.square.classList.remove(this.namePiece)
        this.square.classList.remove(this.colorPiece)
        
        if (newGame.turn === 'white') {
            const kingsRoundSquares = document.querySelectorAll('.whitesKingsRoundSquare')
            kingsRoundSquares.forEach( square => { square.classList.remove('whitesKingsRoundSquare')})
        } else {
            const kingsRoundSquares = document.querySelectorAll('.blacksKingsRoundSquare')
            kingsRoundSquares.forEach( square => { square.classList.remove('blacksKingsRoundSquare')})
        }
    }
    showMoves() { 
        if (this.moves === 0) {
            this.showColumn = this.position[0]
            this.showRow = this.position[1] 
            this.showColumn += 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.rightSquare1 = document.getElementById(this.keySquare)
            this.showColumn += 1 
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.rightSquare2 = document.getElementById(this.keySquare)
            this.showColumn = this.position[0]
            this.showRow = this.position[1]
            this.showColumn -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.leftSquare1 = document.getElementById(this.keySquare)
            this.showColumn -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.leftSquare2 = document.getElementById(this.keySquare)
            this.showColumn -= 1
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.leftSquare3 = document.getElementById(this.keySquare)
        }
        if (newGame.turn === 'white') {
            if (
            this.moves === 0 && 
            whitesKingsRook.moves === 0 &&
            this.rightSquare1.classList.contains('white') != true &&
            this.rightSquare2.classList.contains('white') != true &&
            this.rightSquare1.classList.contains('black') != true &&
            this.rightSquare2.classList.contains('black') != true &&
            isAtacked(squares[this.rightSquare1.id], this.colorPiece) != true &&
            isAtacked(squares[this.rightSquare2.id], this.colorPiece) != true
            ) {
                this.rightSquare2.classList.add('castle')
            }
            if (
            this.moves === 0 &&
            whitesQueensRook.moves === 0 &&
            this.leftSquare1.classList.contains('white') != true &&
            this.leftSquare2.classList.contains('white') != true &&
            this.leftSquare3.classList.contains('white') != true &&
            this.leftSquare1.classList.contains('black') != true &&
            this.leftSquare2.classList.contains('black') != true &&
            this.leftSquare3.classList.contains('black') != true &&
            isAtacked(squares[this.leftSquare1.id], this.colorPiece) != true &&
            isAtacked(squares[this.leftSquare2.id], this.colorPiece) != true 
            ) {
                this.leftSquare2.classList.add('castle')
            }
        } else {
            if (
            this.moves === 0 && 
            blacksKingsRook.moves === 0 &&
            this.rightSquare1.classList.contains('white') != true &&
            this.rightSquare2.classList.contains('white') != true &&
            this.rightSquare1.classList.contains('black') != true &&
            this.rightSquare2.classList.contains('black') != true &&
            isAtacked(squares[this.rightSquare1.id], this.colorPiece) != true &&
            isAtacked(squares[this.rightSquare2.id], this.colorPiece) != true
            ) {
                this.rightSquare2.classList.add('castle')
            }
            if (
            this.moves === 0 && 
            blacksQueensRook.moves === 0 &&
            this.leftSquare1.classList.contains('white') != true &&
            this.leftSquare2.classList.contains('white') != true &&
            this.leftSquare3.classList.contains('white') != true &&
            this.leftSquare1.classList.contains('black') != true &&
            this.leftSquare2.classList.contains('black') != true &&
            this.leftSquare3.classList.contains('black') != true &&
            isAtacked(squares[this.leftSquare1.id], this.colorPiece) != true &&
            isAtacked(squares[this.leftSquare2.id], this.colorPiece) != true
            ) {
                this.leftSquare2.classList.add('castle')
            }
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        this.showRow += 1
        if ( this.showRow <= 8) {
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if ( isAtacked(this.valueSquare, this.colorPiece) != true) {
                if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                    if (newGame.turn === 'white') {
                        if (this.showSquare.classList.contains('black')) {
                            this.showSquare.classList.add('capturePiece')
                        } 
                    } else if (newGame.turn === 'black') {
                        if (this.showSquare.classList.contains('white')) {
                            this.showSquare.classList.add('capturePiece')
                        }
                    }
                } else {
                    if (newGame.turn === 'white' && this.showSquare.classList.contains('blacksKingsRoundSquare') != true) {
                        this.showSquare.classList.add('moves') 
                    }
                    if (newGame.turn === 'black' && this.showSquare.classList.contains('whitesKingsRoundSquare') != true) {
                        this.showSquare.classList.add('moves') 
                    }
                }
            }
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        this.showRow += 1
        this.showColumn += 1
        if ( this.showRow <= 8 && this.showColumn <= 8) {
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if ( isAtacked(this.valueSquare, this.colorPiece) != true) {
                if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                    if (newGame.turn === 'white') {
                        if (this.showSquare.classList.contains('black')) {
                            this.showSquare.classList.add('capturePiece')
                        } 
                    } else if (newGame.turn === 'black') {
                        if (this.showSquare.classList.contains('white')) {
                            this.showSquare.classList.add('capturePiece')
                        }
                    }
                } else {
                    if (newGame.turn === 'white' && this.showSquare.classList.contains('blacksKingsRoundSquare') != true) {
                        this.showSquare.classList.add('moves') 
                    }
                    if (newGame.turn === 'black' && this.showSquare.classList.contains('whitesKingsRoundSquare') != true) {
                        this.showSquare.classList.add('moves') 
                    }
                }
            }
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        this.showColumn += 1
        if (this.showColumn <= 8) {
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if ( isAtacked(this.valueSquare, this.colorPiece) != true) {
                if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                    if (newGame.turn === 'white') {
                        if (this.showSquare.classList.contains('black')) {
                            this.showSquare.classList.add('capturePiece')
                        } 
                    } else if (newGame.turn === 'black') {
                        if (this.showSquare.classList.contains('white')) {
                            this.showSquare.classList.add('capturePiece')
                        }
                    }
                } else {
                    if (newGame.turn === 'white' && this.showSquare.classList.contains('blacksKingsRoundSquare') != true) {
                        this.showSquare.classList.add('moves') 
                    }
                    if (newGame.turn === 'black' && this.showSquare.classList.contains('whitesKingsRoundSquare') != true) {
                        this.showSquare.classList.add('moves') 
                    }
                }
            }
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        this.showRow -= 1
        this.showColumn += 1
        if ( this.showRow >= 1 && this.showColumn <= 8) {
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if ( isAtacked(this.valueSquare, this.colorPiece) != true) {
                if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                    if (newGame.turn === 'white') {
                        if (this.showSquare.classList.contains('black')) {
                            this.showSquare.classList.add('capturePiece')
                        } 
                    } else if (newGame.turn === 'black') {
                        if (this.showSquare.classList.contains('white')) {
                            this.showSquare.classList.add('capturePiece')
                        }
                    }
                } else {
                    if (newGame.turn === 'white' && this.showSquare.classList.contains('blacksKingsRoundSquare') != true) {
                        this.showSquare.classList.add('moves') 
                    }
                    if (newGame.turn === 'black' && this.showSquare.classList.contains('whitesKingsRoundSquare') != true) {
                        this.showSquare.classList.add('moves') 
                    }
                }
            }
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        this.showRow -= 1
        if ( this.showRow >= 1) {
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if ( isAtacked(this.valueSquare, this.colorPiece) != true) {
                if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                    if (newGame.turn === 'white') {
                        if (this.showSquare.classList.contains('black')) {
                            this.showSquare.classList.add('capturePiece')
                        } 
                    } else if (newGame.turn === 'black') {
                        if (this.showSquare.classList.contains('white')) {
                            this.showSquare.classList.add('capturePiece')
                        }
                    }
                } else {
                    if (newGame.turn === 'white' && this.showSquare.classList.contains('blacksKingsRoundSquare') != true) {
                        this.showSquare.classList.add('moves') 
                    }
                    if (newGame.turn === 'black' && this.showSquare.classList.contains('whitesKingsRoundSquare') != true) {
                        this.showSquare.classList.add('moves') 
                    }
                }
            }
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        this.showColumn -= 1
        this.showRow -= 1
        if ( this.showRow >= 1 && this.showColumn >= 1) {
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if ( isAtacked(this.valueSquare, this.colorPiece) != true) {
                if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                    if (newGame.turn === 'white') {
                        if (this.showSquare.classList.contains('black')) {
                            this.showSquare.classList.add('capturePiece')
                        } 
                    } else if (newGame.turn === 'black') {
                        if (this.showSquare.classList.contains('white')) {
                            this.showSquare.classList.add('capturePiece')
                        }
                    }
                } else {
                    if (newGame.turn === 'white' && this.showSquare.classList.contains('blacksKingsRoundSquare') != true) {
                        this.showSquare.classList.add('moves') 
                    }
                    if (newGame.turn === 'black' && this.showSquare.classList.contains('whitesKingsRoundSquare') != true) {
                        this.showSquare.classList.add('moves') 
                    }
                }
            }
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        this.showColumn -= 1
        if (this.showColumn >= 1) {
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if ( isAtacked(this.valueSquare, this.colorPiece) != true) {
                if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                    if (newGame.turn === 'white') {
                        if (this.showSquare.classList.contains('black')) {
                            this.showSquare.classList.add('capturePiece')
                        } 
                    } else if (newGame.turn === 'black') {
                        if (this.showSquare.classList.contains('white')) {
                            this.showSquare.classList.add('capturePiece')
                        }
                    }
                } else {
                    if (newGame.turn === 'white' && this.showSquare.classList.contains('blacksKingsRoundSquare') != true) {
                        this.showSquare.classList.add('moves') 
                    }
                    if (newGame.turn === 'black' && this.showSquare.classList.contains('whitesKingsRoundSquare') != true) {
                        this.showSquare.classList.add('moves') 
                    }
                }
            }
        }
        this.showColumn = this.position[0]
        this.showRow = this.position[1]
        this.showColumn -= 1
        this.showRow += 1
        if ( this.showRow <= 8 && this.showColumn >= 1) {
            this.valueSquare = [this.showColumn, this.showRow]
            this.keySquare = getKeyByValue(this.valueSquare)
            this.showSquare = document.getElementById(this.keySquare)
            if ( isAtacked(this.valueSquare, this.colorPiece) != true) {
                if (this.showSquare.classList.contains('white') || this.showSquare.classList.contains('black')) {
                    if (newGame.turn === 'white') {
                        if (this.showSquare.classList.contains('black')) {
                            this.showSquare.classList.add('capturePiece')
                        } 
                    } else if (newGame.turn === 'black') {
                        if (this.showSquare.classList.contains('white')) {
                            this.showSquare.classList.add('capturePiece')
                        }
                    }
                } else {
                    if (newGame.turn === 'white' && this.showSquare.classList.contains('blacksKingsRoundSquare') != true) {
                        this.showSquare.classList.add('moves') 
                    }
                    if (newGame.turn === 'black' && this.showSquare.classList.contains('whitesKingsRoundSquare') != true) {
                        this.showSquare.classList.add('moves') 
                    }
                }
            }
        }
    }
}

const isAtacked = (square, colorPiece) => {
    let turn = colorPiece
    let position = square
    let showColumn = position[0]
    let showRow = position[1]
    let isAtacked = false
    // calculate if a white pieces is attacked
    if (turn === 'white') {
        //calculate if a white piece is attacked by a pawn
        if (showColumn >= 2 && showRow <= 7) {
            showColumn -= 1
            showRow += 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('black')) {
                    if (
                        showSquare.classList.contains('blacksAPawn') ||
                        showSquare.classList.contains('blacksBPawn') || 
                        showSquare.classList.contains('blacksCPawn') || 
                        showSquare.classList.contains('blacksDPawn') || 
                        showSquare.classList.contains('blacksEPawn') || 
                        showSquare.classList.contains('blacksFPawn') || 
                        showSquare.classList.contains('blacksGPawn') || 
                        showSquare.classList.contains('blacksHPawn') 
                    ) {
                        isAtacked = true
                    }
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        if (showColumn <= 7 && showRow <= 7) {
            showColumn += 1
            showRow += 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('black')) {
                    if (
                        showSquare.classList.contains('blacksAPawn') ||
                        showSquare.classList.contains('blacksBPawn') || 
                        showSquare.classList.contains('blacksCPawn') || 
                        showSquare.classList.contains('blacksDPawn') || 
                        showSquare.classList.contains('blacksEPawn') || 
                        showSquare.classList.contains('blacksFPawn') || 
                        showSquare.classList.contains('blacksGPawn') || 
                        showSquare.classList.contains('blacksHPawn') 
                    ) {
                        isAtacked = true
                    }
                }
            }
        }
        //calculate if a white piece is attacked by a bishop or a queen
        showColumn = position[0]
        showRow = position[1]
         while (true) {
            if (showColumn === 1 || showRow === 1 ){
                break
            }
            showColumn -= 1
            showRow -= 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('black')) {
                    if (
                        showSquare.classList.contains('blacksKingsBishop') || 
                        showSquare.classList.contains('blacksQueensBishop') || 
                        showSquare.classList.contains('blacksQueen')
                    ) {
                        isAtacked = true
                    } else {
                        break
                    }
                } else if (showSquare.classList.contains('white')) {
                    break
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        while (true) {
            if (showColumn === 1 || showRow === 8) {
                break
            }
            showColumn -= 1
            showRow += 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('black')) {
                    if (
                        showSquare.classList.contains('blacksKingsBishop') || 
                        showSquare.classList.contains('blacksQueensBishop') || 
                        showSquare.classList.contains('blacksQueen')
                    ) {
                        isAtacked = true
                    } else {
                        break
                    }
                } else if (showSquare.classList.contains('white')) {
                    break
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        while (true) {
            if (showColumn === 8 || showRow === 1) {
                break
            }
            showColumn += 1
            showRow -= 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('black')) {
                    if (
                        showSquare.classList.contains('blacksKingsBishop') || 
                        showSquare.classList.contains('blacksQueensBishop') || 
                        showSquare.classList.contains('blacksQueen')
                    ) {
                        isAtacked = true
                    } else {
                        break
                    }
                } else if (showSquare.classList.contains('white')) {
                    break
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        while (true) {
            if (showColumn === 8 || showRow === 8) {
                break
            }
            showColumn += 1
            showRow += 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('black')) {
                    if (
                        showSquare.classList.contains('blacksKingsBishop') || 
                        showSquare.classList.contains('blacksQueensBishop') || 
                        showSquare.classList.contains('blacksQueen')
                    ) {
                        isAtacked = true
                    } else {
                        break
                    }
                } else if (showSquare.classList.contains('white')) {
                    break
                }
            }
        }
        //calculate if a white piece is attacked by a rook or a queen
        showColumn = position[0]
        showRow = position[1]
        while (true) {
            if (showColumn === 8){
                break
            }
            showColumn += 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('black')) {
                    if (
                        showSquare.classList.contains('blacksKingsRook') || 
                        showSquare.classList.contains('blacksQueensRook') || 
                        showSquare.classList.contains('blacksQueen')
                    ) {
                        isAtacked = true
                    } else {
                        break
                    }
                } else if (showSquare.classList.contains('white')) {
                    break
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        while (true) {
            if (showColumn === 1) {
                break
            }
            showColumn -= 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('black')) {
                    if (
                        showSquare.classList.contains('blacksKingsRook') || 
                        showSquare.classList.contains('blacksQueensRook') || 
                        showSquare.classList.contains('blacksQueen')
                    ) {
                        isAtacked = true
                    } else {
                        break
                    }
                } else if (showSquare.classList.contains('white')) {
                    break
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        while (true) {
            if (showRow === 1) {
                break
            }
            showRow -= 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('black')) {
                    if (
                        showSquare.classList.contains('blacksKingsRook') || 
                        showSquare.classList.contains('blacksQueensRook') || 
                        showSquare.classList.contains('blacksQueen')
                    ) {
                        isAtacked = true
                    } else {
                        break
                    }
                } else if (showSquare.classList.contains('white')) {
                    break
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        while (true) {
            if (showRow === 8) {
                break
            }
            showRow += 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('black')) {
                    if (
                        showSquare.classList.contains('blacksKingsRook') || 
                        showSquare.classList.contains('blacksQueensRook') || 
                        showSquare.classList.contains('blacksQueen')
                    ) {
                        isAtacked = true
                    } else {
                        break
                    }
                } else if (showSquare.classList.contains('white')) {
                    break
                }
            }
        }
        //calculate if a white piece is attacked by a knight
        showColumn = position[0]
        showRow = position[1]
        showRow += 2
        showColumn += 1
        if (showRow <= 8 && showColumn <= 8) {
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('black')) {
                    if (
                        showSquare.classList.contains('blacksKingsKnight') ||
                        showSquare.classList.contains('blacksQueensKnight')
                    ) {
                        isAtacked = true
                    } 
                } 
            }
        }
        showColumn = position[0]
        showRow = position[1]
        showRow += 2
        showColumn -= 1
        if (showRow <= 8 && showColumn >= 1) {
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('black')) {
                    if (
                        showSquare.classList.contains('blacksKingsKnight') ||
                        showSquare.classList.contains('blacksQueensKnight')
                    ) {
                        isAtacked = true
                    } 
                } 
            }
        }
        showColumn = position[0]
        showRow = position[1]
        showRow -= 2
        showColumn += 1
        if (showRow >= 1 && showColumn <= 8) {
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('black')) {
                    if (
                        showSquare.classList.contains('blacksKingsKnight') ||
                        showSquare.classList.contains('blacksQueensKnight')
                    ) {
                        isAtacked = true
                    } 
                }  
            }
        }
        showColumn = position[0]
        showRow = position[1]
        showRow -= 2
        showColumn -= 1
        if (showRow >= 1 && showColumn >= 1) {
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('black')) {
                    if (
                        showSquare.classList.contains('blacksKingsKnight') ||
                        showSquare.classList.contains('blacksQueensKnight')
                    ) {
                        isAtacked = true
                    } 
                } 
            }
        }
        showColumn = position[0]
        showRow = position[1]
        showRow += 1
        showColumn += 2
        if (showRow <= 8 && showColumn <= 8) {
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('black')) {
                    if (
                        showSquare.classList.contains('blacksKingsKnight') ||
                        showSquare.classList.contains('blacksQueensKnight')
                    ) {
                        isAtacked = true
                    } 
                } 
            }
        }
        showColumn = position[0]
        showRow = position[1]
        showRow -= 1
        showColumn += 2
        if (showRow >= 1 && showColumn <= 8) {
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('black')) {
                    if (
                        showSquare.classList.contains('blacksKingsKnight') ||
                        showSquare.classList.contains('blacksQueensKnight')
                    ) {
                        isAtacked = true
                    } 
                } 
            }
        }
        showColumn = position[0]
        showRow = position[1]
        showRow += 1
        showColumn -= 2
        if (showRow <= 8 && showColumn >= 1) {
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('black')) {
                    if (
                        showSquare.classList.contains('blacksKingsKnight') ||
                        showSquare.classList.contains('blacksQueensKnight')
                    ) {
                        isAtacked = true
                    } 
                } 
            }
        }
        showColumn = position[0]
        showRow = position[1]
        showRow -= 1
        showColumn -= 2
        if (showRow >= 1 && showColumn >= 1) {
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('black')) {
                    if (
                        showSquare.classList.contains('blacksKingsKnight') ||
                        showSquare.classList.contains('blacksQueensKnight')
                    ) {
                        isAtacked = true
                    } 
                }  
            }
        }
    } else {
        //calculate if a black piece is attacked by a pawn
        if (showColumn >= 2 && showRow >= 2) {
            showColumn -= 1
            showRow -= 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('white')) {
                    if (
                        showSquare.classList.contains('whitesAPawn') ||
                        showSquare.classList.contains('whitesBPawn') || 
                        showSquare.classList.contains('whitesCPawn') || 
                        showSquare.classList.contains('whitesDPawn') || 
                        showSquare.classList.contains('whitesEPawn') || 
                        showSquare.classList.contains('whitesFPawn') || 
                        showSquare.classList.contains('whitesGPawn') || 
                        showSquare.classList.contains('whitesHPawn') 
                    ) {
                        isAtacked = true
                    }
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        if (showColumn <= 7 && showRow >= 2) {
            showColumn += 1
            showRow -= 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('white')) {
                    if (
                        showSquare.classList.contains('whitesAPawn') ||
                        showSquare.classList.contains('whitesBPawn') || 
                        showSquare.classList.contains('whitesCPawn') || 
                        showSquare.classList.contains('whitesDPawn') || 
                        showSquare.classList.contains('whitesEPawn') || 
                        showSquare.classList.contains('whitesFPawn') || 
                        showSquare.classList.contains('whitesGPawn') || 
                        showSquare.classList.contains('whitesHPawn') 
                    ) {
                        isAtacked = true
                    }
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        //calculate if a black piece is attacked by a bishop or a queen
         while (true) {
            if (showColumn === 1 || showRow === 1 ){
                break
            }
            showColumn -= 1
            showRow -= 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('white')) {
                    if (
                        showSquare.classList.contains('whitesKingsBishop') || 
                        showSquare.classList.contains('whitesQueensBishop') || 
                        showSquare.classList.contains('whitesQueen')
                    ) {
                        isAtacked = true
                    } else {
                        break
                    }
                } else if (showSquare.classList.contains('black')) {
                    break
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        while (true) {
            if (showColumn === 1 || showRow === 8) {
                break
            }
            showColumn -= 1
            showRow += 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('white')) {
                    if (
                        showSquare.classList.contains('whitesKingsBishop') || 
                        showSquare.classList.contains('whitesQueensBishop') || 
                        showSquare.classList.contains('whitesQueen')
                    ) {
                        isAtacked = true
                    } else {
                        break
                    }
                } else if (showSquare.classList.contains('black')) {
                    break
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        while (true) {
            if (showColumn === 8 || showRow === 1) {
                break
            }
            showColumn += 1
            showRow -= 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('white')) {
                    if (
                        showSquare.classList.contains('whitesKingsBishop') || 
                        showSquare.classList.contains('whitesQueensBishop') || 
                        showSquare.classList.contains('whitesQueen')
                    ) {
                        isAtacked = true
                    } else {
                        break
                    }
                } else if (showSquare.classList.contains('black')) {
                    break
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        while (true) {
            if (showColumn === 8 || showRow === 8) {
                break
            }
            showColumn += 1
            showRow += 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('white')) {
                    if (
                        showSquare.classList.contains('whitesKingsBishop') || 
                        showSquare.classList.contains('whitesQueensBishop') || 
                        showSquare.classList.contains('whitesQueen')
                    ) {
                        isAtacked = true
                    } else {
                        break
                    }
                } else if (showSquare.classList.contains('black')) {
                    break
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        //calculate if a black piece is attacked by a rook or a queen
         while (true) {
            if (showColumn === 8){
                break
            }
            showColumn += 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('white')) {
                    if (
                        showSquare.classList.contains('whitesKingsRook') || 
                        showSquare.classList.contains('whitesQueensRook') || 
                        showSquare.classList.contains('whitesQueen')
                    ) {
                        isAtacked = true
                    } else {
                        break
                    }
                } else if (showSquare.classList.contains('black')) {
                    break
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        while (true) {
            if (showColumn === 1) {
                break
            }
            showColumn -= 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('white')) {
                    if (
                        showSquare.classList.contains('whitesKingsRook') || 
                        showSquare.classList.contains('whitesQueensRook') || 
                        showSquare.classList.contains('whitesQueen')
                    ) {
                        isAtacked = true
                    } else {
                        break
                    }
                } else if (showSquare.classList.contains('black')) {
                    break
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        while (true) {
            if (showRow === 1) {
                break
            }
            showRow -= 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('white')) {
                    if (
                        showSquare.classList.contains('whitesKingsRook') || 
                        showSquare.classList.contains('whitesQueensRook') || 
                        showSquare.classList.contains('whitesQueen')
                    ) {
                        isAtacked = true
                    } else {
                        break
                    }
                } else if (showSquare.classList.contains('black')) {
                    break
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        while (true) {
            if (showRow === 8) {
                break
            }
            showRow += 1
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (showSquare.classList.contains('white')) {
                    if (
                        showSquare.classList.contains('whitesKingsRook') || 
                        showSquare.classList.contains('whitesQueensRook') || 
                        showSquare.classList.contains('whitesQueen')
                    ) {
                        isAtacked = true
                    } else {
                        break
                    }
                } else if (showSquare.classList.contains('black')) {
                    break
                }
            }
        }
        //calculate if a white piece is attacked by a knight
        showColumn = position[0]
        showRow = position[1]
        showRow += 2
        showColumn += 1
        if (showRow <= 8 && showColumn <= 8) {
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (
                    showSquare.classList.contains('whitesKingsKnight') ||
                    showSquare.classList.contains('whitesQueensKnight')
                ) {
                    isAtacked = true
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        showRow += 2
        showColumn -= 1
        if (showRow <= 8 && showColumn >= 1) {
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (
                    showSquare.classList.contains('whitesKingsKnight') ||
                    showSquare.classList.contains('whitesQueensKnight')
                ) {
                    isAtacked = true
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        showRow -= 2
        showColumn += 1
        if (showRow >= 1 && showColumn <= 8) {
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (
                    showSquare.classList.contains('whitesKingsKnight') ||
                    showSquare.classList.contains('whitesQueensKnight')
                ) {
                    isAtacked = true
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        showRow -= 2
        showColumn -= 1
        if (showRow >= 1 && showColumn >= 1) {
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (
                    showSquare.classList.contains('whitesKingsKnight') ||
                    showSquare.classList.contains('whitesQueensKnight')
                ) {
                    isAtacked = true
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        showRow += 1
        showColumn += 2
        if (showRow <= 8 && showColumn <= 8) {
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (
                    showSquare.classList.contains('whitesKingsKnight') ||
                    showSquare.classList.contains('whitesQueensKnight')
                ) {
                    isAtacked = true
                }
            }
        }
        showColumn = position[0]
        showRow = position[1]
        showRow -= 1
        showColumn += 2
        if (showRow <= 8 && showColumn <= 8) {
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (
                    showSquare.classList.contains('whitesKingsKnight') ||
                    showSquare.classList.contains('whitesQueensKnight')
                ) {
                    isAtacked = true
                } 
            }
        }
        showColumn = position[0]
        showRow = position[1]
        showRow += 1
        showColumn -= 2
        if (showRow <= 8 && showColumn >= 1) {
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (
                    showSquare.classList.contains('whitesKingsKnight') ||
                    showSquare.classList.contains('whitesQueensKnight')
                ) {
                    isAtacked = true
                } 
            }
        }
        showColumn = position[0]
        showRow = position[1]
        showRow -= 1
        showColumn -= 2
        if (showRow >= 1 && showColumn >= 1) {
            let valueSquare = [showColumn, showRow]
            let keySquare = getKeyByValue(valueSquare)
            let showSquare = document.getElementById(keySquare)
            if (showSquare.classList.contains('white') || showSquare.classList.contains('black')) {
                if (
                    showSquare.classList.contains('whitesKingsKnight') ||
                    showSquare.classList.contains('whitesQueensKnight')
                ) {
                    isAtacked = true
                }
            }
        }
    }
    return isAtacked
}

let newGame = new Game()

let blacksQueensBishop = new Bishop('c8', 'blacksQueensBishop', 'black')
let blacksKingsBishop = new Bishop('f8', 'blacksKingsBishop', 'black')
let whitesQueensBishop = new Bishop('c1', 'whitesQueensBishop', 'white')
let whitesKingsBishop = new Bishop('f1', 'whitesKingsBishop', 'white')
let blacksQueensRook = new Rook('a8', 'blacksQueensRook', 'black')
let blacksKingsRook = new Rook('h8', 'blacksKingsRook', 'black')
let whitesQueensRook = new Rook('a1', 'whitesQueensRook', 'white')
let whitesKingsRook = new Rook('h1', 'whitesKingsRook', 'white')
let whitesQueen = new Queen('d1', 'whitesQueen', 'white')
let blacksQueen = new Queen('d8', 'blacksQueen', 'black')
let whitesKingsKnight = new Knight('g1', 'whitesKingsKnight', 'white')
let whitesQueensKnight = new Knight('b1' ,'whitesQueensKnight', 'white')
let blacksKingsKnight = new Knight('g8', 'blacksKingsKnight', 'black')
let blacksQueensKnight = new Knight('b8', 'blacksQueensKnight', 'black')
let whitesAPawn = new Pawn('a2', 'whitesAPawn', 'white')
let whitesBPawn = new Pawn('b2', 'whitesBPawn', 'white')
let whitesCPawn = new Pawn('c2', 'whitesCPawn', 'white')
let whitesDPawn = new Pawn('d2', 'whitesDPawn', 'white')
let whitesEPawn = new Pawn('e2', 'whitesEPawn', 'white')
let whitesFPawn = new Pawn('f2', 'whitesFPawn', 'white')
let whitesGPawn = new Pawn('g2', 'whitesGPawn', 'white')
let whitesHPawn = new Pawn('h2', 'whitesHPawn', 'white')
let blacksAPawn = new Pawn('a7', 'blacksAPawn', 'black')
let blacksBPawn = new Pawn('b7', 'blacksBPawn', 'black')
let blacksCPawn = new Pawn('c7', 'blacksCPawn', 'black')
let blacksDPawn = new Pawn('d7', 'blacksDPawn', 'black')
let blacksEPawn = new Pawn('e7', 'blacksEPawn', 'black')
let blacksFPawn = new Pawn('f7', 'blacksFPawn', 'black')
let blacksGPawn = new Pawn('g7', 'blacksGPawn', 'black')
let blacksHPawn = new Pawn('h7', 'blacksHPawn', 'black')
let whitesKing = new King('e1', 'whitesKing', 'white')
let blacksKing = new King('e8', 'blacksKing', 'black')

const printPiece = (piece) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(piece) , 40)
    })
}

const printBoard = async () => {
    await printPiece(blacksQueensRook).then(piece => piece.create())
    await printPiece(blacksQueensKnight).then(piece => piece.create())
    await printPiece(blacksQueensBishop).then(piece => piece.create())
    await printPiece(blacksQueen).then(piece => piece.create())
    await printPiece(blacksKing).then(piece => piece.create())
    await printPiece(blacksKingsBishop).then(piece => piece.create())
    await printPiece(blacksKingsKnight).then(piece => piece.create())
    await printPiece(blacksKingsRook).then(piece => piece.create())
    await printPiece(blacksAPawn).then(piece => piece.create())
    await printPiece(blacksBPawn).then(piece => piece.create())
    await printPiece(blacksCPawn).then(piece => piece.create())
    await printPiece(blacksDPawn).then(piece => piece.create())
    await printPiece(blacksEPawn).then(piece => piece.create())
    await printPiece(blacksFPawn).then(piece => piece.create())
    await printPiece(blacksGPawn).then(piece => piece.create())
    await printPiece(blacksHPawn).then(piece => piece.create())
    await printPiece(whitesAPawn).then(piece => piece.create())
    await printPiece(whitesBPawn).then(piece => piece.create())
    await printPiece(whitesCPawn).then(piece => piece.create())
    await printPiece(whitesDPawn).then(piece => piece.create())
    await printPiece(whitesEPawn).then(piece => piece.create())
    await printPiece(whitesFPawn).then(piece => piece.create())
    await printPiece(whitesGPawn).then(piece => piece.create())
    await printPiece(whitesHPawn).then(piece => piece.create())
    await printPiece(whitesQueensRook).then(piece => piece.create())
    await printPiece(whitesQueensKnight).then(piece => piece.create())
    await printPiece(whitesQueensBishop).then(piece => piece.create())
    await printPiece(whitesQueen).then(piece => piece.create())
    await printPiece(whitesKing).then(piece => piece.create())
    await printPiece(whitesKingsBishop).then(piece => piece.create())
    await printPiece(whitesKingsKnight).then(piece => piece.create())
    await printPiece(whitesKingsRook).then(piece => piece.create())
}

const playButton = document.querySelector('#play-button')
const inactiveBoard = document.querySelector('#inactive-board')
playButton.addEventListener('click', () => {
    setTimeout( () => printBoard(), 500)
    inactiveBoard.remove()
    newGame.startGame()
})

const pieces = {
    'blacksQueensBishop' : blacksQueensBishop,
    'blacksKingsBishop' : blacksKingsBishop,
    'whitesQueensBishop' : whitesQueensBishop,
    'whitesKingsBishop' : whitesKingsBishop,
    'blacksQueensRook' : blacksQueensRook,
    'blacksKingsRook' : blacksKingsRook,
    'whitesQueensRook' : whitesQueensRook,
    'whitesKingsRook' : whitesKingsRook,
    'whitesQueen' : whitesQueen,
    'blacksQueen' : blacksQueen,
    'whitesKingsKnight' : whitesKingsKnight,
    'whitesQueensKnight' : whitesQueensKnight,
    'blacksKingsKnight' : blacksKingsKnight,
    'blacksQueensKnight' : blacksQueensKnight,
    'whitesAPawn' : whitesAPawn,
    'whitesBPawn' : whitesBPawn,
    'whitesCPawn' : whitesCPawn,
    'whitesDPawn' : whitesDPawn,
    'whitesEPawn' : whitesEPawn,
    'whitesFPawn' : whitesFPawn,
    'whitesGPawn' : whitesGPawn,
    'whitesHPawn' : whitesHPawn,
    'blacksAPawn' : blacksAPawn,
    'blacksBPawn' : blacksBPawn,
    'blacksCPawn' : blacksCPawn,
    'blacksDPawn' : blacksDPawn,
    'blacksEPawn' : blacksEPawn,
    'blacksFPawn' : blacksFPawn,
    'blacksGPawn' : blacksGPawn,
    'blacksHPawn' : blacksHPawn,
    'whitesKing' : whitesKing,
    'blacksKing' : blacksKing
}




