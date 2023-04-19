function makeKey(key) {
  return `team-${key}`;
}

export function saveOnStorage(data, key) {
  localStorage.setItem(makeKey(key), JSON.stringify(data));
}

export function getTeamsList() {
  const teamsList = JSON.parse(localStorage.getItem(makeKey('List')));
  if (teamsList === null) {
    throw new Error('there are no teams in the storage yet');
  }
  return teamsList;
}

export function getATeam(TLA) {
  const team = JSON.parse(localStorage.getItem(makeKey(TLA)));
  if (team === null) {
    throw new Error('there isn´t a team in the storage yet');
  }
  return team;
}
