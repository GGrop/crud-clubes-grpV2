function makeKey(key){
  return `team-${key}`
}

export function saveOnStorage(data,key){
  localStorage.setItem(makeKey(key), JSON.stringify(data))
}

export function getTeamsList(){
  const teamsList = JSON.parse(localStorage.getItem(makeKey("List")))
  if (teamsList === null){
    throw new Error("there are no teams in the storage yet")
  }
  return teamsList
}

