import { getATeam, getTeamsList } from "./services/teamsServices.js";
import { handleLoading } from "./ui/loading/loading.js";
import showTeamList from "./ui/teamsLists/teamLists.js"
import showTeamCard from './ui/teamCard/teamCard.js'
// export async function  initialization () {
//   const data = await getATeam("ARS")
//   console.log(data)
//   const data2= await getTeamsList()
//   console.log(data2)
// }

function removeContent(){
  document.querySelector('#content').innerHTML = ""
}
async function handleATeam(Tla){
  removeContent()
  handleLoading(true)
  await showTeamCard( await getATeam(Tla))
  handleLoading(false)


}


async function handleTeamList(){
  removeContent()
  handleLoading(true)
  await showTeamList(await getTeamsList(), handleATeam)
  handleLoading(false)
}


