function login(event) {
    event.preventDefault();
    let username = document.getElementById('inputUsername').value;
    let password = document.getElementById('inputPassword').value;
  
    const credentials = { username, password };
    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials)
    })
      .then(resp => {
        if (resp.status === 401) {
          document.getElementById('error-message').innerText = 'Invalid Credentials';
        } else if (resp.status === 200) {
          return resp.json();
        } else {
          document.getElementById('error-message').innerText = 'Failed to Login at this time';
        }
        throw 'Failed to login';
      })
      .then(resp => {
        localStorage.setItem('user', JSON.stringify(resp));
        

        if(resp.role==1){
          window.location ='http://localhost:9001/admin/admin.html';
        }
        else{
          window.location = 'http://localhost:9001/home/home.html';
        }
        
      })
      .catch(err => {
        console.log(err);
      });
  }


  function goRegister(){
    window.location= 'http://localhost:9001/register/register.html';
  }

  function rememberMe(){
    let checkBoxRem = document.getElementById("chkBoxRem");

  }