import Api from './Api'
export default {
    async get(type) {
        return (await Api().get(`/admin/term/get?type=${type}`)).data
    },
    async getSingle(form) {
        return (await Api().post('/admin/term/get', form)).data
    },
    async post(form) {
        return (await Api().post('/admin/term/post', form)).data
    },
    async update(form) {
        return (await Api().post('/admin/term/update', form)).data
    },
    async deleteTerm(form) {
        return (await Api().post('/admin/term/delete', form)).data
    }
}