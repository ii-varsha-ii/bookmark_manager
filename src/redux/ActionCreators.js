import * as ActionTypes from './ActionTypes';
import { configUrl } from './config';

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

    
    return fetch(configUrl + '/register', {
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
        var errmess = new Error(error.message);
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
    
    return fetch(configUrl + '/login', {
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
        var errmess = new Error(error.message);
        throw error;
     })
     .then(response => response.json())
     .then(response => {
        
        console.log('Logged In: ', response);
        if (response.status == "False")
            alert(response.message)
        else
        {
            dispatch(setUser(response));
            alert("Hello , " + response.firstname + " " + response.lastname);
        }
     })
     .catch(error => {
         console.log('Login failed: ', error.message);
         alert('Login failed: '+ error.message);
     })
}
export const logoutUser = () => (dispatch) => {
    dispatch(logout());
}