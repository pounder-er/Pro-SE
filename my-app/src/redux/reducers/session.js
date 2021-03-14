export default (state=null, action) => {
    switch (action.type) {
      case 'ADD_SESSION':
        return action.user
      default:
        return state
    }
  }