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
  handleAlert(0, '#alert-success');
  handleAlert(0, '#alert-error');
  removeContent();
  handleLoading(true);
  await showTeamList(await getTeamsList(), handleTeam);
  handleLoading(false);
}

async function editTeam(e, teamTla) {
  try {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    editTeamApi(teamTla, formData);
    localStorage.clear();
    removeContent();
    handleAlert(1, '#alert-success');
  } catch (error) {
    handleAlert(1, '#alert-error');
  }
}

export async function initialization() {
  handleTeamList();
}
