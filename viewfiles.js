// Load uploaded files from session storage
const uploadedFiles = JSON.parse(sessionStorage.getItem('uploadedFiles')) || [];

// Populate files in the table
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
}

// Ensure the files list is populated on page load
window.onload = function() {
    populateFilesTable();
};
