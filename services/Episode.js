import Api from './Api'
export default {
    async get() {
        return (await Api().get('/admin/episode/get')).data
    }
}