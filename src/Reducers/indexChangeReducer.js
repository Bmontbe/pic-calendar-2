const indexChangeReducer = (state = '', action) => {
  if(action.type === 'INDEX_CHANGE') {
    return action.payload
  }
  return state;
}

export default indexChangeReducer;