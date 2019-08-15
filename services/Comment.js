import Api from './Api'

export function getComments(headers) {
    return Api(headers).get('/server/comment/get')
}