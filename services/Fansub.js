import Api from './Api'
export default {
    async get() {
        return (await Api().get('/server/fansub/get')).data
    },
    async getUpdate(id) {
        return (await Api().get(`/server/fansub/update?fansub_id=${id}`)).data
    },
    async post(form) {
        return (await Api().post('/server/fansub/post', form)).data
    },
    async update(form) {
        return (await Api().post('/server/fansub/update', form)).data
    },
    async removeFansub(form) {
        return (await Api().post('/server/fansub/remove-fansub', form)).data
    }
}