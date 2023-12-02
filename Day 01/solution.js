const fs = require('fs');

const content = fs.readFileSync('input.txt','utf8')
  .replace(/\r/g, "")
  .split("\n");

function part1() {
  const sum = content
    .map(elem => {
      const regexed = elem.replace(/[^\d.-]/g, '');
      const [firstNumber, lastNumber] = [regexed.charAt(0), regexed.slice(-1)];
      return Number(`${firstNumber}${lastNumber}`);
    })
    .reduce((acc, curr) => acc + curr, 0);

  console.log(sum)
}

const convertWordToNumber = word => {
  const wordToNumberMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };
  return wordToNumberMap[word] || parseInt(word, 10) || 0;
};

const isValidWord = word => /^(one|two|three|four|five|six|seven|eight|nine|\d)$/.test(word);

const part2 = () => {
  const sum = content.reduce((acc, elem) => {
    const result = [];

    for (let i = 0; i < elem.length; i++) {
      for (let j = i + 1; j <= i + 5 && j <= elem.length; j++) {
        const nextFiveCharacters = elem.substring(i, j);
        result.push(nextFiveCharacters);
      }
    }

    const splitString = result.filter(isValidWord);
    const firstNumber = convertWordToNumber(splitString[0]);
    const secondNumber = convertWordToNumber(splitString[splitString.length - 1]);
    const merged = String(firstNumber) + String(secondNumber);

    return acc + Number(merged);
  }, 0);

  console.log(sum);
};

part1();
part2();