export function isLoggedIn() {
    return !!localStorage.token
}

export function isBookmarksLoaded() {
    return !!localStorage.bookmarks
}
export function getToken() {
    return localStorage.token;
}

export function getName() {
    return localStorage.name;
}

export function getBookmarks() {
    return JSON.parse(localStorage.getItem('bookmarks'));
}