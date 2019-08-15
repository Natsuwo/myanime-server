import Api from './Api'

export function getAll(headers) {
    return Api(headers).get(`/server/term/get`)
}

export function addNew(headers, form) {
    return Api(headers).post('/server/term/post', form)
}

export function update(headers, form) {
    return Api(headers).put('/server/term/update', form)
}

export function deleteTerm(headers, form) {
    return Api(headers).delete('/server/term/delete', { data: form })
}