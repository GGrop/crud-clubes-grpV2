import { getATeam, getTeamsList } from './services/teamsServices.js';
import { handleLoading } from './ui/loading/loading.js';
import CreateTeamList from './ui/teamsLists/teamLists.js';
import createTeamCard from './ui/teamCard/teamCard.js';
import createEditableTeamCard from './ui/teamEdit/teamEdit.js';
import {
  createTeam as createTeamApi, deleteTeam as deleteTeamApi, editTeam as editTeamApi, resetTeams,
} from './api/teamsAPI.js';
import { handleHidden, handleHiddenAll } from './ui/alerts/alerts.js';

async function handleTeam(tla) {
  handleLoading(true);
  removeContent();
  await createTeamCard(await getATeam(tla));
  handleHidden(1, '#content-team');
  handleLoading(false);
}

async function handleTeamList() {
  handleLoading(true);
  removeContent();
  await CreateTeamList(await getTeamsList(), handleTeam);
  handleHidden(1, '#content-list');
  handleLoading(false);
}

export default async function initialization() {
  handleTeamList();
}

function removeContent() {
  handleHiddenAll('.content');
  document.querySelector('#tbody').innerHTML = '';
}

document.querySelector('#delete-team-button').onclick = async () => {
  handleHidden(1, '#content-delete-team');
};

document.querySelector('#delete-team-form').onsubmit = async (e) => {
  try {
    e.preventDefault();
    const { dataset } = document.querySelector('#label-team-tla');
    const { tla } = dataset;
    await deleteTeamApi(tla);
    localStorage.clear();
    removeContent();
    handleHidden(1, '#alert-success');
  } catch (err) {
    handleHidden(1, '#alert-error');
  }
};

document.querySelector('#edit-team-button').onclick = async () => {
  removeContent();
  const { dataset } = document.querySelector('#label-team-tla');
  const { tla } = dataset;
  await createEditableTeamCard(await getATeam(tla));
  handleHidden(1, '#content-edit-team');
};

document.querySelector('#edit-team-form').onsubmit = async (e) => {
  try {
    e.preventDefault();
    const { dataset } = document.querySelector('#input-edit-tla');
    const { tla } = dataset;
    const form = e.target;
    const formData = new FormData(form);
    editTeamApi(tla, formData);
    localStorage.clear();
    removeContent();
    handleHidden(1, '#alert-success');
  } catch (error) {
    handleHidden(1, '#alert-error');
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
// que funcionalidades me faltan
// agregar un nuevo equipo
// borrar un nuevo equipo
// solucionar o mejorar lo del local storage y el sistema de alertas q parece muy hardcodeado
