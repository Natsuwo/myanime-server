import Api from './Api'

export function addNew(headers, form) {
    return Api(headers).post('/server/episode/post', form)
}

export default {
    async get() {
        return (await Api().get('/server/episode/get')).data
    },
    async getUpdate(id) {
        return (await Api().get(`/server/episode/update?episode_id=${id}`)).data
    },
    async getAnime(form) {
        return (await Api().get('/server/episode/get-anime', form)).data
    },
    async update(form) {
        return (await Api().post('/server/episode/update', form)).data
    },
    async removeEpisode(form) {
        return (await Api().post('/server/episode/remove-episode', form)).data
    }
}