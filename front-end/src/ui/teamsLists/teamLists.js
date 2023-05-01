function populateTable(team, index, callBackDetail = () => {}) {
  const $team = document.createElement('tr');

  const $tdIndex = document.createElement('td');
  $tdIndex.className = 'text-center align-middle index-list';
  $tdIndex.scope = 'row';
  $team.appendChild($tdIndex);
  const $index = document.createElement('h5');
  $index.textContent = index + 1;
  $tdIndex.appendChild($index);

  const $tdCrestUrl = document.createElement('td');
  $tdCrestUrl.className = 'text-center align-middle';
  $team.appendChild($tdCrestUrl);

  const $CrestUrl = document.createElement('img');
  $CrestUrl.className = 'list-img';
  $CrestUrl.src = team.crestUrl;
  $CrestUrl.alt = `shield of club ${team.name}`;
  $tdCrestUrl.appendChild($CrestUrl);

  const $tdName = document.createElement('td');
  $tdName.className = 'text-center align-middle';
  $team.appendChild($tdName);
  const $Name = document.createElement('h3');
  $Name.textContent = team.name;
  $tdName.appendChild($Name);

  const $tdCountry = document.createElement('td');
  $tdCountry.className = 'text-center align-middle';
  $team.appendChild($tdCountry);
  const $Country = document.createElement('h3');
  $Country.textContent = team.country;
  $tdCountry.appendChild($Country);

  const $tdDetail = document.createElement('td');
  $tdDetail.className = 'text-center align-middle';
  $team.appendChild($tdDetail);

  const $Detail = document.createElement('button');
  $Detail.className = 'btn btn-outline-dark';
  $Detail.type = 'button';
  $Detail.textContent = 'view';
  $Detail.onclick = () => callBackDetail(team.id);
  $tdDetail.appendChild($Detail);

  document.querySelector('#tbody').appendChild($team);
}

export default function CreateTeamList(teamsList, getATeam = () => {}) {
  document.querySelector('#teams-length').textContent = teamsList.total;
  teamsList.teams.map((team, index) => populateTable(team, index, getATeam));
}
