import Api from './Api'
export default {
    async get() {
        return (await Api().get('/admin/episode/get')).data
    },
    async getUpdate(id) {
        return (await Api().get(`/admin/episode/update?episode_id=${id}`)).data
    },
    async getAnime(form) {
        return (await Api().get('/admin/episode/get-anime', form)).data
    },
    async post(form) {
        return (await Api().post('/admin/episode/post', form)).data
    },
    async update(form) {
        return (await Api().post('/admin/episode/update', form)).data
    },
    async removeEpisode(form) {
        return (await Api().post('/admin/episode/remove-episode', form)).data
    }
}