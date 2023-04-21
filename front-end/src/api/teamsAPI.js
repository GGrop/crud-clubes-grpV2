const URL = 'http://localhost:8007';

export async function getTeamList() {
  return (await fetch(`${URL}/teams`)).json();
}

export async function getATeam(tla) {
  return (await fetch(`${URL}/team/${tla}`)).json();
}

export async function editTeam(tla, dataForm) {
  await fetch(`${URL}/team/${tla}/edit`, {
    method: 'PUT',
    body: dataForm,
  });
}

export async function resetTeams() {
  await fetch(`${URL}/reset-teams`, {
    method: 'PUT',
  });
}
