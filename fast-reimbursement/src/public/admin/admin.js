function applyReimb(event) {
    event.preventDefault();
    let finished = 0;




    const amount = document.getElementById('input-amount').value;
    const description = document.getElementById('input-description').value;
    const type = document.getElementById('input-type').value;
    const auth = JSON.parse(localStorage.getItem('user')).username;
    const password = JSON.parse(localStorage.getItem('user')).password;

    const reimb = {
        amount,
        description,
        type,
        auth,
        password
    };

    fetch('../reimb', {

        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reimb)
    })

        .then(resp => resp.json())
        .then(resp => {
            window.location = 'http://localhost:9001/home/home.html'
        })
        .catch(err => {
            console.log(err);
        });


}

function doSwal() {
    swal({
        title: "Confirmation",
        text: "Are You Sure?",
        buttons: {
            cancel: true,
            confirm: "Submit"
        }

    })
        .then(val => {
            if (val) {
                swal({
                    title: "Thank you",
                    text: "You've applied reimbursement",
                    icon: "success"
                });

            }
        })
        .then(applyReimb(event));






}//end doSwal()


//---------------------------------------------------------------------END OF APPLY REIMB----------------------------------------------------------------------


//---------------------------------------------------------------------GET REIMBURSEMENT TABLE FOR USERS--------------------------------------------------------
function showReimb(reimb){
    const tbody = document.getElementById('reimb-result')
    let resolver = 0;
    if(reimb.resolver===0){
        resolver = "TBA";
    }else{
        resolver = reimb.resolver;
    }

    

    tbody.innerHTML +=`
    <tr>
       
            <td> $${reimb.amount} </td>
            <td>${reimb.submitted.slice(0,10)}</td>
            <td>${reimb.description}</td>
            <td>${reimb.type}</td>
            <td>${reimb.author}</td>
            <td>${resolver}</td>
            <td>${reimb.resolved.slice(0,10)}</td>
            <td>${reimb.status}</td>
    </tr>
    `

}

let user = JSON.parse(localStorage.getItem('user'));

console.log(user.id);

fetch(`../reimb/users/${user.id}`)
    .then(resp=>resp.json())
    .then(resp=>{
        resp.forEach(reimb=>{
            showReimb(reimb);
        })
    })
    .catch(err=>{
        console.log(err);
    });

    
// function greetingUser(){
//     let user = JSON.parse(localStorage.getItem('user'));
//     document.getElementById('greeting-user').innerHTML +=
//     `${user.id}`
// }
// greetingUser();


//------------------------------------------ADMIN JS------------------------------

function getAllUsers() {
    fetch(`../reimb`)
        .then(resp => resp.json())
        .then(resp => {
            document.getElementById('reimb-result').innerHTML = '';
            resp.forEach(reimb => {
                userResult(reimb);
            })
        }).catch(err => {
            console.log(err);
        })
}
getAllUsers();


function userResult(reimb) {
    const tbody = document.getElementById('reimb-result');
    const gear = `<i class="fa fa-gear" style="font-size:36px, pointer;"></i>`;

    let resolver = 0;
    if (reimb.resolver === 0) {
        resolver = "TBA";
    }
    else {
        resolver = reimb.resolver;
    }

    let str = "";
    //console.log("reimb stats = " + reimb.status_id);
    if (reimb.status === "PENDING") {
        // console.log("pending here");
        // console.log(reimb.id);
        // str = `select onchange="getStatus(${reimb.id});`
       
        tbody.innerHTML +=
            `<tr>
            <th scope="row">${reimb.id}</th>
            <td> $${reimb.amount} </td>
            <td>${reimb.submitted.slice(0, 10)}</td>
            <td>${reimb.description}</td>
            <td>${reimb.type}</td>
            <td>${reimb.author}</td>
            <td>${resolver}</td>
            <td>${reimb.resolved.slice(0, 10)}</td>
            
            <td>${reimb.status}</td>
            <td id="td-admin-option">${gear}
                <div id = "insertBtn">
                    <button class="btn btn-success" role="button" onclick="toSwalApprove(${reimb.id})">Approve</button>
                    <button class="btn btn-danger" role="button" onclick="toSwalApprove(${reimb.id})">Deny</button>
                </div>
            </td>
        </tr>
        `
    }
    else{
        tbody.innerHTML +=
            `<tr>
            <th scope="row">${reimb.id}</th>
            <td> $${reimb.amount} </td>
            <td>${reimb.submitted.slice(0, 10)}</td>
            <td>${reimb.description}</td>
            <td>${reimb.type}</td>
            <td>${reimb.author}</td>
            <td>${resolver}</td>
            <td>${reimb.resolved.slice(0, 10)}</td>
            
            <td>${reimb.status}</td>
            <td id="td-admin-option">${gear}SOLVED</td>
        </tr>
        `

    }
}//end userResult(reimb);




