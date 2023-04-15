const request = require('supertest');
const teamsFixture = require('../data/teams.db.json');

const baseURL = 'http://localhost:8007';

describe(' GET /teams', () => {
  test('should responde with a 200 status code and a list of teams', async () => {
    const response = await request(baseURL).get('/teams').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.dataTeams.teams).toEqual(teamsFixture);
    expect(response.body.dataTeams.length).toEqual(teamsFixture.length);
  });
});

describe(' POST /new-team', () => {
  test('should responde with a 200 status code and create a team', async () => {
    const newTeam = {
      name: 'Rosario central',
      tla: 'cars',
      country: 'Argentina',
      adress: 'Pte. Roca 1500',
      website: 'www.central.com',
      founded: '1886',
    };
    const teamsLength = teamsFixture.length + 1;
    const response = await request(baseURL).post('/new-team').send(newTeam);
    expect(response.statusCode).toBe(200);
    expect(response.body.dataTeams.length).toEqual(teamsLength);
  });
});
