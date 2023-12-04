const fs = require('fs');

const content = fs.readFileSync('input.txt','utf8')
  .replace(/\r/g, "")
  .split("\n");

function part1() {
  let sum = content.reduce((totalSum, card) => {
    const [left, right] = card.split('|');
    const leftNumbers = left.trim().split(/\s+/).map(Number);
    const rightNumbers = right.trim().split(/\s+/).map(Number);
  
    const matchingNumbers = leftNumbers.filter(number => rightNumbers.includes(number));

    let points = 0;

    if (matchingNumbers.length > 0) {
      points = Math.pow(2, matchingNumbers.length - 1);
    }

    return totalSum + points;
  }, 0);

  console.log(sum);
}

function part2() {

};

part1();
part2();