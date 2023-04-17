const URL = 'http://localhost:8007/teams';

export async function getClubList() {
  return (await fetch(URL)).json()
}

export async function getClub() {
  // (await fetch(URL)).json();
}
