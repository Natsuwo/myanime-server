import { removeEpisode } from "../services/Episode";

const EPISODES = 'episodes'
const EPISODE = 'episode'
const DELETE = 'delete'

export const state = () => {
    return {
        animes: [],
        episodes: [],
        episode: {},
        meta: [],
        count: 0
    }
}

export const actions = {
    async episodesData({ commit }, res) {
        return commit(EPISODES, { res })
    },
    async episodeData({ commit }, data) {
        return commit(EPISODE, { data })
    },
    async removeEpisode({ commit }, data) {
        var response = await removeEpisode(data.headers, data.form)
        return commit(DELETE, { res: response.data, item: data.item })
    }
}

export const mutations = {
    [EPISODES](state, { res }) {
        state.episodes = res.data
        state.count = res.count
        state.meta = res.meta
        state.animes = res.animes
    },
    [EPISODE](state, { data }) {
        state.anime = data
    },
    [DELETE](state, { res, item }) {
        if (res.success) {
            const index = state.episodes.indexOf(item);
            if (index >= 0) state.episodes.splice(index, 1);
        }
    }


}