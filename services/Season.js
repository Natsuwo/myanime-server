import Api from './Api'
export default {
    async get() {
        return (await Api().get('/admin/season/get')).data
    },
    async post(form) {
        return (await Api().post('/admin/season/post', form)).data
    },
    async update(form) {
        return (await Api().post('/admin/season/update', form)).data
    }
}