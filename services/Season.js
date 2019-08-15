import Api from './Api'
export default {
    async get() {
        return (await Api().get('/server/season/get')).data
    },
    async post(form) {
        return (await Api().post('/server/season/post', form)).data
    },
    async update(form) {
        return (await Api().post('/server/season/update', form)).data
    }
}