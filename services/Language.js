import Api from './Api'
export default {
    async get() {
        return (await Api().get('/server/language/get')).data
    },
    async post(form) {
        return (await Api().post('/server/language/post', form)).data
    },
    async update(form) {
        return (await Api().post('/server/language/update', form)).data
    }
}