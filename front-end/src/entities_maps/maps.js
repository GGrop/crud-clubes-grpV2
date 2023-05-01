import Team from '../entities/team.js';
import TeamList from '../entities/teamList.js';

export function mapTeam(team) {
  const {
    id, name, tla, area, crestUrl, address, website, founded,
  } = team.myTeam;

  return new Team(
    id,
    name,
    tla,
    area.name,
    crestUrl,
    address,
    website,
    founded,
  );
}

export function mapTeamsList(teamListData) {
  const {
    length,
    teams,
  } = teamListData.dataTeams;

  return new TeamList(
    length,
    teams.map((team) => team),
  );
}
