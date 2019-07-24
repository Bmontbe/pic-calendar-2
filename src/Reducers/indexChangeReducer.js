const indexChangeReducer = (state = 0, action) => {
  if(action.type === 'INDEX_CHANGE') {
    return action.payload
  }
  return state;
}

export default indexChangeReducer;