const URL = 'http://localhost:8007/teams';
const URL2 = 'http://localhost:8007/team';

export async function getTeamList() {
  return (await fetch(URL)).json();
}

export async function getATeam(TLA) {
  return (await fetch(`${URL2}/${TLA}`)).json();
}
