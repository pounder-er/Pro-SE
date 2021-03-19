export const addSession = (payload) => ({
    type: 'ADD_SESSION',
    user: payload
})

export const addUserProfile = (payload) => ({
    type: 'ADD_USERPROFILE',
    profile: payload
  })