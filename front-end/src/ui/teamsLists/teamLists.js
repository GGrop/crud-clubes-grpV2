export default function showTeamList(teamsList, getATeam=()=>{}){
  document.querySelector('#teams-length').textContent=teamsList.total
  createTable()
  teamsList.teams.map((team, index)=> populateTable(team, index, getATeam))
}