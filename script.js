const users = [
    { username: "user1", password: "p" },
    { username: "user2", password: "p" },
    { username: "admin", password: "a" }
];

// Load uploaded files from session storage or initialize
const uploadedFiles = JSON.parse(sessionStorage.getItem('uploadedFiles')) || [];

function showPopup(message) {
    const popup = document.getElementById("success-popup");
    const popupMessage = document.getElementById("popup-message");
    popupMessage.textContent = message;
    popup.classList.remove("hidden");

    setTimeout(() => {
        popup.classList.add("hidden");
    }, 2000);
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const user = users.find(user => user.username === username && user.password === password);
    const loginMessage = document.getElementById("login-message");

    if (user) {
        showPopup("Login Successful!");
        loginMessage.textContent = "";
        
        // Add the 'logged-in' class to the body
        document.body.classList.add("logged-in");

        if (user.username === "admin") {
            document.getElementById("admin-container").classList.remove("hidden");
        } else {
            document.getElementById("user-container").classList.remove("hidden");
        }
        document.getElementById("login-container").classList.add("hidden");
    } else {
        loginMessage.textContent = "Invalid username or password.";
        loginMessage.style.color = "red";
    }
}

function logout() {
    document.getElementById("login-container").classList.remove("hidden");
    document.getElementById("admin-container").classList.add("hidden");
    document.getElementById("user-container").classList.add("hidden");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("login-message").textContent = "";

    // Remove the 'logged-in' class from the body
    document.body.classList.remove("logged-in");
}


// Admin file upload
document.getElementById("upload-form-admin").addEventListener("submit", (event) => {
    event.preventDefault();
    const fileName = document.getElementById("file-name-admin").value;
    const cid = document.getElementById("file-cid-admin").value;

    uploadedFiles.push({ fileName, cid });
    sessionStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));

    showPopup(`File "${fileName}" uploaded successfully!`);
    event.target.reset();
});

// User file upload
document.getElementById("upload-form-user").addEventListener("submit", (event) => {
    event.preventDefault();
    const fileName = document.getElementById("file-name-user").value;
    const cid = document.getElementById("file-cid-user").value;

    uploadedFiles.push({ fileName, cid });
    sessionStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));

    showPopup(`File "${fileName}" uploaded successfully!`);
    event.target.reset();
});

// Populate files in view-files.html
function populateFilesTable() {
    const filesList = document.getElementById("files-list");
    filesList.innerHTML = "";
    uploadedFiles.forEach((file, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${file.fileName}</td>
            <td>${file.cid}</td>
            <td><button onclick="deleteFile(${index})">Delete</button></td>
        `;
        filesList.appendChild(row);
    });
}

// Delete file function
function deleteFile(index) {
    uploadedFiles.splice(index, 1);
    sessionStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
    populateFilesTable();
    showPopup("File deleted successfully!");
}

// Ensure the files list is populated on page load
window.onload = function() {
    if (document.getElementById("files-list")) {
        populateFilesTable();
    }
};
