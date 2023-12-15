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
  let cards = content.map(() => 1);

  content.forEach((line, i) => {
    const [left, right] = line.split('|');
    const leftNumbers = left.trim().split(/\s+/);
    const rightNumbers = right.trim().split(/\s+/);
  
    const matchingNumbers = leftNumbers.filter(number => rightNumbers.includes(number));
  
    for (let j = i + 1; j < Math.min(i + 1 + matchingNumbers.length, content.length); j++) {
      cards[j] += cards[i];
    }
  });
  
  console.log(cards.reduce((totalSum, card) => totalSum + card, 0));
};

part1();
part2();