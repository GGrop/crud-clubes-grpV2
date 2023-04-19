import Team from '../entities/team.js'
import TeamList from '../entities/teamList.js'

export function mapTeam(teamData){
  const {
    name,
    tla,
    area,
    crestUrl,
    address,
    website,
    founded
  } = teamData.myTeam
  // console.log(country)

  return new Team(
    name,
    tla,
    area.name,
    crestUrl,
    address,
    website,
    founded
  )
}

export function mapTeamsList(teamListData){
  const {
    length,
    teams
  } = teamListData.dataTeams

  return new TeamList(
    length,
    teams.map((team)=> team)
  )
}