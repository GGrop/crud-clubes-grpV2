const URL = 'http://localhost:8007';

export async function getTeamList() {
  return (await fetch(`${URL}/teams`)).json();
}

export async function getATeam(id) {
  return (await fetch(`${URL}/team/${id}`)).json();
}

export async function editTeam(id, dataForm) {
  await fetch(`${URL}/team/${id}/edit`, {
    method: 'PUT',
    body: dataForm,
  });
}

export async function resetTeams() {
  await fetch(`${URL}/reset-teams`, {
    method: 'PUT',
  });
}

export async function deleteTeam(id) {
  await fetch(`${URL}/team/${id}/delete`, {
    method: 'DELETE',
  });
}

export async function createTeam(dataForm) {
  await fetch(`${URL}/new-team`, {
    method: 'POST',
    body: dataForm,
  });
}
