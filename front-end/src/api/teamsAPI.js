const URL = 'http://localhost:8007/teams';
const URL2 = 'http://localhost:8007/team';

export async function getTeamList() {
  return (await fetch(URL)).json();
}

export async function getATeam(tla) {
  return (await fetch(`${URL2}/${tla}`)).json();
}

export async function editTeam(tla, dataForm) {
  await fetch(`http://localhost:8007/team/${tla}/edit`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(dataForm),
  });
}
