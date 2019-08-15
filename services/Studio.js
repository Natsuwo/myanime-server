import Api from './Api'
export default {
    async get() {
        return (await Api().get('/server/studio/get')).data
    },
    async post(form) {
        return (await Api().post('/server/studio/post', form)).data
    }
}