import tokenService from './tokenService';

// This matches up with the app.use('/api/posts') in the server.js
// Where all our post api routes will live
const BASE_URL = '/api/posts';

export function create(post) {
    console.log(post, 'in create')
    return fetch(BASE_URL, {
        method: 'POST',
        body: post,
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())
}

export function removePost(postID) {
    return fetch(`${BASE_URL}/${postID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())
}

export function getAll() {
    return fetch(BASE_URL, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    })
        .then(res => res.json());
}