const fs = require('fs');

const content = fs.readFileSync('input.txt','utf8')
  .replace(/\r/g, "")
  .split("\n");

function part1() {
  const validGames = content
  .map(gameString => {
    const [gameNumber, setsString] = gameString.split(':').map(part => part.trim());

    const sets = setsString.split(';').map(set => set.trim());

    return {
      'Game ID': gameNumber.match(/\d+/)[0],
      'Sets': sets
    };
  })
  .filter(game => game.Sets.every(set => {
    const colors = {
      'red': 0,
      'green': 0,
      'blue': 0
    };

    set.split(',').forEach(item => {
      const [quantity, color] = item.trim().split(' ');
      colors[color] += parseInt(quantity, 10);
    });

    return colors.red <= 12 && colors.green <= 13 && colors.blue <= 14;
  }))
  .reduce((sum, game) => sum + parseInt(game['Game ID'], 10), 0);

  console.log(validGames);
}

function part2() {
  const powerOfSet = content.map(gameString => {
    const [gameNumber, setsString] = gameString.split(':').map(part => part.trim());

    const sets = setsString.split(';').map(set => set.trim());

    const colors = {
      'red': 0,
      'green': 0,
      'blue': 0
    };

    sets.forEach(set => {
      set.split(',').forEach(item => {
        const [quantity, color] = item.trim().split(' ');
        colors[color] = Math.max(colors[color], parseInt(quantity, 10));
      });
    });

    return {
      'Game ID': gameNumber.match(/\d+/)[0],
      'MaxColors': colors.blue * colors.red * colors.green
    };
  });

  console.log(powerOfSet.reduce((sum, entry) => sum + entry.MaxColors, 0));
};

part1();
part2();