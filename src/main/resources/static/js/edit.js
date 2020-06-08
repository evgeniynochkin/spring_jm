//User by id
async function GetUser(id) {
        let response = await fetch('/adminpage/' + id, {
                method: 'GET'
        });

        let userbyid = await response.json();

        editform.id.value = userbyid.id;
        editform.login.value = userbyid.login;
        editform.password.value = userbyid.password;
        editform.username.value = userbyid.username;

        $('#editModalWindow').modal('show');
}

//Edit user
async function EditUser(editform) {
        let edituser = {
                "id" : editform.id.value,
                "username" : editform.username.value,
                "login": editform.login.value,
                "password": editform.password.value
        }

        let response = await fetch('/adminpage/' + edituser.id, {
                method: 'PUT',
                headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify(edituser)
        });
};

//Delete user
async function DeleteUser(id) {
        fetch('/adminpage/' + id, {
                method: 'DELETE'
        }).then(() => {
                console.log('removed');
        }).catch(err => {
                console.error(err)
        });
}

//New user
async function NewUser(form) {
        let newuser = {
                "username" : newuserform.formusername.value,
                "login": newuserform.formlogin.value,
                "password": newuserform.formpassword.value
        };

        fetch('/adminpage/new', {
                method: 'POST',
                headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify(newuser)
                });
}

//Preload page
$(document).ready(async function () {

        let response = await fetch('/adminpage/list');
        let listuser = await response.json();

        //Шапка таблицы
        let tab = `<thead id="tabHead">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Логин</th>
                            <th scope="col">Имя</th>
                            <th scope="col">Действие</th>
                        </tr>
                    </thead>`;
        $('#userTable').append(tab);

        //Заполнение таблицы
        let lusers = listuser.map(user => {
                const {id, login, username} = user;
                return `<tbody id="tabBody">
                            <tr>
                                     <th scope="col">${user.id}</th>
                                     <th scope="col">${user.login}</th>
                                     <th scope="col">${user.username}</th>
                                     <td>
                                           <button type="button" class="btn btn-primary" onclick="GetUser(${user.id})">Редактировать</button>
                                           <button type="button" class="btn btn-primary" onclick="DeleteUser(${user.id})">Удалить</button>
                                     </td>
                            </tr>
                        </tbody>`;
        });
        $('#userTable').append(lusers);
});


