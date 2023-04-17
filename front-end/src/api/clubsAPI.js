const URL = 'http://localhost:8007/teams';
const URL2 = 'http://localhost:8007/team';



export async function getClubList() {
  return (await fetch(URL)).json()
}

export async function getAClub(TLA) {
  return (await fetch(`${URL2}/${TLA}`)).json();
}
