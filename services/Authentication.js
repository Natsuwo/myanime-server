import Api from './Api'

// export function signUp(form) {
//     return Api().post('/auth/sign-up', form);
// }

export function signIn(form) {
    return Api().post('/server/auth/login', form)
}

export function signOut() {
    return Api().post('/server/auth/logout')
}

export function checkUserToken(headers) {
    return Api().post('/server/auth/check-user-token', {}, headers)
}