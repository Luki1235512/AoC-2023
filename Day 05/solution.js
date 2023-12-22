const fs = require('fs');

const content = fs.readFileSync('input.txt','utf8')
  .replace(/\r/g, "")
  .split("\n")

function getMaps() {
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

  return maps;
}

function part1() {
  const seeds = content[0].replace("seeds: ", "").split(" ").map(Number);
  const maps = getMaps();

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

function getLocationOfSeed(seed) {
  const maps = getMaps();
  let loc = seed;

  for (const map of maps) {
    for (const assignment of map) {
      const [to, from, range] = assignment;

      if (loc >= from && loc <= from + range - 1) {
        loc = to + (loc - from)
        break;
      }
    }
  }
  return loc
}

function part2() {
  const seedRangePairs = content[0].replace("seeds: ", "").split(" ").map(Number);

  const pairs = []
  for (let i = 0; i < seedRangePairs.length; i += 2) {
    const seed = seedRangePairs[i];
    const range = seedRangePairs[i + 1];

    pairs.push([seed, seed + range - 1])
  }

  let minLocInPair = [];

  for (const pair of pairs) {
    const [seed1, seed2] = pair;
    let minLoc = Infinity;
    let minLocSeed = seed1;
    for (let i = seed1; i <= seed2; i += 50000) {
      const loc = getLocationOfSeed(i);
      if (loc < minLoc) {
        minLoc = loc;
        minLocSeed = i;
      }
    }

    minLocInPair.push([minLoc, minLocSeed, seed1, seed2]);
  }

  let minLoc = Infinity;
  let range = [0, 0, 0];
  for (const [loc, seed, seed1, seed2] of minLocInPair) {
    if (loc < minLoc) {
      minLoc = loc;
      range = [seed, seed1, seed2];
    }
  }

  let delta = 25000;
  let minSearch = Math.max(range[0] - delta, range[1]);
  let maxSearch = Math.min(range[0] + delta, range[2]);

  let minLocSeed = minSearch
  let minLocSeedLoc = Infinity;
  for (let i = minSearch; i <= maxSearch; i++) {
    const loc = getLocationOfSeed(i);
    if (loc < minLocSeedLoc) {
      minLocSeedLoc = loc;
      minLocSeed = i;
    }
  }

  console.log(getLocationOfSeed(minLocSeed));
};

part1();
part2();