const eventReducer = (state = {}, action) => {
  if (action.type === 'ADDEVENT') {
    return action.payload
  }
  return state;
}

export default eventReducer;