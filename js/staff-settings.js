// Staff Settings JavaScript

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

    // Personal Information Form
    const personalForm = document.getElementById('personal-form');
    personalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate save
        showSuccessMessage('Personal information updated successfully!');
    });

    // Account Settings Form
    const accountSettingsForm = document.getElementById('account-settings-form');
    accountSettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate save
        showSuccessMessage('Account settings updated successfully!');
    });

    // Password Form
    const passwordForm = document.getElementById('staff-password-form');
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('staff-current-password').value;
        const newPassword = document.getElementById('staff-new-password').value;
        const confirmPassword = document.getElementById('staff-confirm-password').value;

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

    // Notifications Form
    const notificationsForm = document.getElementById('staff-notifications-form');
    notificationsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate save
        showSuccessMessage('Notification preferences saved!');
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
