const USERMETA = 'usermeta'
const PROFILE = 'profile'
export const state = () => {
    return {
        isLogin: false,
        userToken: "",
        user_id: null,
        usermeta: [],
        profile: []
    }
}

export const actions = {
    async userMetaData({ commit }, data) {
        return commit(USERMETA, { data })
    },
    async profileData({ commit }, data) {
        return commit(PROFILE, { data })
    },
    async signIn({ commit }, data) {
        return commit(USERMETA, { data })
    }
}

export const mutations = {
    [USERMETA](state, { data }) {
        state.usermeta = data
    },
    [PROFILE](state, { data }) {
        state.profile = data
    }
}