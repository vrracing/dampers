import {
  clearStage,
  getStaged,
  putStage,
  dbPersist,
  dbRetrieve,
} from "./LocalStorage";

export function stepperReducer(state, action) {
  let newState = { ...state };

  switch (action.type) {
    case "updateField1": {
      console.info("updatedField1", action);
      newState.field1 = action.payload;
      putStage(newState);
      return newState;
    }
    case "updateField2": {
      newState.field2 = action.payload;
      putStage(newState);
      return newState;
    }
    case "updateField3": {
      newState.field3 = action.payload;
      putStage(newState);
      return newState;
    }
    case "initialize": {
      // get and clear the staged data
      const stagedData = getStaged();
      clearStage();

      // get any data in our persistant store (aka 'database')
      const persistedData = dbRetrieve();

      console.info(stagedData, persistedData);
      if (stagedData && persistedData) {
        // if we have both staged and persisted data, choose the latest
        if (stagedData.lastModified > persistedData.lastModified) {
          return stagedData;
        } else {
          return persistedData;
        }

        // if we only have data from the database
      } else if (persistedData) {
        return persistedData;

        // if we only have data from the stage
      } else if (stagedData) {
        dbPersist(stagedData);
        return stagedData;

        // otherwise, this is a brand new document
      } else {
        return {
          field1: "Initial Value 1",
          field2: "Initial Value 2",
          field3: "Initial Value 3",
        };
      }
    }
    case "persist": {
      const isDataStaged = getStaged();
      if (isDataStaged) {
        dbPersist(isDataStaged);
        clearStage();
        return isDataStaged;
      } else {
        dbPersist(state);
        return state;
      }
    }
    default:
      break;
  }
  return state;
}
