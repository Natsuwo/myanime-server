import Api from './Api'

export function addNew(headers, form) {
    return Api(headers).post('/episode/post', form)
}

export function get(headers, limit, page, search) {
    var limitQuery = limit ? `?limit=${limit}` : '?limit=20'
    var pageQuery = page ? `&page=${page}` : ''
    var searchQuery = search ? `&q=${search}` : ''
    return Api(headers).get(`/episode/get${limitQuery}${pageQuery}${searchQuery}`)
}


export function getUpdate(headers, id) {
    return Api(headers).get(`/episode/update?episode_id=${id}`)
}

export function update(headers, form) {
    return Api(headers).put('/episode/update', form)
}

export function getAnime(headers) {
    return Api(headers).get('/episode/get-anime')
}

export function removeEpisode(headers, form) {
    return Api(headers).delete('/episode/remove-episode', { data: form })
}

export function addMulti(headers, form) {
    return Api(headers).post('/episode/add-multi', form)
}

export function getEditMulti(headers, id, type, audio, subtitle, fansub) {
    var animeQuery = id ? `?anime_id=${id}` : ''
    var typeQuery = type ? `&type=${type}` : ''
    var audioQuery = audio ? `&audio=${audio}` : ''
    var subQuery = subtitle ? `&subtitle=${subtitle}` : ''
    var fansubQuery = fansub ? `&fansub=${fansub}` : ''
    return Api(headers).get(`/episode/edit-multi${animeQuery}${typeQuery}${audioQuery}${subQuery}${fansubQuery}`)
}

export function editMulti(headers, form) {
    return Api(headers).put('/episode/edit-multi', form)
}