const express = require('express');
const cors = require('cors');

const app = express();

const PORT = '8007';
const URL = 'http://localhost:8007';

const fs = require('fs');
const { v4: uuid } = require('uuid');

const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/shields');
  },
  filename(req, file, cb) {
    if (file) {
      const extension = file.originalname.split('.')[1];
      const nameFile = req.body.name.split(' ').join('-');
      cb(null, `${nameFile}-${Date.now()}.${extension}`);
    }
  },
});

const upload = multer({ storage });
app.use('/uploads', express.static('./uploads'));
app.use(cors());
app.use(express.json());

function getTeams() {
  const teams = JSON.parse(fs.readFileSync('./data/teams.db.json'));
  const teamsLength = teams.length;
  const dataTeams = {
    teams,
    length: teamsLength,
  };
  return dataTeams;
}

function createNewTeam(
  name,
  tla,
  country,
  address,
  website,
  founded,
  image,
  id,
) {
  const dataTeams = getTeams();
  const isDuplicated = dataTeams.teams.find((team) => team.tla === tla);
  let newTeam = {};
  if (isDuplicated) {
    return false;
  }
  newTeam = {
    id,
    name,
    tla,
    area: {
      name: country,
    },
    address,
    website,
    founded,
    crestUrl: `/shields/${image}`,
  };
  return newTeam;
}

app.post('/new-team', upload.single('shield'), (req, res) => {
  const dataTeams = getTeams();
  const {
    name, tla, country, address, website, founded,
  } = req.body;
  const image = req.file.filename;
  const newTeam = createNewTeam(name, tla, country, address, website, founded, image);
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

  const dataTeams = getTeams();
  const myTeam = dataTeams.teams.find((team) => team.tla === teamTla);
  res.status(200).json({
    myTeam,
  });
app.get('/team/:id', (req, res) => {
    const teamId = req.params.id;
});

app.put('/reset-teams', (req, res) => {
  // si escribimo fs.writeFileSync nunca me devuelve nada en postman, por eso uso fs.writeFile, aplica para TODAS
  fs.writeFile('./data/teams.db.json', fs.readFileSync('./data/teams.json'), (err) => {
    res.status(200).json({
      message: 'success reset',
      dataTeams: getTeams(),
    });
  });
});

  const {
    country, name, tla, address, website, founded,
  } = req.body;
  const dataTeams = getTeams();
  const myTeam = dataTeams.teams.find((team) => team.tla === teamTla);
  const newTeams = dataTeams.teams.filter((team) => team.tla !== teamTla);
  const editedTeam = {
    ...myTeam,
    area: {
      name: country,
    },
    name,
    tla: newTla,
    address,
    website,
    founded,
  };
  if (req.file) {
    editedTeam.crestUrl = `/shields/${req.file.filename}`;
  }
  newTeams.push(editedTeam);
  fs.writeFile('./data/teams.db.json', JSON.stringify(newTeams), (err) => {
    res.status(200).json({
      editedTeam,
    });
  });
app.put('/team/:id/edit', upload.single('shield'), (req, res) => {
    const teamId = req.params.id;
});

function deleteTeam(id) {
  const teams = getTeams();
  const index = teams.teams.findIndex((team) => team.id == id);
  if (index !== -1) {
    teams.splice(index, 1);
    fs.writeFileSync('./data/teams.db.json', JSON.stringify(teams));
    return true;
  }
  return false;
}

// hacer metodo delete y test
app.delete('/team/:tla/delete', (req, res) => {
  if (eliminado) {
    res.status(200).json({ message: 'The team has been deleted' });
  } else {
    res.status(404).json({ message: 'that team doesn´t exist' });
    const teamId = req.params.id;
    const isDeleted = deleteTeam(teamId);
  }
});

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
