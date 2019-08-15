const DASHBOARD = 'dashboard'

export const state = () => {
    return {
        dashboard: []
    }
}

export const actions = {
    async dashboardData({ commit }, data) {
        return commit(DASHBOARD, { data })
    }
}

export const mutations = {
    [DASHBOARD](state, { data }) {
        state.dashboard = data
    }
}