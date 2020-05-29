async function RestGet(el) {
        var rep = el.parentNode.parentNode.cells[0].innerHTML;

        let response = await fetch('/adminpage/' + rep);
        let myuser = await response.json();

        $('#formGroupIDEdit').val(myuser.id);
        $('#formGroupLoginInputEdit').val(myuser.login);
        $('#formGroupPasswordInputEdit').val(myuser.password);
        $('#formGroupUsernameInputEdit').val(myuser.username);
}

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
                                           <button type="button" class="btn btn-primary" onclick="RestGet(this)" data-toggle="modal" data-target="#editModalWindow">Редактировать</button>
                                           <a class="btn btn-primary" th:href="@{'/adminpage/delete/' + ${user.id}}" role="button" th:formmethod="delete">Удалить</a>
                                     </td>
                            </tr>
                        </tbody>`;
        });
        $('#userTable').append(lusers);
});
