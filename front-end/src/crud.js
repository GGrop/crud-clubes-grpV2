import { getATeam, getTeamsList } from './services/teamsServices.js';
import { handleLoading } from './ui/loading/loading.js';
import showTeamList from './ui/teamsLists/teamLists.js';
import createTeamCard from './ui/teamCard/teamCard.js';
import createEditableTeamCard from './ui/teamEdit/teamEdit.js';
import { editTeam as editTeamApi } from './api/teamsAPI.js';
import { showAlert } from './ui/alerts/alerts.js';
// export async function  initialization () {
//   const data = await getATeam("ARS")
//   console.log(data)
//   const data2= await getTeamsList()
//   console.log(data2)
// }

function removeContent() {
  document.querySelector('#content').innerHTML = '';
}

async function handleDelete(tla) {
  console.log('I should delete', tla);
}

async function handleEdition(tla) {
  removeContent();
  createEditableTeamCard(await getATeam(tla), editTeam);
}

async function handleTeam(tla) {
  removeContent();
  handleLoading(true);
  await createTeamCard(await getATeam(tla), handleEdition, handleDelete);
  handleLoading(false);
}

async function handleTeamList() {
  removeContent();
  handleLoading(true);
  await showTeamList(await getTeamsList(), handleTeam);
  handleLoading(false);
}

async function editTeam(e, teamTla) {
  try {
    e.preventDefault();
    const {
      name, tla, country, address, shield, website, founded,
    } = e.target;
    const dataForm = {
      name: name.value,
      tla: tla.value,
      country: country.value,
      address: address.value,
      website: website.value,
      founded: founded.value,
    };
    editTeamApi(teamTla, dataForm);
    localStorage.clear();
    removeContent();
    showAlert('#alert-success');
  } catch (error) {
    showAlert('#alert-error');
  }
}

export async function initialization() {
  handleTeamList();
}
