import Api from './Api'
export default {
    async Login(form) {
        return (await Api().post('/admin/auth/login', form)).data
    },
    async checkUserToken() {
        return (await Api().post('/admin/auth/check-user-token')).data
    },
    async logout() {
        return (await Api().post('/admin/auth/logout')).data
    }
}