const fs = require("fs")
const parseInputToBoard = require("./bingoBoard");

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n").map(x => x.trim());
    console.log(`Part 1: ${bingo1(data.slice())}`);
    console.log(`Part 2: ${bingo2(data.slice())}`);
});

// Part 1
const bingo1 = (input) => {
    let { numbers, boards } = parseInputToBoard(input);

    let lastNumber = 1;
    let sum = 0;

    for ( let i = 0;  i < numbers.length; i++ ) {

        const num = numbers[i];

        let foundWin = false;

        for ( let j = 0; j < boards.length; j++ ) {

            const board = boards[j]
            board.mark(num);

            if ( board.checkWin() ) {
                lastNumber = num;
                sum = board.unmarkedSum();
                foundWin = true;
                break;
            }
        }

        if ( foundWin ) break;
    }

    return lastNumber * sum;
}

// Part 1
const bingo2 = (input) => {
    let { numbers, boards } = parseInputToBoard(input);

    let lastNumber = 1;
    let sum = 0;

    for ( let i = 0;  i < numbers.length; i++ ) {

        const num = numbers[i];
        let foundWin = false;

        for ( let j = 0; j < boards.length; j++ ) {

            const board = boards[j];
            board.mark(num);
            const won = board.checkWin();

            if ( won && boards.length == 1) {
                lastNumber = num;
                sum = board.unmarkedSum();
                foundWin = true;
                break;
            }
        }
        boards = boards.filter(board=> !board.won)
        if ( foundWin ) break;
    }

    return lastNumber * sum;
}