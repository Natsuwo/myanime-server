export default {
    login(state, payload) {
        state.isUserLoggedIn = true
        state.loading = false
    },
    loading(state, payload) {
        state.loading = payload
    },
    logout(state, payload) {
        if (payload === true) {
            state.isUserLoggedIn = false
            state.loading = false
        }
    }
}