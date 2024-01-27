const fs = require('fs');

const content = fs.readFileSync('input.txt','utf8')
  .replace(/\r/g, "")
  .split("\n")

const H = content.length;
const W = content[0].length;
const O = Array(H).fill().map(() => Array(W).fill(0));

let ax = -1;
let ay = -1;
for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
        if (content[i].includes("S")) {
            ax = i;
            ay = content[i].indexOf("S");
        }
    }
}

const dirs = [[0, 1], [1, 0], [0, -1], [-1,0]];
const happy = ["-7J", "|LJ", "-FL", "|F7"];
const Sdirs = [];
for (let i = 0; i < 4; i++) {
    let pos = dirs[i];
    let bx = ax + pos[0];
    let by = ay + pos[1];
    if (bx >= 0 && bx <= H && by >= 0 && by <= W && happy[i].includes(content[bx][by])) {
        Sdirs.push(i);
    }
}

const transform = {
    "0-": 0,
    "07": 1,
    "0J": 3,
    "2-": 2,
    "2F": 1,
    "2L": 3,
    "1|": 1,
    "1L": 0,
    "1J": 2,
    "3|": 3,
    "3F": 0,
    "37": 2,
};

let curdir = Sdirs[0];
let cx = ax + dirs[curdir][0];
let cy = ay + dirs[curdir][1];
let ln = 1;

O[ax][ay] = 1;
while ([cx, cy].toString() !== [ax, ay].toString()) {
  O[cx][cy] = 1;
  ln += 1;
  curdir = transform[`${curdir}${content[cx][cy]}`];
  cx = cx + dirs[curdir][0];
  cy = cy + dirs[curdir][1];
}

function part1() {
  console.log(Math.floor(ln / 2));
}

function part2() {
  const Svalid = Sdirs.includes(3);
  let ct = 0;

  for (let i = 0; i < H; i++) {
      let inn = false;
      for (let j = 0; j < W; j++) {
          if (O[i][j]) {
              if ("|JL".includes(content[i][j]) || (content[i][j] === "S" && Svalid)) {
                  inn = !inn;
              }
          } else {
              ct += inn;
          }
      }
  }
  console.log(ct);
};

part1();
part2();