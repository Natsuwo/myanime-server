import Api from './Api'

export function signUp(headers, form) {
    return Api(headers).post('/server/auth/sign-up', form);
}

export function profile(headers) {
    return Api(headers).get('/server/setting/profile');
}

export function updateProfile(headers, form) {
    return Api(headers).put('/server/setting/profile', form);
}

export function signIn(headers, form) {
    return Api(headers).post('/server/auth/sign-in', form)
}

export function checkUserToken(headers) {
    return Api(headers).post('/server/auth/check-user-token')
}