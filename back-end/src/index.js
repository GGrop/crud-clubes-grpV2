const express = require('express');

const app = express();

const PORT = '8007';
<<<<<<< Updated upstream
=======

const fs = require('fs');

function getTeams() {
  const teams = JSON.parse(fs.readFileSync('./data/teams.db.json'));
  const teamsLength = teams.length;
  const dataTeams = {
    teams,
    length: teamsLength,
  };
  return dataTeams;
}

app.get('/teams', (req, res) => {
  const dataTeams = getTeams();
  res.status(200).json({
    dataTeams,
  });
});

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
>>>>>>> Stashed changes
