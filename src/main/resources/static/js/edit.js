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

        var div = document.createElement("div");
        var tab = '<table class="table" id="userTable" border="1" cellpadding="5">';
        tab += '<thead><tr>';
        tab += '<th scope="col">ID</th><th scope="col">Логин</th><th scope="col">Имя</th><th scope="col">Действие</th>';
        tab += '</tr></thead></table>';
        div.innerHTML = tab;
        document.getElementById('myTable').appendChild(div);

        let response = await fetch('/adminpage/list');
        let listuser = await response.json();

        console.log(listuser);
});
