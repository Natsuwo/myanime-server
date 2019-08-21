import { checkUserToken } from "../services/Authentication"
import { getAll } from "../services/Term"
const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
    return {
        signIn: false,
        flags: [],
        isLoading: false
    }
}

export const mutations = {
    setAuth(state, auth) {
        this.state.auth.isLogin = auth.isLogin
        this.state.auth.userToken = auth.token
        this.state.auth.user_id = auth.user_id
    },
    signIn(state, payload) {
        state.signIn = payload
    },
    getFlags(state, payload) {
        state.flags = payload
    },
    SET_LOADING(state, isLoading) {
        state.isLoading = isLoading
    }

}
export const actions = {
    async nuxtServerInit({ commit, dispatch }, { req }) {
        if (req.headers.cookie) {
            var cookie = cookieparser.parse(req.headers.cookie)
            var headers = {
                "x-user-session": cookie.USER_ACCESS_TOKEN || ""
            }
            var checkAuth = (await checkUserToken(headers)).data
            if (checkAuth.success) {
                commit('setAuth', { user_id: checkAuth.user.user_id, token: checkAuth.token, isLogin: true })
                dispatch("auth/profileData", checkAuth.user);
            }
            var terms = (await getAll(headers)).data
            dispatch("term/termsData", terms.data)
            // Get Flags
            // var flags = (await getFlags(headers)).data
            // commit("getFlags", flags.result)
        }
    }
}