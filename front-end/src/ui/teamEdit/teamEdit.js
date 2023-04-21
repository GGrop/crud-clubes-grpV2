export default function createEditableTeamCard(team, callbackEdit = () => {}) {
  const $cardContainer = document.createElement('form');
  $cardContainer.enctype = 'multipart/form-data';
  $cardContainer.onsubmit = (e) => callbackEdit(e, team.tla);
  $cardContainer.classList = 'new-team-form mt-4 p-4 mx-auto no-select';

  const $title = document.createElement('h1');
  $cardContainer.appendChild($title);

  const $shield = document.createElement('label');
  $cardContainer.appendChild($shield);

  const $imgContainer = document.createElement('div');
  $cardContainer.appendChild($imgContainer);

  const $img = document.createElement('img');
  $img.src = team.crestUrl;
  $img.classList = 'edit-shield mb-3';
  $imgContainer.appendChild($img);

  const $newImg = document.createElement('input');
  $newImg.type = 'file';
  $newImg.name = 'shield';
  $newImg.id = 'shield';
  $imgContainer.appendChild($newImg);

  const $body1Container = document.createElement('div');
  $cardContainer.appendChild($body1Container);

  const $name = document.createElement('label');
  $name.textContent = 'Name:';
  $body1Container.appendChild($name);

  const $inputName = document.createElement('input');
  $inputName.type = 'text';
  $inputName.value = team.name;
  $inputName.name = 'name';
  $inputName.classList = 'form-control';
  $body1Container.appendChild($inputName);

  const $body2Container = document.createElement('div');
  $cardContainer.appendChild($body2Container);

  const $tla = document.createElement('label');
  $tla.textContent = 'Tla:';
  $body2Container.appendChild($tla);

  const $inputTla = document.createElement('input');
  $inputTla.type = 'text';
  $inputTla.value = team.tla;
  $inputTla.name = 'tla';
  $inputTla.classList = 'form-control';
  $body2Container.appendChild($inputTla);

  const $body3Container = document.createElement('div');
  $cardContainer.appendChild($body3Container);

  const $country = document.createElement('label');
  $country.textContent = 'Country:';
  $body3Container.appendChild($country);

  const $inputCountry = document.createElement('input');
  $inputCountry.type = 'text';
  $inputCountry.value = team.country;
  $inputCountry.name = 'country';
  $inputCountry.classList = 'form-control';
  $body3Container.appendChild($inputCountry);

  const $body4Container = document.createElement('div');
  $cardContainer.appendChild($body4Container);

  const $address = document.createElement('label');
  $address.textContent = 'Address:';
  $body4Container.appendChild($address);

  const $inputAddress = document.createElement('input');
  $inputAddress.type = 'text';
  $inputAddress.value = team.address;
  $inputAddress.name = 'address';
  $inputAddress.classList = 'form-control';
  $body4Container.appendChild($inputAddress);

  const $body5Container = document.createElement('div');
  $cardContainer.appendChild($body5Container);

  const $website = document.createElement('label');
  $website.textContent = 'Website:';
  $body5Container.appendChild($website);

  const $inputWebsite = document.createElement('input');
  $inputWebsite.type = 'text';
  $inputWebsite.value = team.website;
  $inputWebsite.name = 'website';
  $inputWebsite.classList = 'form-control';
  $body5Container.appendChild($inputWebsite);

  const $body6Container = document.createElement('div');
  $cardContainer.appendChild($body6Container);

  const $founded = document.createElement('label');
  $founded.textContent = 'Founded:';
  $body6Container.appendChild($founded);

  const $inputFounded = document.createElement('input');
  $inputFounded.type = 'text';
  $inputFounded.value = team.founded;
  $inputFounded.name = 'founded';
  $inputFounded.classList = 'form-control';
  $body6Container.appendChild($inputFounded);

  const $submitButton = document.createElement('button');
  $submitButton.classList = 'btn btn-primary';
  $submitButton.type = 'submit';
  $submitButton.textContent = 'Submit';
  $cardContainer.appendChild($submitButton);
  const $backButton = document.createElement('button');
  $backButton.classList = 'btn btn-secondary';
  $backButton.textContent = 'Back';
  $cardContainer.appendChild($backButton);

  document.querySelector('#content').appendChild($cardContainer);
}
