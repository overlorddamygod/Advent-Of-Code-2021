const fs = require("fs")

fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split(",").map(x => +x);
    console.log(`Part 1: ${noOfFish1(data.slice())}`);
    console.log(`Part 2: ${noOfFish2(data.slice())}`);
});

// First approach using array. works for Part 1 but takes too much space for Part 2 and cannot be used.
const noOfFishAfterXDays = (timers, days) => {
    for ( let i = 0; i < days; i++ ) {
        let timersToAdd = []
        for ( let j = 0; j < timers.length; j++ ) {
            timers[j]--;
            if ( timers[j] < 0 ) {
                timers[j] = 6;
                timersToAdd.push(8)
            } 
        }
        timers = timers.concat(timersToAdd);
        // Visualizing 
        // let log = `After ${i+1} day: `;
        // console.log(log + timers.join(","))
    }
    return timers.length;
}

// Using object.
const noOfFishFast = (input, days) => {
    let timerFreqs = [0,1,2,3,4,5,6,7,8].reduce((acc,i)=>{
        acc[i] = 0;
        return acc;
    }, {})
    for ( day of input ) {
        timerFreqs[day]++;
    }
    for ( let i = 0; i < days; i++ ) {
        const timerCopy = {...timerFreqs}
        Object.keys(timerFreqs).map(day=> {
            day = +day;
            if (day == 0) {
                timerFreqs["8"] += timerCopy["0"]
                timerFreqs["6"] += timerCopy["0"];
                timerFreqs["0"] -= timerCopy["0"];
            } else {
                timerFreqs[day-1] += timerCopy[day];
                timerFreqs[day] -= timerCopy[day];
            }
        })
    }

    return Object.values(timerFreqs).reduce((acc,freq)=>acc+freq, 0);
}

// Part 1
const noOfFish1 = (input) => {
    return noOfFishFast(input, 80)
}

// Part 2
const noOfFish2 = (input) => {
    return noOfFishFast(input, 256)
}