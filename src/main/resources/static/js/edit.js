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

        console.log('Begin');

        let response = fetch('/adminpage');

        console.log(response);
});