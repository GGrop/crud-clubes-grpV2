import { getClubList } from './api/clubsAPI.js';

export function initialization() {
  getClubList();
}
