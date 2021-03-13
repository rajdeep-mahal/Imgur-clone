var authLinks = document.getElementById('auth-links');
var userLinks = document.getElementById('user-links');

function logOutClick() {    
    var fetchURL = 'http://localhost:3000/users/logout';
    var fectchOptions = {
        method: 'post',
        body: '',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(fetchURL, fectchOptions)
        .then((data) => {
            location.replace('/login');
        })
        .catch((err) => {
            location.reload();
        });
};

if(document.cookie.includes('csid')) {
    var logoutButton = document.getElementById('logout-button');
    logoutButton.onclick = logOutClick;
    userLinks.removeAttribute('hidden');
} else {
    authLinks.removeAttribute('hidden');
}