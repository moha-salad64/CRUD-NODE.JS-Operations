const form = document.getElementById('dataForm');
const dataList = document.getElementById('dataList');

const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');

let editUserID = null;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = inputName.value;
    const email = inputEmail.value;

    if(!name || !email){
        inputName.style.border = '1px solid red';
        inputEmail.style.border = '1px solid red';
    }
    else{

        if(editUserID){
            await fetch(`/api/data/${editUserID}` ,{
                method: "PUT",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({name , email})
            });
            // alert('user updated');
            editUserID = null;
        }
        else{
            await fetch('/api/data' , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });

            // alert('User added');
        }
         loadData();
        //clear input fields
        inputName.value ="";
        inputEmail.value ="";

    }
});

async function loadData() {
    const response = await fetch('/api/data');
    const data = await response.json();

    dataList.innerHTML = data.map(user => `
            <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
            <button class="btn btn-primary btn-sm" onclick="deleteUser(${user.id})">Delete</button>
            <button class="btn btn-danger btn-sm" onclick="updateUser(${user.id} , '${user.name}' , '${user.email}')">Update</button>
            </td>
            </tr>
    `).join('');  
}

async function deleteUser(id) {
    await fetch(`/api/data/${id}`, { method: 'DELETE' });
    // alert('User deleted!');
    loadData();
}

async function updateUser(id , name , email) {
    editUserID  = id;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;

    loadData();
}

// Load data on page load
loadData();
