const fs = require('fs');

// Exemplo de atualização dos dados
const data = {
  standings: {
    "Itália": { points: 6, games: 2, wins: 2, draws: 0, losses: 0 },
    "Portugal": { points: 3, games: 2, wins: 1, draws: 0, losses: 1 }
  },
  matches: [
    { round: 1, team1: "Itália", team2: "Portugal", score1: 2, score2: 1 }
  ]
};

// Salva os dados no arquivo data.json
fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
console.log('Arquivo dados.json atualizado!');
