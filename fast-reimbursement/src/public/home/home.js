function applyReimb(event) {
     event.preventDefault();
    let finishedSwal = 0;
    



  

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
    let typeString="";
    if(reimb.type==1)
    {
        typeString="LODGING";
    }
    else if(reimb.type==2)
    {
        typeString="TRAVEL";
    }
    else if(reimb.type==3)
    {
        typeString="FOOD";
    }
    else{
        typeString="OTHER";
    }
   
    // swal({
    //     title: 'Is this Correct information?',
    //     buttons:{
    //         cancel:true,
    //         confirm:"Submit"
    //     }
    // }).then(
    //     finishedSwal=1
    // );
    swal({
        title: 'Is this information correct?',
        text: "Reimburse Amount: $"+ reimb.amount + " " +  "Reimburse Type: "+ typeString,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) =>{
          if(result.value){
              sendReimburse(reimb),
              swal('Applied!')
          }
          else{
              swal('Cancelled')
          }
          
        });
    // swal({
    //     title: "Is this correct information??",
    //     text: reimb.amount+ " " + reimb.type,
    //     type: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes',
    //  },
    //  function(isConfirm){
    
    //    if (isConfirm){
    //     sendReimburse(reimb);
    //     swal("Applied", "Your reimbursement is now pending", "success");
         
    
    //     } else {
    //       swal("Cancelled", "cancelled", "error");
            
    //     }
    //  });  

}
function sendReimburse(reimb){
    console.log("applied");
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
            window.location = 'http://localhost:9001/home/home.html#view-reimb'
        })
        .catch(err => {
            console.log(err);
        });

}



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

    

