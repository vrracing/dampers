export function putStage(state) {
  localStorage.setItem(
    "stagedData",
    JSON.stringify({ ...state, lastModified: Date.now() })
  );
}
export function getStaged() {
  return JSON.parse(localStorage.getItem("stagedData"));
}
export function clearStage() {
  localStorage.removeItem("stagedData");
}

export function dbPersist(state) {
  localStorage.setItem(
    "persistedData",
    JSON.stringify({ ...state, lastModified: Date.now() })
  );
}
export function dbRetrieve() {
  return JSON.parse(localStorage.getItem("persistedData"));
}
