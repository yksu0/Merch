// Staff Management JavaScript - Enhanced Version

document.addEventListener('DOMContentLoaded', function() {
    // ===== Elements =====
    const staffSearch = document.getElementById('staff-search');
    const searchClear = document.getElementById('search-clear');
    const deactivatedHeader = document.getElementById('deactivated-header');
    const deactivatedContent = document.getElementById('deactivated-content');
    const deactivatedSection = document.getElementById('deactivated-section');
    
    // Modals
    const staffDetailsModal = document.getElementById('staff-details-modal');
    const closeDetailsModal = document.getElementById('close-details-modal');
    const closeDetailsBtn = document.getElementById('close-details-btn');
    const generateCodeModal = document.getElementById('generate-code-modal');
    const closeGenerateModal = document.getElementById('close-generate-modal');
    const generateCodeBtn = document.getElementById('generate-code-btn');
    const saveCodeBtn = document.getElementById('save-code');
    const cancelGenerateBtn = document.getElementById('cancel-generate');
    
    // Buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    const deactivateButtons = document.querySelectorAll('.deactivate-btn');
    const reactivateButtons = document.querySelectorAll('.reactivate-btn');
    const copyCodeButtons = document.querySelectorAll('.copy-code-btn');
    const deleteCodeButtons = document.querySelectorAll('.delete-code-btn');
    const approveButtons = document.querySelectorAll('.btn-approve');
    const denyButtons = document.querySelectorAll('.btn-deny');
    
    // ===== Search Functionality =====
    staffSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        const staffCards = document.querySelectorAll('.staff-card');
        
        if (searchTerm) {
            searchClear.style.display = 'flex';
        } else {
            searchClear.style.display = 'none';
        }
        
        staffCards.forEach(card => {
            const staffName = card.querySelector('.staff-card-name').textContent.toLowerCase();
            if (staffName.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    searchClear.addEventListener('click', function() {
        staffSearch.value = '';
        staffSearch.dispatchEvent(new Event('input'));
        staffSearch.focus();
    });
    
    // ===== Collapsible Deactivated Section =====
    if (deactivatedHeader) {
        deactivatedHeader.addEventListener('click', function() {
            if (deactivatedSection.classList.contains('collapsed')) {
                deactivatedSection.classList.remove('collapsed');
                deactivatedContent.style.display = 'block';
            } else {
                deactivatedSection.classList.add('collapsed');
                deactivatedContent.style.display = 'none';
            }
        });
    }
    
    // ===== View Staff Details Modal =====
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const staffCard = this.closest('.staff-card');
            openStaffDetailsModal(staffCard);
        });
    });
    
    function openStaffDetailsModal(staffCard) {
        const name = staffCard.querySelector('.staff-card-name').textContent;
        const role = staffCard.querySelector('.staff-card-role').textContent;
        const email = staffCard.querySelector('.detail-item:nth-child(1) span:last-child').textContent;
        const phone = staffCard.querySelector('.detail-item:nth-child(2) span:last-child').textContent;
        const joinDate = staffCard.querySelector('.detail-item:nth-child(3) span:last-child').textContent;
        const statusBadge = staffCard.querySelector('.status-badge').cloneNode(true);
        const lastSeen = staffCard.querySelector('.last-seen')?.textContent || 'Currently online';
        
        // Populate modal
        document.getElementById('details-name').textContent = name;
        document.getElementById('details-role').textContent = role;
        document.getElementById('details-email').textContent = email;
        document.getElementById('details-phone').textContent = phone;
        document.getElementById('details-join-date').textContent = joinDate;
        document.getElementById('details-created-date').textContent = joinDate;
        document.getElementById('details-invite-code').textContent = 'GT-2026-A1B2C3';
        document.getElementById('details-last-seen').textContent = lastSeen;
        
        const statusContainer = document.getElementById('details-status');
        statusContainer.innerHTML = '';
        statusContainer.appendChild(statusBadge);
        
        staffDetailsModal.style.display = 'flex';
        setTimeout(() => staffDetailsModal.classList.add('active'), 10);
    }
    
    function closeStaffDetails() {
        staffDetailsModal.classList.remove('active');
        setTimeout(() => staffDetailsModal.style.display = 'none', 300);
    }
    
    closeDetailsModal.addEventListener('click', closeStaffDetails);
    closeDetailsBtn.addEventListener('click', closeStaffDetails);
    staffDetailsModal.querySelector('.modal-overlay').addEventListener('click', closeStaffDetails);
    
    // Deactivate from details modal
    document.getElementById('details-deactivate-btn').addEventListener('click', function() {
        const staffName = document.getElementById('details-name').textContent;
        if (confirm(`Are you sure you want to deactivate ${staffName}?`)) {
            showSuccessMessage(`${staffName} has been deactivated`);
            closeStaffDetails();
            // In production: update backend and move card to deactivated section
        }
    });
    
    // ===== Deactivate/Reactivate Staff =====
    deactivateButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const staffCard = this.closest('.staff-card');
            const staffName = staffCard.querySelector('.staff-card-name').textContent;
            
            if (confirm(`Are you sure you want to deactivate ${staffName}?`)) {
                // Update UI
                staffCard.classList.add('deactivated');
                const statusBadge = staffCard.querySelector('.status-badge');
                statusBadge.className = 'status-badge deactivated';
                statusBadge.innerHTML = '<span class="status-dot"></span> Deactivated';
                
                // Update last seen
                const statusWrapper = staffCard.querySelector('.staff-status-wrapper');
                let lastSeenEl = statusWrapper.querySelector('.last-seen');
                if (!lastSeenEl) {
                    lastSeenEl = document.createElement('p');
                    lastSeenEl.className = 'last-seen';
                    statusWrapper.appendChild(lastSeenEl);
                }
                lastSeenEl.textContent = 'Deactivated on Jan 6, 2026';
                
                // Change button to reactivate
                this.className = 'action-btn reactivate-btn';
                this.setAttribute('data-action', 'reactivate');
                this.title = 'Reactivate';
                this.innerHTML = '<span class="material-icons">check_circle</span>';
                
                // Attach reactivate listener
                this.removeEventListener('click', arguments.callee);
                this.addEventListener('click', handleReactivate);
                
                // Update counts
                updateStaffCounts();
                
                showSuccessMessage(`${staffName} has been deactivated`);
            }
        });
    });
    
    function handleReactivate(e) {
        e.stopPropagation();
        const staffCard = this.closest('.staff-card');
        const staffName = staffCard.querySelector('.staff-card-name').textContent;
        
        if (confirm(`Reactivate ${staffName}?`)) {
            // Update UI
            staffCard.classList.remove('deactivated');
            const statusBadge = staffCard.querySelector('.status-badge');
            statusBadge.className = 'status-badge offline';
            statusBadge.innerHTML = '<span class="status-dot"></span> Offline';
            
            // Update last seen
            const statusWrapper = staffCard.querySelector('.staff-status-wrapper');
            const lastSeenEl = statusWrapper.querySelector('.last-seen');
            if (lastSeenEl) {
                lastSeenEl.textContent = 'Last seen just now';
            }
            
            // Change button back to deactivate
            this.className = 'action-btn deactivate-btn';
            this.setAttribute('data-action', 'deactivate');
            this.title = 'Deactivate';
            this.innerHTML = '<span class="material-icons">block</span>';
            
            // Update counts
            updateStaffCounts();
            
            showSuccessMessage(`${staffName} has been reactivated`);
        }
    }
    
    reactivateButtons.forEach(btn => {
        btn.addEventListener('click', handleReactivate);
    });
    
    // ===== Generate Invite Code =====
    generateCodeBtn.addEventListener('click', function() {
        const newCode = generateRandomCode();
        document.getElementById('preview-code-value').textContent = newCode;
        updateExpiryPreview();
        
        generateCodeModal.style.display = 'flex';
        setTimeout(() => generateCodeModal.classList.add('active'), 10);
    });
    
    document.getElementById('code-expiry-duration').addEventListener('change', updateExpiryPreview);
    
    function updateExpiryPreview() {
        const days = parseInt(document.getElementById('code-expiry-duration').value);
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + days);
        const formatted = expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        document.getElementById('preview-expiry-date').textContent = formatted;
    }
    
    function generateRandomCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'GT-2026-';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }
    
    function closeGenerateCodeModal() {
        generateCodeModal.classList.remove('active');
        setTimeout(() => generateCodeModal.style.display = 'none', 300);
    }
    
    closeGenerateModal.addEventListener('click', closeGenerateCodeModal);
    cancelGenerateBtn.addEventListener('click', closeGenerateCodeModal);
    generateCodeModal.querySelector('.modal-overlay').addEventListener('click', closeGenerateCodeModal);
    
    saveCodeBtn.addEventListener('click', function() {
        const code = document.getElementById('preview-code-value').textContent;
        const expiry = document.getElementById('preview-expiry-date').textContent;
        
        // Copy to clipboard
        navigator.clipboard.writeText(code).then(() => {
            showSuccessMessage(`Code ${code} copied to clipboard!`);
            closeGenerateCodeModal();
            
            // Add to list (in production: save to backend)
            addCodeToList(code, expiry);
            updateStaffCounts();
        });
    });
    
    function addCodeToList(code, expiry) {
        const codesList = document.getElementById('pending-codes-list');
        const newCard = document.createElement('div');
        newCard.className = 'invite-code-card';
        newCard.innerHTML = `
            <div class="code-info">
                <p class="code-value">${code}</p>
                <p class="code-meta">
                    <span class="code-status-badge unused">Unused</span>
                    <span class="code-expiry">Expires ${expiry}</span>
                </p>
            </div>
            <div class="code-actions">
                <button class="copy-code-btn" data-code="${code}" title="Copy Code">
                    <span class="material-icons">content_copy</span>
                </button>
                <button class="delete-code-btn" data-code="${code}" title="Delete Code">
                    <span class="material-icons">delete_outline</span>
                </button>
            </div>
        `;
        codesList.insertBefore(newCard, codesList.firstChild);
        
        // Attach event listeners
        newCard.querySelector('.copy-code-btn').addEventListener('click', handleCopyCode);
        newCard.querySelector('.delete-code-btn').addEventListener('click', handleDeleteCode);
    }
    
    // ===== Copy Invite Code =====
    function handleCopyCode() {
        const code = this.getAttribute('data-code');
        navigator.clipboard.writeText(code).then(() => {
            showSuccessMessage(`Code ${code} copied to clipboard!`);
        });
    }
    
    copyCodeButtons.forEach(btn => {
        btn.addEventListener('click', handleCopyCode);
    });
    
    // ===== Delete Invite Code =====
    function handleDeleteCode() {
        const code = this.getAttribute('data-code');
        if (confirm(`Delete invite code ${code}?`)) {
            this.closest('.invite-code-card').remove();
            updateStaffCounts();
            showSuccessMessage(`Code ${code} deleted`);
        }
    }
    
    deleteCodeButtons.forEach(btn => {
        btn.addEventListener('click', handleDeleteCode);
    });
    
    // ===== Password Reset Requests =====
    approveButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const requestCard = this.closest('.reset-request-card');
            const staffName = requestCard.querySelector('.request-name').textContent;
            
            if (confirm(`Approve password reset for ${staffName}?`)) {
                requestCard.remove();
                updateResetRequestsCount();
                showSuccessMessage(`Password reset approved for ${staffName}`);
            }
        });
    });
    
    denyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const requestCard = this.closest('.reset-request-card');
            const staffName = requestCard.querySelector('.request-name').textContent;
            
            if (confirm(`Deny password reset for ${staffName}?`)) {
                requestCard.remove();
                updateResetRequestsCount();
                showSuccessMessage(`Password reset denied for ${staffName}`);
            }
        });
    });
    
    // ===== Update Counts =====
    function updateStaffCounts() {
        const activeStaff = document.querySelectorAll('.staff-card:not(.deactivated)').length;
        const deactivatedStaff = document.querySelectorAll('.staff-card.deactivated').length;
        const onlineStaff = document.querySelectorAll('.status-badge.online').length;
        const pendingCodes = document.querySelectorAll('.invite-code-card').length;
        
        document.getElementById('total-active-staff').textContent = activeStaff;
        document.getElementById('currently-online').textContent = onlineStaff;
        document.getElementById('pending-invites').textContent = pendingCodes;
        document.getElementById('pending-invites-count').textContent = pendingCodes;
        document.getElementById('deactivated-count').textContent = deactivatedStaff;
        
        // Update section title
        document.querySelector('.staff-list').closest('.section-card').querySelector('.section-title').textContent = 
            `Active Staff (${activeStaff})`;
    }
    
    function updateResetRequestsCount() {
        const count = document.querySelectorAll('.reset-request-card').length;
        document.getElementById('reset-requests-count').textContent = count;
        
        // Hide section if no requests
        if (count === 0) {
            document.getElementById('password-reset-section').style.display = 'none';
        }
    }
    
    // Initialize
    updateStaffCounts();
});

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
