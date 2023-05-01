export default function createTeamCard(team) {
  document.querySelector('#content-team').dataset.id = team.id;
  document.querySelector('#src-team-img').src = team.crestUrl;
  document.querySelector('#label-team-name').textContent = team.name;
  document.querySelector('#label-team-tla').textContent = team.tla.toUpperCase();
  document.querySelector('#label-team-address').textContent = team.address;
  document.querySelector('#label-team-country').textContent = team.country;
  document.querySelector('#label-team-website').textContent = team.website;
  document.querySelector('#label-team-founded').textContent = team.founded;
}
