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
        createTable(elem, 3, 3);

        var tab = '<table class="table" id="userTable" border="1" cellpadding="5">';
        tab += '<thead><tr>';
        tab += '<th scope="col">ID</th><th scope="col">Логин</th><th scope="col">Имя</th><th scope="col">Действие</th>';
        tab += '</tr></thead></table>';
        return tab;
});

function tableCreate() {
        var body = document.getElementsByTagName('body')[0];
        var tbl = document.createElement('table');
        tbl.style.width = '100%';
        tbl.setAttribute('border', '1');
        var tbdy = document.createElement('tbody');
        for (var i = 0; i < 3; i++) {
                var tr = document.createElement('tr');
                for (var j = 0; j < 2; j++) {
                        if (i == 2 && j == 1) {
                                break
                        } else {
                                var td = document.createElement('td');
                                td.appendChild(document.createTextNode('\u0020'))
                                i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
                                tr.appendChild(td)
                        }
                }
                tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);
        body.appendChild(tbl)
}