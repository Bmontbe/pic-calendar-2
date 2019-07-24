const listEventReducer = (state = [], action) => {
  if (action.type === 'LISTEVENT') {
    return action.payload
  }
  return state;
}

export default listEventReducer;