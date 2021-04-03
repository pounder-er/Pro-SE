export default (state=null, action) => {
    switch (action.type) {
      case 'ADD_USERPROFILE':
        return action.profile
      default:
        return state
    }
  }