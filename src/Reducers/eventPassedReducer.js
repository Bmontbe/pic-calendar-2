const eventPassedReducer = (state = [], action) => {
  if(action.type === 'LIST_PASSED') {
    return action.payload
  }
  return state;
}

export default eventPassedReducer;