
function registerUser(event) {
    event.preventDefault();

    let username = document.getElementById('inputUsername').value;
    let password = document.getElementById('inputPassword').value;
    let firstname = document.getElementById('inputFirstName').value;
    let lastname = document.getElementById('inputLastName').value;
    let email = document.getElementById('inputEmail').value;

    const user = { username, password, firstname, lastname, email };
    fetch('../users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
    })
        .then(resp => {
            if (resp.status === 401) {
                document.getElementById('error-message').innerText = 'Please try again';
            } else if (resp.status === 200) {
                return resp.json();
            } else {
                document.getElementById('error-message').innerText = 'Failed to Register at this time';
            }
            throw 'Failed to register';
        })
        .then(resp => {
            window.location = 'http://localhost:9001/home/home.html';
        })
        .catch(err => {
            console.log(err);
        });
}


