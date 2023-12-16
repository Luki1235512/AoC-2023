const fs = require('fs');

const content = fs.readFileSync('input.txt','utf8')
  .replace(/\r/g, "")
  .split("\n");


function calculateDistance(held, remaining) {
  return remaining * held;
}

function part1() {
  const times = content[0].match(/\d+/g).map(Number);
  const records = content[1].match(/\d+/g).map(Number);

  const races = times.map((time, index) => [time, records[index]]);

  const numWays = races.map(([time, record]) => {
    let wins = 0;
    for (let i = 0; i <= time; i++) {
      if (calculateDistance(i, time - i) > record) {
        wins += 1;
      }
    }
    return wins;
  });

  console.log(numWays.reduce((x, y) => x * y));
}

function part2() {
  const time = content[0].split(":")[1].trim().replace(/\s/g, '');
  const record = content[1].split(":")[1].trim().replace(/\s/g, '');

  let wins = 0;
  for (let i = 0; i <= time; i++) {
    if (calculateDistance(i, time - i) > record) {
      wins += 1;
    }
  }

  console.log(wins);
};

part1();
part2();