//User by id
async function GetUser(id) {
        let response = await fetch('/adminpage/' + id, {
                method: 'GET'
        });
        let userbyid = await response.json();

        let formedit = `<form name="editform">
                            <h2>Редактировать пользователя</h2>
                            <div class="form-group">
                                <label>ID</label>
                                <input type="text" class="form-control" name="Id" value="${userbyid.id}"
                                       placeholder="ID" readonly="readonly" />
                            </div>
                            <div class="form-group">
                                <label>Логин</label>
                                <input type="text" class="form-control" name="Login" value="${userbyid.login}"
                                       placeholder="Логин"/>
                            </div>
                            <div class="form-group">
                                <label>Пароль</label>
                                <input type="text" class="form-control" name="Password" value="${userbyid.password}"
                                       placeholder="Пароль"/>
                            </div>
                            <div class="form-group">
                                <label>Имя</label>
                                <input type="text" class="form-control" name="Username" value="${userbyid.username}"
                                       placeholder="Имя"/>
                            </div>
                            <button type="submit" class="btn btn-primary" onclick="EditUser(${user.id})" value="save">Отправить</button>
                        </form>`

        $('#editWindow').append(formedit);
        $('#editModalWindow').modal('show');
}

//Edit user
async function EditUser(id) {
        let edituser = {
                "id" : editform.Id.value,
                "username" : editform.Username.value,
                "login": editform.Login.value,
                "password": editform.Password.value
        }

        let response = await fetch('/adminpage/' + id, {
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


