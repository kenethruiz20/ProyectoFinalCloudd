const API_URL = "http://3.82.35.120:5000";  // Replace with your EC2 instance's public IP

// Function to add a new contact
function addContact() {
    const name = document.getElementById("contact-name").value;
    const phone = document.getElementById("contact-phone").value;
    const email = document.getElementById("contact-email").value;

    if (name && phone && email) {
        fetch(`${API_URL}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                email: email
            })
        })
        .then(response => response.json())
        .then(data => {
            alert("Contact added successfully");
            // Refresh the contact list after adding
            getContacts();
        })
        .catch(error => {
            console.error("Error adding contact:", error);
            alert("Failed to add contact.");
        });
    } else {
        alert("Please fill out all fields.");
    }
}

// Function to get all contacts and display them
function getContacts() {
    fetch(`${API_URL}/contacts`)
        .then(response => response.json())
        .then(contacts => {
            const contactList = document.getElementById("contact-list");
            contactList.innerHTML = "";  // Clear the current list
            contacts.forEach(contact => {
                const li = document.createElement("li");
                li.className = "list-group-item";
                li.innerHTML = `
                    <span>${contact.name} - ${contact.phone} - ${contact.email}</span>
                    <div class="actions">
                        <button class="btn btn-outline-secondary" onclick="editContact(${contact.id})">
                            Edit
                        </button>
                        <button class="btn btn-outline-danger" onclick="deleteContact(${contact.id})">
                            Delete
                        </button>
                    </div>
                `;
                contactList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error fetching contacts:", error);
        });
}

// Function to delete a contact
function deleteContact(contactId) {
    if (confirm("Are you sure you want to delete this contact?")) {
        fetch(`${API_URL}/contacts/${contactId}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(() => {
            alert("Contact deleted successfully.");
            // Refresh the contact list after deletion
            getContacts();
        })
        .catch(error => {
            console.error("Error deleting contact:", error);
            alert("Failed to delete contact.");
        });
    }
}

// Function to edit an existing contact
function editContact(contactId) {
    const newName = prompt("Enter the new name:");
    const newPhone = prompt("Enter the new phone:");
    const newEmail = prompt("Enter the new email:");

    if (newName && newPhone && newEmail) {
        fetch(`${API_URL}/contacts/${contactId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: newName,
                phone: newPhone,
                email: newEmail
            })
        })
        .then(response => response.json())
        .then(data => {
            alert("Contact updated successfully");
            // Refresh the contact list after editing
            getContacts();
        })
        .catch(error => {
            console.error("Error editing contact:", error);
            alert("Failed to edit contact.");
        });
    } else {
        alert("Please fill out all fields.");
    }
}

// Fetch the contact list on page load
document.addEventListener("DOMContentLoaded", getContacts);
