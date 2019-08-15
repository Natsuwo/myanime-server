import Api from './Api'

export function dashboard(headers) {
    return Api(headers).get('/server/dashboard/index')
}