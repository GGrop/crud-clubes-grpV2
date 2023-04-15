const request = require('supertest');
const teamFixtureARS = require('./team.fixture.json');
const teamsFixtureDb = require('../data/teams.db.json');
const TEAM_FIXTURE = require('../data/teams.json');

const baseURL = 'http://localhost:8007';


afterEach(async () => {
  await request(baseURL).put('/reset-teams');
});
describe(' GET /teams', () => {
  test('should respond with a 200 status code and a list of teams', async () => {
    const response = await request(baseURL).get('/teams').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.dataTeams.teams).toEqual(TEAM_FIXTURE);
    expect(response.body.dataTeams.length).toEqual(TEAM_FIXTURE.length);
  });
});

describe(' GET /team/:tla', () => {
  test('should respond with a 200 status code and a one team', async () => {
    const response = await request(baseURL).get('/team/ARS').send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(teamFixtureARS);
  });
});

describe('POST /new-team', () => {
  test('should respond with a 200 code and length + 1', async () => {
    const response = await request(baseURL)
      .post('/new-team')
      .field('name', 'roasario central')
      .field('tla', 'CARC')
      .field('country', 'argentina')
      .field('address', 'mitre y pasco')
      .field('website', 'www.central.com')
      .field('founded', '1886')
      .attach('shield', '__tests__/file.fixture'); // attach your file
    const teamsLength = teamsFixtureDb.length + 1;
    expect(response.statusCode).toBe(200);
    expect(response.body.dataTeams.length).toEqual(teamsLength);
  });
});

describe('PUT /reset-teams', () => {
  test('should respond with a 200 status code and return the orignal list of teams', async () => {
    const response = await request(baseURL).put('/reset-teams');
    expect(response.statusCode).toBe(200);
    expect(response.body.dataTeams.teams).toEqual(TEAM_FIXTURE);
  });
});

describe('PUT /team/:tla/edit', () => {
  test('should respond with a 200 status code and return a edited team', async () => {
    const response = await request(baseURL)
      .put('/team/ARS/edit')
      .field('name', 'rosario central')
      .field('tla', 'CARC')
      .field('country', 'argentina')
      .field('address', 'mitre y pasco')
      .field('website', 'www.central.com')
      .field('founded', '1886')
      .attach('shield', '__tests__/file.fixture'); // attach your file
    expect(response.statusCode).toBe(200);
    expect(response.body.editedTeam).toMatchObject({ name: 'rosario central' });
    expect(response.body.editedTeam).toMatchObject({ clubColors: 'Red / White' });
  });
});
