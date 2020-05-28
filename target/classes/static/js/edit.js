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
        // let tab = `<table class="table" id="userTable" border="1" cellpadding="5">
        //                 <thead>
        //                     <tr>
        //                         <th scope="col">ID</th>
        //                         <th scope="col">Логин</th>
        //                         <th scope="col">Имя</th>
        //                         <th scope="col">Действие</th>
        //                     </tr>
        //                 </thead>
        //             </table>`;
        // $('#myTable').append(tab);

        let tab = `<thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Логин</th>
                            <th scope="col">Имя</th>
                            <th scope="col">Действие</th>
                        </tr>
                    </thead>`;
        $('#userTable').append(tab);

        // console.log(listuser);

        let lusers = listuser.map(user => {
                const {id, login, username} = user;
                return `<tr>
                     <th scope="col">${user.id}</th>
                     <th scope="col">${user.login}</th>
                     <th scope="col">${user.username}</th>
                     <td>
                           <button type="button" class="btn btn-primary" onclick="RestGet(this)" data-toggle="modal" data-target="#editModalWindow">Редактировать</button>
                           <a class="btn btn-primary" th:href="@{'/adminpage/delete/' + ${user.id}}" role="button" th:formmethod="delete">Удалить</a>
                     </td>
                </tr>`;
        });
        $('#userTable').append(lusers);

        // const luser = listuser.map(({id, username, login, password, passwordConfirm}) => `\n${id} ${username} ${login} ${password} ${passwordConfirm}`).join('');
        // consol.log(luser);
        // $('#myTable').append(lusers);

        // for (count = 0; count < listuser.length; count++) {
        //         const user = listuser[count];
        //         console.log(user.login);
        // }

});
