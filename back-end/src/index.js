const express = require('express');

const app = express();

const PORT = '8007';

const fs = require('fs');

const multer = require('multer');

const upload = multer({ dest: './uploads/shields' });

app.use(express.json());
app.use(express.static(`${__dirname}/uploads`));

function getTeams() {
  const teams = JSON.parse(fs.readFileSync('./data/teams.db.json'));
  const teamsLength = teams.length;
  const dataTeams = {
    teams,
    length: teamsLength,
  };
  return dataTeams;
}

function createNewTeam(name, tla, country, adress, website, image, founded) {
  const dataTeams = getTeams();
  const isDuplicated = dataTeams.teams.find((team) => team.tla === tla.toUpperCase());
  let newTeam = {};
  if (isDuplicated) {
    return newTeam;
  }
  newTeam = {
    name,
    tla,
    area: {
      name: country,
    },
    adress,
    website,
    crestUrl: `/shields/${image}`,
    founded,
  };
  return newTeam;
}

app.post('/new-team', (req, res) => {
app.post('/new-team', upload.single('shield'), (req, res) => {
  const dataTeams = getTeams();
  const {
    name, tla, country, adress, website, founded,
  } = req.body;
  const newTeam = createNewTeam(name, tla, country, adress, website, founded, getTeams());
  const image = req.file.filename;
  console.log(image);
  const newTeam = createNewTeam(name, tla, country, adress, website, founded, image, getTeams());
  if (!newTeam) {
    console.log('mostrar error');
  } else {
    dataTeams.teams.push(newTeam);
    fs.writeFile('./data/teams.db.json', JSON.stringify(dataTeams.teams), (err) => {
      res.status(200).json({
        dataTeams: getTeams(),
      });
    });
  }
});
// bucle infinito en testing

app.get('/teams', (req, res) => {
  const dataTeams = getTeams();
  res.status(200).json({
    dataTeams,
  });
});

app.get('/', (req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
