import Api from './Api'
export default {
    async get() {
        return (await Api().get('/admin/language/get')).data
    },
    async post(form) {
        return (await Api().post('/admin/language/post', form)).data
    },
    async update(form) {
        return (await Api().post('/admin/language/update', form)).data
    }
}