import Api from './Api'

export function getComments(headers) {
    return Api(headers).get('/server/comment/get')
}

export function removeComment(headers, form) {
    return Api(headers).delete('/server/comment/remove', { data: form })
}