import {
  getATeam as getATeamAPI,
  getTeamList as getTeamListAPI,
} from '../api/teamsAPI.js';
import { mapTeam, mapTeamsList } from '../entities_maps/maps.js';
import {
  getATeam as getATeamStorage,
  getTeamsList as getTeamsListStorage,
  saveOnStorage,
} from '../storage/teamsStorage.js';

export async function getATeam(id) {
  let team;
  try {
    team = getATeamStorage(id);
  } catch (e) {
    console.log('de apinetA');
    team = mapTeam(await getATeamAPI(id));
    saveOnStorage(team, id);
  }
  return team;
}

export async function getTeamsList() {
  let teamsList;
  try {
    teamsList = getTeamsListStorage();
  } catch (e) {
    teamsList = mapTeamsList(await getTeamListAPI());
    saveOnStorage(teamsList, 'List');
  }
  return teamsList;
}
