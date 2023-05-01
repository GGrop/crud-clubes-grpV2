import { getATeam, getTeamsList } from './services/teamsServices.js';
import handleLoading from './ui/loading/loading.js';
import CreateTeamList from './ui/teamsLists/teamLists.js';
import createTeamCard from './ui/teamCard/teamCard.js';
import createEditableTeamCard from './ui/teamEdit/teamEdit.js';
import {
  createTeam as createTeamApi,
  deleteTeam as deleteTeamApi,
  editTeam as editTeamApi,
  resetTeams,
} from './api/teamsAPI.js';
import {
  handleHidden,
  handleHiddenAll,
} from './ui/handleHidden/handleHidden.js';

async function handleTeam(id) {
  handleLoading(true);
  removeContent();
  await createTeamCard(await getATeam(id));
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
    const { dataset } = document.querySelector('#content-team');
    const { id } = dataset;
    await deleteTeamApi(id);
    localStorage.clear();
    removeContent();
    handleHidden(1, '#alert-success');
  } catch (error) {
    handleHidden(1, '#alert-error');
  }
};

document.querySelector('#edit-team-button').onclick = async () => {
  try {
    removeContent();
    const { dataset } = document.querySelector('#content-team');
    const { id } = dataset;
    await createEditableTeamCard(await getATeam(id));
    handleHidden(1, '#content-edit-team');
  } catch (error) {
    handleHidden(1, '#alert-error');
  }
};

document.querySelector('#edit-team-form').onsubmit = async (e) => {
  try {
    e.preventDefault();
    const { dataset } = document.querySelector('#content-edit-team');
    const { id } = dataset;
    const form = e.target;
    const formData = new FormData(form);
    editTeamApi(id, formData);
    localStorage.clear();
    removeContent();
    handleHidden(1, '#alert-success');
  } catch (error) {
    handleHidden(1, '#alert-error');
  }
};

document.querySelector('#new-team-form').onsubmit = async (e) => {
  try {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    createTeamApi(formData);
    localStorage.clear();
    removeContent();
    handleHidden(1, '#alert-success');
  } catch (error) {
    handleHidden(1, '#alert-error');
  }
  const inputs = document.querySelectorAll('#new-team-input');
  inputs.forEach((input) => {
    input.value = '';
  });
};

document.querySelector('#reset-teams').onclick = async () => {
  resetTeams();
  localStorage.clear();
  handleTeamList();
};
document.querySelector('#create-team').onclick = async () => {
  removeContent();
  handleHidden(1, '#content-new-team');
};
document.querySelector('#home').onclick = async () => {
  await handleTeamList();
};
