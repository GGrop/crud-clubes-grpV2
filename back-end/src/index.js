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
    crestUrl: `${URL}/uploads/shields/${image}`,
  };
  return newTeam;
}

app.post('/new-team', upload.single('shield'), (req, res) => {
  try {
    const dataTeams = getTeams();
    const {
      name, tla, country, address, website, founded,
    } = req.body;
    const id = uuid();
    const image = req.file.filename;
    const newTeam = createNewTeam(
      name,
      tla,
      country,
      address,
      website,
      founded,
      image,
      id,
    );
    if (!newTeam) {
      throw new Error('a team with that TLA has already been created');
    } else {
      dataTeams.teams.push(newTeam);
      fs.writeFileSync(
        './data/teams.db.json',
        JSON.stringify(dataTeams.teams),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
      res.status(200).json({ dataTeams: getTeams() });
    }
  } catch (error) {
    res.status(400).json({
      message: `Something went wrong while getting teams: ${error.message}`,
    });
  }
});

app.get('/teams', (req, res) => {
  try {
    const dataTeams = getTeams();
    res.status(200).json({
      dataTeams,
    });
  } catch (error) {
    res.status(400).json({
      message: `Something went wrong while getting teams: ${error.message}`,
    });
  }
});

app.get('/team/:id', (req, res) => {
  try {
    const teamId = req.params.id;
    if (!teamId) {
      throw new Error('Id is wrong');
    }
    const dataTeams = getTeams();
    const myTeam = dataTeams.teams.find((team) => team.id == teamId);
    if (!myTeam) {
      throw new Error('That team does not exist');
    }
    res.status(200).json({ myTeam });
  } catch (error) {
    res.status(400).json({
      message: `Something went wrong while getting a team: ${error.message}`,
    });
  }
});

app.put('/reset-teams', (req, res) => {
  try {
    fs.writeFileSync(
      './data/teams.db.json',
      fs.readFileSync('./data/teams.json'),
      (err) => {
        if (err) {
          throw new Error(err);
        }
      },
    );
    res.status(200).json({ message: 'success reset', dataTeams: getTeams() });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Something went wrong while reset teams: ${error}` });
  }
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
