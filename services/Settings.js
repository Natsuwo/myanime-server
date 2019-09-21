import Api from './Api'

export function getSetting(headers) {
    return Api(headers).get('/setting/get')
}

export function updateSetting(headers, form) {
    return Api(headers).put('/setting/update', form)
}