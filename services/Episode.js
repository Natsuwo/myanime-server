import Api from './Api'

export function addNew(headers, form) {
    return Api(headers).post('/server/episode/post', form)
}

export function get(headers, limit, page, search) {
    var limitQuery = limit ? `?limit=${limit}` : '?limit=20'
    var pageQuery = page ? `&page=${page}` : ''
    var searchQuery = search ? `&q=${search}` : ''
    return Api(headers).get(`/server/episode/get${limitQuery}${pageQuery}${searchQuery}`)
}


export function getUpdate(headers, id) {
    return Api(headers).get(`/server/episode/update?episode_id=${id}`)
}

export function update(headers, form) {
    return Api(headers).put('/server/episode/update', form)
}

export function getAnime(headers) {
    return Api(headers).get('/server/episode/get-anime')
}

export function removeEpisode(headers, form) {
    return Api(headers).delete('/server/episode/remove-episode', { data: form })
}