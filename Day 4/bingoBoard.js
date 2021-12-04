class BingoBoard {
    constructor(board) {
        this.board = board;
    }

    checkWin() {
        for ( let i = 0; i < this.board.length; i++ ) {
            let rowMarkCount = 0;
            let colMarkCount = 0;
            for ( let j = 0; j < this.board.length; j++ ) {
                if ( this.board[i][j].marked ) rowMarkCount++;
                if ( this.board[j][i].marked ) colMarkCount++;
            }

            if ( rowMarkCount == 5 || colMarkCount == 5 ) {
                this.won = true;
                return true;
            }
        }
        this.won = false;
        return false;
    }

    mark(num) {
        for ( let i = 0; i < this.board.length; i++ ) {
            for ( let j = 0; j < this.board.length; j++ ) {
                if ( this.board[i][j].num == num ) {
                    this.board[i][j].marked = true;
                }
            }
        }
    }

    unmarkedSum() {
        return this.board.reduce((sum, row) => {
            const rowSum = row.reduce((colSum, col)=> {
                if ( !col.marked ) return colSum + col.num;
                return colSum
            }, 0)
            return sum + rowSum;
        },0)
    }
}

const parseInputToBoard = (input) => {
    const numbers = input.shift().split(",").map(d=>+d);

    let boards = input.filter(b=>b!="").reduce((boards, row, i)=> {
       
        const boardNo = parseInt(i / 5);

        if ( boards.length == boardNo ) {
            boards.push([])
        }

        boards[boardNo].push(row.split(" ").filter(n=>n!="").map(d=> ({
            num: +d,
            marked: false
        })))

        return boards;
    }, [])

    return { numbers, boards: boards.map(board=> new BingoBoard(board))  };
}

module.exports = parseInputToBoard;