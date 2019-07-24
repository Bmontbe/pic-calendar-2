const imgSrcReducer = (state = "", action) => {
  if(action.type === 'ADD_SRC_IMG') {
    return action.payload
  }
  return state;
}

export default imgSrcReducer;