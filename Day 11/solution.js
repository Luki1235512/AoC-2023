const fs = require('fs');

const content = fs.readFileSync('input.txt','utf8')
  .replace(/\r/g, "")
  // .split("\n")

const size = content.indexOf('\n');
let xx = Array(size).fill(0);
let yy = Array(size).fill(0);

Array.from(content).forEach((b, pos) => {
  if (b === '#') {
    xx[pos % (size + 1)] += 1;
    yy[Math.floor(pos / (size + 1))] += 1;
  }
});

function dist(counts, INC) {
  let gaps = 0;
  let sum = 0;
  let items = 0;
  let dist = 0;

  counts.forEach((count, i) => {
    if (count > 0) {
      let expanded = i + INC * gaps;
      dist += count * (items * expanded - sum);
      sum += count * expanded;
      items += count;
    } else {
      gaps += 1;
    }
  });
  return dist;
}

function part1() {
  const INC = 1;
  console.log(dist(xx, INC) + dist(yy, INC));
}

function part2() {
  const INC = 999999;
  console.log(dist(xx, INC) + dist(yy, INC));
};

part1();
part2();