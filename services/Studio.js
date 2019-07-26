import Api from './Api'
export default {
    async get() {
        return (await Api().get('/admin/studio/get')).data
    },
    async post(form) {
        return (await Api().post('/admin/studio/post', form)).data
    }
}