// Utility functions for Go Tawee Merchant

// Loading State Management
function showLoading(message = 'Loading...') {
    // Remove existing overlay if any
    hideLoading();
    
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay active';
    overlay.id = 'loadingOverlay';
    
    overlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <div class="loading-text">${message}</div>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    }
}

// Empty State Component
function createEmptyState(config) {
    const { icon, title, description, actionText, actionCallback } = config;
    
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state fade-in';
    
    let actionButton = '';
    if (actionText && actionCallback) {
        actionButton = `<button class="empty-state-action" onclick="${actionCallback}">${actionText}</button>`;
    }
    
    emptyState.innerHTML = `
        <div class="empty-state-icon">
            <span class="material-icons">${icon}</span>
        </div>
        <h3 class="empty-state-title">${title}</h3>
        <p class="empty-state-description">${description}</p>
        ${actionButton}
    `;
    
    return emptyState;
}

// Show empty state in a container
function showEmptyState(containerId, config) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    // Add empty state
    const emptyState = createEmptyState(config);
    container.appendChild(emptyState);
}

// Success Message
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message fade-in';
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--turf-green);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(35, 126, 86, 0.3);
        z-index: 10000;
        font-size: 14px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        max-width: 90%;
    `;
    
    messageDiv.innerHTML = `
        <span class="material-icons" style="font-size: 20px;">check_circle</span>
        <span>${message}</span>
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateX(-50%) translateY(-10px)';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Error Message
function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message fade-in';
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #DC3545;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        z-index: 10000;
        font-size: 14px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        max-width: 90%;
    `;
    
    messageDiv.innerHTML = `
        <span class="material-icons" style="font-size: 20px;">error</span>
        <span>${message}</span>
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateX(-50%) translateY(-10px)';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Confirmation Dialog
function showConfirmDialog(message, onConfirm, onCancel) {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay active';
    overlay.style.background = 'rgba(24, 53, 38, 0.9)';
    
    overlay.innerHTML = `
        <div style="
            background: white;
            padding: 24px;
            border-radius: 16px;
            max-width: 340px;
            width: 90%;
            text-align: center;
        ">
            <div style="
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: rgba(253, 188, 34, 0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
            ">
                <span class="material-icons" style="font-size: 32px; color: var(--amber-flame);">
                    warning
                </span>
            </div>
            <h3 style="font-size: 18px; font-weight: 700; color: var(--evergreen); margin: 0 0 12px 0;">
                Confirm Action
            </h3>
            <p style="font-size: 14px; color: rgba(24, 53, 38, 0.7); margin: 0 0 24px 0; line-height: 1.5;">
                ${message}
            </p>
            <div style="display: flex; gap: 12px;">
                <button id="confirmCancel" style="
                    flex: 1;
                    padding: 12px;
                    background: rgba(24, 53, 38, 0.1);
                    color: var(--evergreen);
                    border: none;
                    border-radius: 10px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                ">Cancel</button>
                <button id="confirmOk" style="
                    flex: 1;
                    padding: 12px;
                    background: var(--turf-green);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                ">Confirm</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    const confirmBtn = overlay.querySelector('#confirmOk');
    const cancelBtn = overlay.querySelector('#confirmCancel');
    
    confirmBtn.addEventListener('click', () => {
        overlay.remove();
        if (onConfirm) onConfirm();
    });
    
    cancelBtn.addEventListener('click', () => {
        overlay.remove();
        if (onCancel) onCancel();
    });
}

// Skeleton Loading
function showSkeleton(containerId, count = 3) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton skeleton-card';
        container.appendChild(skeleton);
    }
}

// Format Currency
function formatCurrency(amount) {
    return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Format Date
function formatDate(date) {
    const d = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return d.toLocaleDateString('en-US', options);
}

// Format Time
function formatTime(date) {
    const d = new Date(date);
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return d.toLocaleTimeString('en-US', options);
}

// Format Date Time
function formatDateTime(date) {
    return `${formatDate(date)} at ${formatTime(date)}`;
}

// Time Ago
function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    
    return "Just now";
}

// Debounce function for search inputs
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Copy to Clipboard with feedback
function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showSuccessMessage(successMessage);
        }).catch(() => {
            fallbackCopyToClipboard(text, successMessage);
        });
    } else {
        fallbackCopyToClipboard(text, successMessage);
    }
}

function fallbackCopyToClipboard(text, successMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showSuccessMessage(successMessage);
    } catch (err) {
        showErrorMessage('Failed to copy');
    }
    
    document.body.removeChild(textArea);
}

// Validate Email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate Phone (Philippine format)
function isValidPhone(phone) {
    const re = /^(\+63|0)?9\d{9}$/;
    return re.test(phone.replace(/[\s-]/g, ''));
}

// Generate Random ID
function generateId(prefix = 'GT') {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `${prefix}-${timestamp}-${random}`;
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showLoading,
        hideLoading,
        createEmptyState,
        showEmptyState,
        showSuccessMessage,
        showErrorMessage,
        showConfirmDialog,
        showSkeleton,
        formatCurrency,
        formatDate,
        formatTime,
        formatDateTime,
        timeAgo,
        debounce,
        copyToClipboard,
        isValidEmail,
        isValidPhone,
        generateId
    };
}
