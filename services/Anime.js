import Api from './Api'
export default {
    async get() {
        return (await Api().get('/admin/anime/get')).data
    },
    async post(form) {
        return (await Api().post('/admin/anime/post', form)).data
    },
    async getUpdate(id) {
        return (await Api().get(`/admin/anime/update?anime_id=${id}`)).data
    },
    async postUpdate(form) {
        return (await Api().post('/admin/anime/update', form)).data
    },
    async removeTerm(form) {
        return (await Api().post('/admin/anime/remove-term', form)).data
    },
    async removeAnime(form) {
        return (await Api().post('/admin/anime/remove-anime', form)).data
    }
}