// function greetingAdmin() {
//     const user = JSON.parse(localStorage.getItem('user'));
//     console.log(user.id);
//     console.log(document.getElementById("admin-greeting").textContent);
//     document.getElementById("admin-greeting").innerHTML += `
//         <div>
//             Hello ${user.id}
//         </div>
//         `
// }
// greetingAdmin();


// function getStatus(id) {
//     let table = document.getElementById('reimb-result')
//     let tags = table.getElementsByTagName("td");
//     for (let i = 0; i < tags.length; i++) {
//         if (tags[i].innerText == id) {
//             let th = tags[i].parentElement.getElementsByTagName("th")[0];
//             let val = th.getElementsByTagName("select")[0].value;
//             if (val == 1) {
//                 toApprove(id);
//             }
//             else if (val == 2) {
//                 toDeny(id);
//             }
//         }
//     }
// }


function toSwalApprove(id){
    swal({
        title: 'Are you sure?',
        text: "Approve ID: "+id ,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) =>{
          if(result.value){
              toApprove(id),
              swal('Applied!')
          }
          else{
              swal('Cancelled')
          }
          
        });

}

function toSwalDeny(id){
    swal({
        title: 'Are you sure?',
        text: "Deny ID: "+id ,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) =>{
          if(result.value){
              toDeny(id),
              swal('Applied!')
          }
          else{
              swal('Cancelled')
          }
          
        });

}
function toApprove(id) {
    console.log("approve clicked");
    fetch(`../reimb/approve/${id}`, {
        method: 'PUT',
        body: localStorage.getItem('user')
    })
        .then(resp => resp.json())
        .then(resp => {
            getAllUsers();
            window.location = 'http://localhost:9001/admin/admin.html#admin-menu'
        })
        .catch(err => {
            console.log(err);
        });

}
function toDeny(id) {
    console.log("deny clicked");
    fetch(`../reimb/deny/${id}`, {
        method: 'PUT'
    })
        .then(resp => resp.json())
        .then(resp => {
            getAllUsers();
            window.location = 'http://localhost:9001/admin/admin.html#admin-menu'
        })
        .catch(err => {
            console.log(err);
        });
}

function viewUsers() {
    let num = document.getElementById('admin-select-option').value;

    if (num == "0") {
        getAllUsers();
    }
    else {
        getUserByStatus(num);
    }
}


function findUserId(){
    let num =document.getElementById('get-user-by-id').value;
    findUser(num);

}

function findReimb(){
    let num = document.getElementById('get-reimb-by-id').value;
    console.log(num);
    findReimbById(num);
}

function findReimbById(id){
    fetch(`../reimb/reimbId/${id}`,{
        method:'GET'
    })
        .then(resp => resp.json())
        .then(resp => {
            document.getElementById('reimb-result').innerHTML = '';
            resp.forEach(reimb => {
                userResult(reimb);
            })
        }).catch(err => {
            console.log(err);
        })


}

function findUser(id){
    fetch(`../reimb/users/${id}`,{
        method:'GET'
    })
        .then(resp => resp.json())
        .then(resp => {
            document.getElementById('reimb-result').innerHTML = '';
            resp.forEach(reimb => {
                userResult(reimb);
            })
        }).catch(err => {
            console.log(err);
        })

}


function getUserByStatus(num) {
    fetch(`../reimb/status/${num}`, {
        method: 'GET'
    })
        .then(resp => resp.json())
        .then(resp => {
            document.getElementById('reimb-result').innerHTML = '';
            resp.forEach(reimb => {
                userResult(reimb);
            })
        }).catch(err => {
            console.log(err);
        });
}


function resetUser(){
    getAllUsers();
    //erase input box string
    document.getElementById("get-user-by-id").value="";
}

function resetReimb(){
    getAllUsers();
   document.getElementById('get-reimb-by-id').value="";
}