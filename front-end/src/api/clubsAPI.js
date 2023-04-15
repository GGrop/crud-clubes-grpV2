const URL = 'http://localhost:8007/teams';

export async function getClubList() {
  await fetch(URL)
    .then((r) => r.json())
    .then((r) => console.log(r));
}

export async function getClub() {
  // (await fetch(URL)).json();
}
