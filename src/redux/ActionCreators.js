export const registerUser = (firstname, lastname, email, password) => (dispatch) =>
{
    const newUser = {
        firstname : firstname,
        lastname : lastname,
        email : email,
        password : password
    }
    newUser.date = new Date().toISOString();

    
    return fetch('https://g1fw5h01n7.execute-api.us-east-1.amazonaws.com/dev/src/register', {
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
    
    return fetch('https://g1fw5h01n7.execute-api.us-east-1.amazonaws.com/dev/src/login', {
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
        localStorage.setItem("username", response.username);
        localStorage.setItem("email", response.email);
        localStorage.setItem("logged_in", "True");
        alert(response);
     })
     .catch(error => {
         console.log('Login failed: ', error.message);
         alert('Login failed: '+ error.message);
     })
}
