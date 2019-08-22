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
    },
    removeComment(state, item) {
        const index = state.comments.indexOf(item);
        if (index >= 0) return state.comments.splice(index, 1);
    }
}