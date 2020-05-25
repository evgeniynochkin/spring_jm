async function RestGet(el) {
        var rep = el.parentNode.parentNode.cells[0].innerHTML;

        let response = await fetch('/adminpage/' + rep);
        let myuser = await response.json();

        $('#formGroupIDEdit').val(myuser.id);
        $('#formGroupLoginInputEdit').val(myuser.login);
        $('#formGroupPasswordInputEdit').val(myuser.password);
        $('#formGroupUsernameInputEdit').val(myuser.username);
}

$(document).ready(function () {

        let response = fetch('/adminpage/list');
        let listuser = response.json();

        console.log(listuser)


        var elem = document.querySelector('#myTable');
        var table = document.createElement('table');
        for (var i = 0; i < 3; i++) {
                var tr = document.createElement('tr');
                for (var j = 0; j < 3; j++) {
                        var td = document.createElement('td');
                        tr.appendChild(td);
                }
                table.appendChild(tr);
        }
        elem.appendChild(table);

        //
        var tab = '<table class="table" id="userTable" border="1" cellpadding="5">';
        tab += '<thead><tr>';
        tab += '<th scope="col">ID</th><th scope="col">Логин</th><th scope="col">Имя</th><th scope="col">Действие</th>';
        tab += '</tr></thead></table>';
        return tab;
});
