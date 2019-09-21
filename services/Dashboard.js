import Api from './Api'

export function dashboard(headers) {
    return Api(headers).get('/dashboard/index')
}