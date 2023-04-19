import { getATeam, getTeamsList } from './services/teamsServices.js';
import { handleLoading } from './ui/loading/loading.js';
import showTeamList from './ui/teamsLists/teamLists.js';
import createTeamCard from './ui/teamCard/teamCard.js';
import showEditableTeamCard from './ui/teamEdit/teamEdit.js';
// export async function  initialization () {
//   const data = await getATeam("ARS")
//   console.log(data)
//   const data2= await getTeamsList()
//   console.log(data2)
// }

function removeContent() {
  document.querySelector('#content').innerHTML = '';
}


async function handleEdition(tla) {
  removeContent();
  showEditableTeamCard(getATeam(tla));
  console.log('I should edit');
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

export async function initialization() {
  handleTeamList();
}
