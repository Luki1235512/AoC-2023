const fs = require('fs');

const content = fs.readFileSync('input.txt','utf8')
  .replace(/\r/g, "")
  .split("\n")
  .map(line => line.split(' ').map(Number));

function n(l) {
  if (l.filter(i => i !== 0).length === 0) {
    return 0;
  }
    
  let m = [];
  for (let i = 0; i < l.length - 1; i++) {
    m.push(l[i + 1] - l[i]);
  }
    
  return l[l.length - 1] + n(m);
}

function part1() {
  console.log(content.map(i => n(i)).reduce((a, b) => a + b, 0));
}

function part2() {
  console.log(content.map(i => n(i.slice().reverse())).reduce((a, b) => a + b, 0));
};

part1();
part2();