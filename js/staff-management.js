// Staff Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const addStaffBtn = document.getElementById('add-staff-btn');
    const staffModal = document.getElementById('staff-modal');
    const closeModalBtn = document.getElementById('close-staff-modal');
    const cancelBtn = document.getElementById('cancel-staff');
    const staffForm = document.getElementById('staff-form');
    const generateCodeBtn = document.getElementById('generate-code-btn');
    const regenerateCodeBtn = document.getElementById('regenerate-code');
    
    let editingStaffId = null;

    // Open modal for adding staff
    addStaffBtn.addEventListener('click', function() {
        openStaffModal('add');
    });

    // Open modal for editing staff
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const staffCard = this.closest('.staff-card');
            const staffId = staffCard.dataset.staffId;
            openStaffModal('edit', staffCard);
        });
    });

    // Close modal
    closeModalBtn.addEventListener('click', closeStaffModal);
    cancelBtn.addEventListener('click', closeStaffModal);
    
    staffModal.querySelector('.modal-overlay').addEventListener('click', closeStaffModal);

    // Deactivate staff
    document.querySelectorAll('.deactivate-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const staffCard = this.closest('.staff-card');
            const staffName = staffCard.querySelector('.staff-card-name').textContent;
            
            if (confirm(`Are you sure you want to deactivate ${staffName}?`)) {
                deactivateStaff(staffCard);
            }
        });
    });

    // Generate invite code
    generateCodeBtn.addEventListener('click', function() {
        const newCode = generateInviteCode();
        addInviteCodeToList(newCode);
        showSuccessMessage('Invite code generated successfully!');
    });

    // Regenerate code in modal
    regenerateCodeBtn.addEventListener('click', function() {
        const codeInput = document.getElementById('generated-code');
        codeInput.value = generateInviteCode();
    });

    // Copy invite codes
    document.querySelectorAll('.copy-code-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const code = this.dataset.code;
            copyToClipboard(code);
        });
    });

    // Form submission
    staffForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('staff-name').value,
            email: document.getElementById('staff-email').value,
            phone: document.getElementById('staff-phone').value,
            role: document.getElementById('staff-role').value,
            code: document.getElementById('generated-code').value
        };

        if (editingStaffId) {
            updateStaff(editingStaffId, formData);
        } else {
            addNewStaff(formData);
        }
        
        closeStaffModal();
    });

    function openStaffModal(mode, staffCard = null) {
        const modalTitle = document.getElementById('staff-modal-title');
        
        if (mode === 'edit' && staffCard) {
            modalTitle.textContent = 'Edit Staff Member';
            editingStaffId = staffCard.dataset.staffId;
            
            // Populate form with existing data
            document.getElementById('staff-name').value = staffCard.querySelector('.staff-card-name').textContent;
            document.getElementById('staff-email').value = staffCard.querySelectorAll('.detail-item')[0].querySelector('span:last-child').textContent;
            document.getElementById('staff-phone').value = staffCard.querySelectorAll('.detail-item')[1].querySelector('span:last-child').textContent;
            document.getElementById('staff-role').value = staffCard.querySelector('.staff-card-role').textContent.toLowerCase();
        } else {
            modalTitle.textContent = 'Add New Staff';
            editingStaffId = null;
            staffForm.reset();
            document.getElementById('generated-code').value = generateInviteCode();
        }
        
        staffModal.classList.add('active');
    }

    function closeStaffModal() {
        staffModal.classList.remove('active');
        staffForm.reset();
        editingStaffId = null;
    }

    function generateInviteCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'GT-2026-';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    function addNewStaff(data) {
        const staffList = document.querySelector('.staff-list');
        const newStaffCard = createStaffCard(data);
        staffList.insertBefore(newStaffCard, staffList.firstChild);
        
        // Update count
        updateStaffCount();
        
        // Attach event listeners to new card
        attachStaffCardEvents(newStaffCard);
        
        showSuccessMessage('Staff member added successfully!');
    }

    function updateStaff(staffId, data) {
        const staffCard = document.querySelector(`[data-staff-id="${staffId}"]`);
        
        staffCard.querySelector('.staff-card-name').textContent = data.name;
        staffCard.querySelector('.staff-card-role').textContent = capitalizeFirst(data.role);
        staffCard.querySelectorAll('.detail-item')[0].querySelector('span:last-child').textContent = data.email;
        staffCard.querySelectorAll('.detail-item')[1].querySelector('span:last-child').textContent = data.phone;
        
        showSuccessMessage('Staff member updated successfully!');
    }

    function deactivateStaff(staffCard) {
        staffCard.style.opacity = '0';
        staffCard.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            staffCard.remove();
            updateStaffCount();
            showSuccessMessage('Staff member deactivated');
        }, 300);
    }

    function createStaffCard(data) {
        const card = document.createElement('div');
        card.className = 'staff-card';
        card.dataset.staffId = Date.now();
        
        card.innerHTML = `
            <div class="staff-card-avatar">
                <span class="material-icons">person</span>
            </div>
            <div class="staff-card-info">
                <div class="staff-card-header">
                    <div>
                        <p class="staff-card-name">${data.name}</p>
                        <p class="staff-card-role">${capitalizeFirst(data.role)}</p>
                    </div>
                    <span class="status-badge active">Active</span>
                </div>
                <div class="staff-card-details">
                    <div class="detail-item">
                        <span class="material-icons">email</span>
                        <span>${data.email}</span>
                    </div>
                    <div class="detail-item">
                        <span class="material-icons">phone</span>
                        <span>${data.phone}</span>
                    </div>
                    <div class="detail-item">
                        <span class="material-icons">calendar_today</span>
                        <span>Joined: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                </div>
            </div>
            <div class="staff-card-actions">
                <button class="action-btn edit-btn" data-action="edit">
                    <span class="material-icons">edit</span>
                </button>
                <button class="action-btn deactivate-btn" data-action="deactivate">
                    <span class="material-icons">block</span>
                </button>
            </div>
        `;
        
        return card;
    }

    function attachStaffCardEvents(card) {
        const editBtn = card.querySelector('.edit-btn');
        const deactivateBtn = card.querySelector('.deactivate-btn');
        
        editBtn.addEventListener('click', function() {
            openStaffModal('edit', card);
        });
        
        deactivateBtn.addEventListener('click', function() {
            const staffName = card.querySelector('.staff-card-name').textContent;
            if (confirm(`Are you sure you want to deactivate ${staffName}?`)) {
                deactivateStaff(card);
            }
        });
    }

    function addInviteCodeToList(code) {
        const codesList = document.querySelector('.invite-codes-list');
        const today = new Date();
        const expiryDate = new Date(today);
        expiryDate.setDate(expiryDate.getDate() + 7);
        
        const codeCard = document.createElement('div');
        codeCard.className = 'invite-code-card';
        codeCard.innerHTML = `
            <div class="code-info">
                <p class="code-value">${code}</p>
                <p class="code-meta">Generated: ${today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • Expires: ${expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <button class="copy-code-btn" data-code="${code}">
                <span class="material-icons">content_copy</span>
            </button>
        `;
        
        codesList.insertBefore(codeCard, codesList.firstChild);
        
        // Attach copy event
        codeCard.querySelector('.copy-code-btn').addEventListener('click', function() {
            copyToClipboard(code);
        });
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showSuccessMessage('Code copied to clipboard!');
        }).catch(() => {
            // Fallback for older browsers
            const temp = document.createElement('textarea');
            temp.value = text;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
            showSuccessMessage('Code copied to clipboard!');
        });
    }

    function updateStaffCount() {
        const count = document.querySelectorAll('.staff-card').length;
        document.querySelector('.section-title').textContent = `Active Staff (${count})`;
    }

    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

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
});
