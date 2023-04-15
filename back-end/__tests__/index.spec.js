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
