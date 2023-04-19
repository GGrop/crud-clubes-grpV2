function makeKey(key){
  return `team-${key}`
}

export function saveOnStorage(data,key){
  localStorage.setItem(makeKey(key), JSON.stringify(data))
}

