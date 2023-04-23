export default function createEditableTeamCard(team) {
  document.querySelector('#src-edit-img').src = team.crestUrl;
  document.querySelector('#input-edit-name').value = team.name;
  document.querySelector('#input-edit-tla').value = team.tla;
  document.querySelector('#input-edit-tla').dataset.tla = team.tla;
  document.querySelector('#input-edit-address').value = team.address;
  document.querySelector('#input-edit-country').value = team.country;
  document.querySelector('#input-edit-website').value = team.website;
  document.querySelector('#input-edit-founded').value = team.founded;
}
