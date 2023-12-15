const fs = require('fs');

const content = fs.readFileSync('input.txt','utf8')
  .replace(/\r/g, "")
  .split("\n");

function getChars() {
  const chars = {};

  for (let r = 0; r < 140; r++) {
    for (let c = 0; c < 140; c++) {
      if (
        r < content.length &&
        c < content[r].length &&
        !chars.hasOwnProperty(`${r},${c}`) &&
        !'01234566789.'.includes(content[r][c])
      ) {
        chars[`${r},${c}`] = [];
      }
    }
  }

  for (let r = 0; r < content.length; r++) {
    const row = content[r];
    const regex = /\d+/g;

    let match;
    while ((match = regex.exec(row)) !== null) {
      const start = match.index;
      const end = regex.lastIndex;
      const edge = new Set();

      for (let i = r - 1; i <= r + 1; i++) {
        for (let j = start - 1; j <= end; j++) {
          edge.add(`${i},${j}`);
        }
      }

      Object.keys(chars).forEach(o => {
        if (edge.has(o)) {
          chars[o].push(parseInt(match[0]));
        }
      });
    }
  }

  return chars;
}

function part1() {
  console.log(Object.values(getChars()).reduce((acc, p) => acc + p.reduce((s, n) => s + n, 0), 0));
}

function part2() {
  console.log(Object.values(getChars()).reduce((acc, p) => (p.length === 2) ? acc + p.reduce((s, n) => s * n, 1) : acc, 0));
};

part1();
part2();