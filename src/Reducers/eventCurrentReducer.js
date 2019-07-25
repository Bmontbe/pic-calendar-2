const eventCurrentReducer = (state = [], action) => {
  if(action.type === 'LIST_CURRENT') {
    return action.payload
  }
  return state;
}

export default eventCurrentReducer;