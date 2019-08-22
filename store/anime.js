import { removeAnime } from "../services/Anime";

const ANIMES = 'animes'
const ANIME = 'anime'
const DELETE = 'delete'

export const state = () => {
    return {
        animes: [],
        count: 0,
        anime: {}
    }
}

export const actions = {
    async animesData({ commit }, res) {
        return commit(ANIMES, { res })
    },
    async animeData({ commit }, data) {
        return commit(ANIME, { data })
    },
    async removeAnime({ commit }, { item, data }) {
        var response = await removeAnime(data.headers, data.form)
        return commit(DELETE, { item, data: response.data })
    }
}

export const mutations = {
    [ANIMES](state, { res }) {
        state.animes = res.data
        state.count = res.count
    },
    [ANIME](state, { data }) {
        state.anime = data
    },
    [DELETE](state, { item, data }) {
        if (data.success) {
            state.count--
            const index = state.animes.animes.indexOf(item);
            if (index >= 0) return state.animes.animes.splice(index, 1); 
        }
    }
}