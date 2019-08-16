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

export function removeEpisode(headers, form) {
    return Api(headers).post('/server/episode/remove-episode', form)
}

export default {
    async getUpdate(id) {
        return (await Api().get(`/server/episode/update?episode_id=${id}`)).data
    },
    async getAnime(form) {
        return (await Api().get('/server/episode/get-anime', form)).data
    },
    async update(form) {
        return (await Api().post('/server/episode/update', form)).data
    },

}