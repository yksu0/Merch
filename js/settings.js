// Settings Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Password toggle functionality
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const input = document.getElementById(targetId);
            const icon = this.querySelector('.material-icons');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.textContent = 'visibility';
            } else {
                input.type = 'password';
                icon.textContent = 'visibility_off';
            }
        });
    });

    // Restaurant Profile Form
    const restaurantForm = document.getElementById('restaurant-form');
    restaurantForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate save
        showSuccessMessage('Restaurant profile updated successfully!');
    });

    // Account Form
    const accountForm = document.getElementById('account-form');
    accountForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate save
        showSuccessMessage('Account information updated successfully!');
    });

    // Password Form
    const passwordForm = document.getElementById('password-form');
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validate passwords
        if (newPassword !== confirmPassword) {
            showErrorMessage('New passwords do not match!');
            return;
        }

        if (newPassword.length < 8) {
            showErrorMessage('Password must be at least 8 characters!');
            return;
        }

        // Check password complexity
        const hasUpperCase = /[A-Z]/.test(newPassword);
        const hasLowerCase = /[a-z]/.test(newPassword);
        const hasNumber = /[0-9]/.test(newPassword);

        if (!hasUpperCase || !hasLowerCase || !hasNumber) {
            showErrorMessage('Password must include uppercase, lowercase, and numbers!');
            return;
        }

        // Simulate save
        showSuccessMessage('Password changed successfully!');
        passwordForm.reset();
    });

    // Business Form
    const businessForm = document.getElementById('business-form');
    businessForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate save
        showSuccessMessage('Business information updated successfully!');
    });

    // Notifications Form
    const notificationsForm = document.getElementById('notifications-form');
    notificationsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate save
        showSuccessMessage('Notification preferences saved!');
    });

    // Delete Account
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    deleteAccountBtn.addEventListener('click', function() {
        const confirmed = confirm(
            'Are you absolutely sure you want to delete your account?\n\n' +
            'This action cannot be undone and will permanently delete:\n' +
            '• All restaurant data\n' +
            '• Menu items\n' +
            '• Staff accounts\n' +
            '• Order history\n' +
            '• Analytics data\n\n' +
            'Type "DELETE" to confirm.'
        );

        if (confirmed) {
            const verification = prompt('Type "DELETE" to confirm account deletion:');
            
            if (verification === 'DELETE') {
                showErrorMessage('Account deletion initiated. You will be logged out shortly.');
                
                // Simulate account deletion
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 3000);
            } else {
                showErrorMessage('Account deletion cancelled - verification failed.');
            }
        }
    });

    // Toggle switches - add visual feedback
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const notificationItem = this.closest('.notification-item');
            if (this.checked) {
                notificationItem.style.opacity = '1';
            } else {
                notificationItem.style.opacity = '0.6';
            }
        });
    });

    function showSuccessMessage(message) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'success-message';
        msgDiv.innerHTML = `
            <span class="material-icons">check_circle</span>
            <span>${message}</span>
        `;
        
        document.body.appendChild(msgDiv);
        
        setTimeout(() => {
            msgDiv.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            msgDiv.classList.remove('show');
            setTimeout(() => {
                msgDiv.remove();
            }, 300);
        }, 3000);
    }

    function showErrorMessage(message) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'error-message';
        msgDiv.innerHTML = `
            <span class="material-icons">error</span>
            <span>${message}</span>
        `;
        
        document.body.appendChild(msgDiv);
        
        setTimeout(() => {
            msgDiv.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            msgDiv.classList.remove('show');
            setTimeout(() => {
                msgDiv.remove();
            }, 300);
        }, 3000);
    }
});
