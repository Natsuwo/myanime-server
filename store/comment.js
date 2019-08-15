const COMMENTS = 'comments'

export const state = () => {
    return {
        comments: [],
        users: []
    }
}

export const actions = {
    async commentsData({ commit }, data) {
        return commit(COMMENTS, { data })
    }
}

export const mutations = {
    [COMMENTS](state, { data }) {
        state.comments = data.comments
        state.users = data.users
    }
}