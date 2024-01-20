const fs = require('fs');

const numCardLabels = ['2', '3', '4', '5', '6', '7', '8', '9', 'T'];
const faceCardLabels = ['Q', 'K', 'A'];

const scoreHand = (cards, part) => {
  const buckets = {};
  let jokers = 0;

  for (const card of cards.split('')) buckets[card] = (buckets[card] || 0) + 1;
  if (part === 2) {
    jokers = buckets['J'] || 0;
    delete buckets['J'];
  }
  const [max = 0, second = 0] = [...Object.values(buckets)].sort((a, b) => b - a);
  return (max + jokers) * 3 + second;
};

const compareHands = ({ cards: a, score: scoreA }, { cards: b, score: score }) => {
  if (scoreA !== score) return scoreA - score;
  for (let i = 0; ; i++) {
    if (a[i] !== b[i]) {
      return a[i] - b[i];
    }
  }
};

function part1() {
  const content = fs.readFileSync('input.txt','utf8')
  .match(/[2-9TJQKA]{5} \d+/g)
  .map(hand => hand.split(/\s/))
  .map(([cards, bid]) => ({ cards: cards.split('').map(c => [...numCardLabels, 'J', ...faceCardLabels].indexOf(c)), bid: Number(bid), score: scoreHand(cards) }));

  console.log(
    content
      .sort(compareHands)
      .map(({ bid }, i) => bid * (i + 1))
      .reduce((sum, num) => sum + num),
  );
};

function part2() {
  const content = fs.readFileSync('input.txt','utf8')
  .match(/[2-9TJQKA]{5} \d+/g)
  .map(hand => hand.split(/\s/))
  .map(([cards, bid]) => ({ cards: cards.split('').map(c => ['J', ...numCardLabels, ...faceCardLabels].indexOf(c)), bid: Number(bid), score: scoreHand(cards, 2) }));

  console.log(
    content
      .sort(compareHands)
      .map(({ bid }, i) => bid * (i + 1))
      .reduce((sum, num) => sum + num),
  );
};

part1();
part2();