import * as ActionTypes from './ActionTypes';
import { usersUrl, bookmarkUrl } from './config';
import { getToken } from '../Authorisation';

export const setUser = (details) => ({
    type: ActionTypes.SET_USER,
    payload: details
});

export const logout = () => ({
    type: ActionTypes.LOGOUT
});

export const registerUser = (firstname, lastname, email, password) => (dispatch) =>
{
    const newUser = {
        firstname : firstname,
        lastname : lastname,
        email : email,
        password : password
    }
    newUser.date = new Date().toISOString();
    
    return fetch( usersUrl + '/register', {
        method: 'POST',
        mode: "cors",
        cache: "no-cache",
        body : JSON.stringify(newUser),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok)
        {
            return response;
        }
        else{
            var error = new Error('Error' + response.status + ": "+ response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {   
        throw error;
     })
     .then(response => response.json())
     .then(response => {
        console.log('New User ', response);
        alert('Successfully registered! Please Login.');
     })
     .catch(error => {
         console.log('Registeration failed: ', error.message);
         alert('Registeration failed: '+ error.message);
     })
}

export const loginUser = (email, password) => (dispatch) =>
{
    const user = {
        email: email,
        password: password
    }
    
    return fetch(usersUrl + '/login', {
        method: 'POST',
        mode: "cors",
        cache: "no-cache",
        body : JSON.stringify(user),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok)
        {
            return response;
        }
        else{
            var error = new Error('Error' + response.status + ": "+ response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => {
    
    console.log('Logged In: ', response);
    if (response.status === "False")
        alert(response.message)
    else
    {
        localStorage.setItem('token', response.auth_token);
        localStorage.setItem('name', response.firstname);
        dispatch(setUser(response));
        dispatch(fetchBookmarks());
        alert("Hello , " + response.firstname + " " + response.lastname);
    }
    })
    .catch(error => {
        console.log('Login failed: ', error.message);
        alert('Login failed: '+ error.message);
    });
}

export const logoutUser = () => (dispatch) => {
    localStorage.clear();
    dispatch(logout());
    dispatch(clearBookmarks());
}

export const refreshBookmarks = (details) => ({
    type: ActionTypes.MODIFY_BOOKMARK,
    payload: details
});

export const clearBookmarks = () => ({
    type: ActionTypes.CLEAR_BOOKMARKS
});

export const createBookmarks = (parentId, childId, name, url) => (dispatch) => {
    
    const newBookmark = {
        parent: parentId,
        child: childId,
        name: name,
        url: url
    }
    console.log(newBookmark);
    return fetch(bookmarkUrl + '/create', {
        method: 'POST',
        mode: "cors",
        cache: "no-cache",
        body : JSON.stringify(newBookmark),
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok)
        {
            return response;
        }
        else{
            var error = new Error('Error' + response.status + ": "+ response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => {
        if (!!!response.bookmarks) {
            alert("Authorisation failed. Bookmarks cant be retrived")
        }
        else
        {
            dispatch(refreshBookmarks(response.bookmarks));
            console.log(response.bookmarks);
            alert("New entry created");
        }
    })
    .catch(error => console.log(error.message))
}

export const fetchBookmarks = () => (dispatch) => {

    return fetch( bookmarkUrl+ '/fetch' , {
        method: 'GET',
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
            if (response.ok)
            {
                return response;
            }
            else {
                var error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
    },
    error => {
        throw error;
    }
    )
    .then(response => response.json())
    .then(response => {
        if (!!!response.bookmarks) {
            console.log(response);
            alert("Authorisation failed. Bookmarks cant be retrived:" + response);
        }
        else {
            dispatch(refreshBookmarks(response.bookmarks));
            console.log("Bookmarks fetched and loaded");
        }
    })
    .catch(error => console.log(error.message));
}

export const editBookmarks = (nodeId, name, url) => (dispatch) => {
    const newBookmark = {
        nodeid: nodeId,
        name: name,
        url: url
    }
    console.log(newBookmark);
    return fetch(bookmarkUrl + '/update', {
        method: 'PUT',
        mode: "cors",
        cache: "no-cache",
        body : JSON.stringify(newBookmark),
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok)
        {
            return response;
        }
        else{
            var error = new Error('Error' + response.status + ": "+ response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => {
        if(!!!response.bookmarks) {
            alert("Authorisation failed. Bookmarks cant be retrived");
        }
        else{
            dispatch(refreshBookmarks(response.bookmarks));
            console.log("Entry edited: " + response);
            alert("Entry editted");
        }
    })
    .catch(error => console.log(error.message))
}

export const deleteBookmarks = (nodeId) => (dispatch) => {

    return fetch( bookmarkUrl + '/delete/' + nodeId, {
        method: 'DELETE',
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok)
        {
            return response;
        }
        else{
            var error = new Error('Error' + response.status + ": "+ response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => {
        if(!!!response.bookmarks) {
            alert("Authorisation failed. Bookmarks cant be retrived");
        }
        else{
            dispatch(refreshBookmarks(response.bookmarks));
            console.log("Entry deleted: " + response);
            alert("Entry deleted");
        }
    })
    .catch(error => console.log(error.message))
}
