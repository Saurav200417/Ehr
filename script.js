function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('admin-container').classList.remove('hidden');
    } else if (username === 'user' && password === 'user') {
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('user-container').classList.remove('hidden');
    } else {
        document.getElementById('login-message').textContent = 'Invalid credentials';
    }
}

function logout() {
    document.getElementById('admin-container').classList.add('hidden');
    document.getElementById('user-container').classList.add('hidden');
    document.getElementById('login-container').classList.remove('hidden');
}

document.getElementById('upload-form-admin').addEventListener('submit', function(event) {
    event.preventDefault();
    uploadFile('adminFiles', 'file-name-admin', 'file-cid-admin');
});

document.getElementById('upload-form-user').addEventListener('submit', function(event) {
    event.preventDefault();
    uploadFile('userFiles', 'file-name-user', 'file-cid-user');
});

function uploadFile(storageKey, nameId, cidId) {
    const fileName = document.getElementById(nameId).value;
    const fileCID = document.getElementById(cidId).value;

    const newFile = { name: fileName, cid: fileCID };
    const files = JSON.parse(sessionStorage.getItem(storageKey)) || [];
    files.push(newFile);
    sessionStorage.setItem(storageKey, JSON.stringify(files));

    document.getElementById(nameId).value = '';
    document.getElementById(cidId).value = '';
}
