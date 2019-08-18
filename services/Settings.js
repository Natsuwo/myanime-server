import Api from './Api'

export function getSetting(headers) {
    return Api(headers).get('/server/setting/get')
}

export function updateSetting(headers, form) {
    return Api(headers).put('/server/setting/update', form)
}