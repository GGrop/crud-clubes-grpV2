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

describe('check POST methods', () => {
  test('POST /new-team', async () => {
    const response = await request(baseURL)
      .post('/new-team')
      .field('name', 'roasario central')
      .field('tla', 'CARC')
      .field('country', 'argentina')
      .field('website', 'www.central.com')
      .field('founded', '1886')
      .attach('shield', '__tests__/file.fixture'); // attach your file
    const teamsLength = teamsFixture.length + 1;
    expect(response.statusCode).toBe(200);
    expect(response.body.dataTeams.length).toEqual(teamsLength);
  });
});
