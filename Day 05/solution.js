const fs = require('fs');

const content = fs.readFileSync('input.txt','utf8')
  .replace(/\r/g, "")
  .split("\n")

function part1() {
  const seeds = content[0].replace("seeds: ", "").split(" ").map(Number);

  const splits = [
    content.indexOf("seed-to-soil map:"),
    content.indexOf("soil-to-fertilizer map:"),
    content.indexOf("fertilizer-to-water map:"),
    content.indexOf("water-to-light map:"),
    content.indexOf("light-to-temperature map:"),
    content.indexOf("temperature-to-humidity map:"),
    content.indexOf("humidity-to-location map:"),
    content.length + 1
  ];

  const maps = splits.slice(0, -1).map((start, i) => {
    const end = splits[i + 1] - 1;
    const lines = content.slice(start + 1, end);
    return lines.map(line => line.split(" ").map(Number));
  });

  const locations = seeds.map(seed => {
    let loc = seed;

    for (const map of maps) {
      for (const [to, from, range] of map) {
        if (loc >= from && loc <= from + range - 1) {
          loc = to + (loc - from);
          break;
        }
      }
    }

    return loc;
  });

  console.log(Math.min(...locations));
}

function part2() {

};

part1();
part2();