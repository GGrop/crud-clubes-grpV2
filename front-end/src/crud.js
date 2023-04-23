import { getATeam, getTeamsList } from './services/teamsServices.js';
import { handleLoading } from './ui/loading/loading.js';
import CreateTeamList from './ui/teamsLists/teamLists.js';
import createTeamCard from './ui/teamCard/teamCard.js';
import createEditableTeamCard from './ui/teamEdit/teamEdit.js';
async function handleDelete(tla) {
  console.log('I should delete', tla);
}

async function handleEdition(tla) {
  removeContent();
  createEditableTeamCard(await getATeam(tla), editTeam);
}
import {
  createTeam as createTeamApi, deleteTeam as deleteTeamApi, editTeam as editTeamApi, resetTeams,
} from './api/teamsAPI.js';
import { handleHidden, handleHiddenAll } from './ui/alerts/alerts.js';

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

function removeContent() {
  handleHiddenAll('.content');
  document.querySelector('#tbody').innerHTML = '';
}

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

document.querySelector('#reset-teams').onclick = async () => {
  resetTeams();
  localStorage.clear();
  handleTeamList();
};

document.querySelector('#home').onclick = async () => {
  handleTeamList();
};

export async function initialization() {
  handleTeamList();
}

// que funcionalidades me faltan
// agregar un nuevo equipo
// borrar un nuevo equipo
// solucionar o mejorar lo del local storage y el sistema de alertas q parece muy hardcodeado
