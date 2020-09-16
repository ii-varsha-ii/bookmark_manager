export function getToken() {
    return localStorage.token;
}
export function isLoggedIn() {
    return !!localStorage.token
}
export function getName() {
    return localStorage.name;
}
