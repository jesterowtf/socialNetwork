export const getAuth = (state) => {
    return state.auth.isAuth;
}

export const getUserName = (state) => {
    return state.auth.profile?.firstName;
}

