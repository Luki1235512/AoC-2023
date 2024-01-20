const fs = require('fs');

const content = fs.readFileSync('input.txt','utf8')
  .replace(/\r/g, "")
  .split("\n\n")
  .filter(line => line.trim() !== '');

const inst = Array.from(content[0]);
const conn = {};

content[1].split('\n').forEach((l) => {
  const a = l.split(' ')[0];
  const b = l.split('(')[1].split(',')[0];
  const c = l.split(' ')[3].split(')')[0];
  conn[a] = [b, c];
});

function solveSteps(start) {
  let pos = start;
  let idx = 0;

  while (!pos.endsWith('Z')) {
    const d = inst[idx % inst.length];
    pos = conn[pos][d === 'L' ? 0 : 1];
    idx += 1;
  }

  return idx;
}

function gcd(a, b) {
  return b === 0 ? a: gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}


function part1() {
  let pos = 'AAA';
  let idx = 0;
  
  while (pos !== 'ZZZ') {
    const d = inst[idx % inst.length];
    pos = conn[pos][d === 'L' ? 0 : 1];
    idx += 1;
  }
  
  console.log(idx);
}

function part2() {
  let ret = 1;

  for (const start in conn) {
    if (start.endsWith('A')) {
      ret = lcm(ret, solveSteps(start));
    }
  }

  console.log(ret);
};

part1();
part2();