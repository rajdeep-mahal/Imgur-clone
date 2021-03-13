function validateRegistration() {
    let username = document.getElementById("username").value;
    let psw = document.getElementById("psw").value;
    let cpsw = document.getElementById("cpsw").value;
    let message = document.getElementById("message");
    let error_message = "";
    let pswCheck = false;
    let usernameCheck = false;

    let alphanumeric = /^[a-z0-9]+$/;
    if(("a" > username[0] || username[0] > "z") &&("A" > username[0] || username[0] > "Z")) {
        error_message += "Username must begins with a character ([a-zA-Z]).<br>";
    }

    else if (username.length < 3 || !alphanumeric.test(username)) {
        error_message += "Username must be 3 or more Alphanumeric Characters.<br>";
    } else {
        usernameCheck = true;
    }
    let re_num = /[0-9]/;
    let uppercase = /[A-Z]/;
    let special_characters = /[/*-+!@#$^&*]/;

    if (psw.length < 8) {
        error_message += "Password must be 8 or more characters. Must contains at least\n" +
            "1 upper case letter, 1 number and 1 of the following special characters ( / * - + ! @\n" +
            "# $ ^ & * ).<br>";
    }

    else if (!re_num.test(psw)) {
        error_message += "Password must contain 1 number.<br>";
        error_message += "Password contains at least 1 upper case letter, 1 number and 1 of the following special characters ( / * - + ! @ # $ ^ & * )<br>";
    }

    else if (!uppercase.test(psw)) {
        error_message += "Password must contain at least one Uppercase Letter.<br>";
        error_message += "Password contains at least 1 upper case letter, 1 number and 1 of the following special characters ( / * - + ! @ # $ ^ & * )<br>";
    }

    else if (!special_characters.test(psw)) {
        error_message += "Password must contain one special character.(/*-+!@#$^&*).<br>";
        error_message += "Password contains at least 1 upper case letter, 1 number and 1 of the following special characters ( / * - + ! @ # $ ^ & * )<br>";
    }

    else if (psw !== cpsw) {
        error_message += "Both Passwords must be same. Please check.<br>";
    } else {
        pswCheck = true;
    }

    if (pswCheck && usernameCheck) {
        document.getElementById("registration").submit();
    } else {
        message.innerHTML = error_message;
    }
}