const INITIALIZED = "INITIALIZED";

export const initializeAC = () => {
  return { type: INITIALIZED  }
}

let initialState = {
  initialized: false,
}

const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case INITIALIZED:
      return {
        ...state,
        initialized: true
      }

    default: 
      return state;
  }
};

export const initializeApp =  () => {
  return (dispatch) => {
        dispatch(initializeAC())
  }
}

export default appReducer;
