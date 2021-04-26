import tokenService from './tokenService';


const BASE_URL = '/api';

export function create(postID) {
    return fetch(`${BASE_URL}/posts/${postID}/likes`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())
}


export function removeLike(likeID) {
    return fetch(`${BASE_URL}/likes/${likeID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())
}