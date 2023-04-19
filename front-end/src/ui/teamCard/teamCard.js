function createTeamCard(team) {
  const $cardContainer = document.createElement('div');
  $cardContainer.classList = 'card mt-4 mx-auto';
  $cardContainer.style = 'width: 18rem';

  const $img = document.createElement('img');
  $img.classList = 'card-img-top';
  $img.src = team.crestUrl;
  $img.alt = `shield of ${team.name}`;
  $cardContainer.appendChild($img);

  const $body = document.createElement('div');
  $body.classList = 'card-body';
  $cardContainer.appendChild($body);

  const $name = document.createElement('h5');
  $name.classList = 'card-tittle';
  $name.textContent = team.name;
  $body.appendChild($name);

  const $tla = document.createElement('p');
  $tla.classList = 'card-text';
  $tla.textContent = team.tla;
  $body.appendChild($tla);

  const $list = document.createElement('ul');
  $list.classList = 'list-group list-group-flush';
  $cardContainer.appendChild($list);

  const $country = document.createElement('li');
  $country.classList = 'list-group-item';
  $country.textContent = team.country;
  $list.appendChild($country);

  const $address = document.createElement('li');
  $address.classList = 'list-group-item';
  $address.textContent = team.address;
  $list.appendChild($address);

  const $webContainer = document.createElement('a');
  $webContainer.href = team.website;
  $list.appendChild($webContainer);

  const $web = document.createElement('li');
  $web.classList = 'list-group-item';
  $web.textContent = team.website;
  $webContainer.appendChild($web);

  const $foundedContainer = document.createElement('li');
  $foundedContainer.classList = 'list-group-item';
  $list.appendChild($foundedContainer);

  const $founded = document.createElement('p');
  $founded.textContent = `Founded: ${team.founded}`;
  $foundedContainer.appendChild($founded);

  const $buttonContainer = document.createElement('div');
  $buttonContainer.classList = 'card-body';
  $cardContainer.appendChild($buttonContainer);

  const $edit = document.createElement('button');
  $edit.classList = ' btn btn-primary mx-2';
  $edit.textContent = 'Edit';
  $buttonContainer.appendChild($edit);

  const $delete = document.createElement('button');
  $delete.classList = ' btn btn-danger mx-2';
  $delete.textContent = 'Delete';
  $buttonContainer.appendChild($delete);

  document.querySelector('#content').appendChild($cardContainer);
}
