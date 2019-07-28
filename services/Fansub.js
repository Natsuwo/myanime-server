import Api from './Api'
export default {
    async get() {
        return (await Api().get('/admin/fansub/get')).data
    },
    async getUpdate(id) {
        return (await Api().get(`/admin/fansub/update?fansub_id=${id}`)).data
    },
    async post(form) {
        return (await Api().post('/admin/fansub/post', form)).data
    },
    async update(form) {
        return (await Api().post('/admin/fansub/update', form)).data
    },
    async removeFansub(form) {
        return (await Api().post('/admin/fansub/remove-fansub', form)).data
    }
}