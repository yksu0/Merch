// Dashboard functionality for Go Tawee Merchant

document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    updateOnlineStaffCount();
    updatePendingActions();
    renderRevenueSparkline();
    initializeQuickActions();
    
    // Auto-refresh every 30 seconds
    setInterval(() => {
        updateOnlineStaffCount();
        updatePendingActions();
    }, 30000);
}

// Update Online Staff Count
function updateOnlineStaffCount() {
    // Simulate fetching online staff count
    const mockStaff = [
        { name: 'Ana Reyes', status: 'online' },
        { name: 'Maria Santos', status: 'online' },
        { name: 'Juan Cruz', status: 'offline' },
        { name: 'Elena Torres', status: 'online' },
        { name: 'Carlos Mendoza', status: 'offline' }
    ];
    
    const onlineCount = mockStaff.filter(s => s.status === 'online').length;
    const totalCount = mockStaff.length;
    
    const onlineCountEl = document.querySelector('.online-count');
    const totalCountEl = document.querySelector('.total-count');
    
    if (onlineCountEl) {
        onlineCountEl.textContent = onlineCount;
    }
    
    if (totalCountEl) {
        totalCountEl.textContent = ` / ${totalCount}`;
    }
}

// Update Pending Actions
function updatePendingActions() {
    // Simulate fetching pending data
    const pendingData = {
        passwordResets: [
            { name: 'Carlos Mendoza', time: '3 hours ago' }
        ],
        expiringCodes: [
            { code: 'GT-2026-D4E5F6', expiryDate: 'Jan 7', daysLeft: 1 }
        ],
        pendingInvites: 2
    };
    
    updatePasswordResetCard(pendingData.passwordResets);
    updateExpiringCodesCard(pendingData.expiringCodes);
    updatePendingInvitesCard(pendingData.pendingInvites);
    
    // Show/hide "All Caught Up" message
    const totalPending = pendingData.passwordResets.length + 
                        pendingData.expiringCodes.length + 
                        (pendingData.pendingInvites > 0 ? 1 : 0);
    
    const allCaughtUp = document.getElementById('all-caught-up');
    const pendingActionsGrid = document.querySelector('.pending-actions-grid');
    
    if (totalPending === 0) {
        if (allCaughtUp) allCaughtUp.style.display = 'block';
        if (pendingActionsGrid) pendingActionsGrid.style.display = 'none';
    } else {
        if (allCaughtUp) allCaughtUp.style.display = 'none';
        if (pendingActionsGrid) pendingActionsGrid.style.display = 'grid';
    }
}

function updatePasswordResetCard(resets) {
    const card = document.getElementById('password-reset-card');
    if (!card) return;
    
    if (resets.length === 0) {
        card.style.display = 'none';
        return;
    }
    
    card.style.display = 'block';
    
    const countEl = card.querySelector('.pending-count');
    const badgeEl = card.querySelector('.pending-badge');
    
    if (countEl) {
        countEl.textContent = `${resets.length} pending approval`;
    }
    
    if (badgeEl) {
        badgeEl.textContent = resets.length;
    }
    
    // Add approve/deny button listeners
    const approveBtn = card.querySelector('.btn-quick-approve');
    const denyBtn = card.querySelector('.btn-quick-deny');
    
    if (approveBtn) {
        approveBtn.addEventListener('click', function() {
            showSuccessMessage('Password reset approved');
            setTimeout(() => updatePendingActions(), 500);
        });
    }
    
    if (denyBtn) {
        denyBtn.addEventListener('click', function() {
            showSuccessMessage('Password reset denied');
            setTimeout(() => updatePendingActions(), 500);
        });
    }
}

function updateExpiringCodesCard(codes) {
    const card = document.getElementById('expiring-codes-card');
    if (!card) return;
    
    const expiringCodes = codes.filter(c => c.daysLeft <= 2);
    
    if (expiringCodes.length === 0) {
        card.style.display = 'none';
        return;
    }
    
    card.style.display = 'block';
    
    const countEl = card.querySelector('.pending-count');
    
    if (countEl) {
        const label = expiringCodes.length === 1 ? 'code expires' : 'codes expire';
        countEl.textContent = `${expiringCodes.length} ${label} soon`;
    }
    
    // Add copy button listener
    const copyBtn = card.querySelector('.btn-quick-copy');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const code = this.getAttribute('data-code');
            navigator.clipboard.writeText(code).then(() => {
                showSuccessMessage(`Code ${code} copied to clipboard`);
            });
        });
    }
}

function updatePendingInvitesCard(count) {
    const card = document.getElementById('pending-invites-card');
    if (!card) return;
    
    if (count === 0) {
        card.style.display = 'none';
        return;
    }
    
    card.style.display = 'block';
    
    const countEl = card.querySelector('.pending-count');
    const badgeEl = card.querySelector('.pending-badge');
    
    if (countEl) {
        const label = count === 1 ? 'unused code' : 'unused codes';
        countEl.textContent = `${count} ${label}`;
    }
    
    if (badgeEl) {
        badgeEl.textContent = count;
    }
}

// Render Revenue Sparkline
function renderRevenueSparkline() {
    const canvas = document.getElementById('revenue-sparkline');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Mock revenue data for the past 7 days
    const revenueData = [10200, 11500, 9800, 12540, 13200, 11800, 12540];
    const max = Math.max(...revenueData);
    const min = Math.min(...revenueData);
    const range = max - min;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate points
    const padding = 10;
    const usableWidth = width - (padding * 2);
    const usableHeight = height - (padding * 2);
    const stepX = usableWidth / (revenueData.length - 1);
    
    const points = revenueData.map((value, index) => {
        const x = padding + (index * stepX);
        const normalizedValue = (value - min) / range;
        const y = padding + usableHeight - (normalizedValue * usableHeight);
        return { x, y, value };
    });
    
    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(35, 126, 86, 0.3)');
    gradient.addColorStop(1, 'rgba(35, 126, 86, 0)');
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding);
    
    points.forEach((point, index) => {
        if (index === 0) {
            ctx.lineTo(point.x, point.y);
        } else {
            // Smooth curve
            const prevPoint = points[index - 1];
            const midX = (prevPoint.x + point.x) / 2;
            ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, midX, (prevPoint.y + point.y) / 2);
            ctx.quadraticCurveTo(point.x, point.y, point.x, point.y);
        }
    });
    
    ctx.lineTo(points[points.length - 1].x, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    points.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            const prevPoint = points[index - 1];
            const midX = (prevPoint.x + point.x) / 2;
            ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, midX, (prevPoint.y + point.y) / 2);
            ctx.quadraticCurveTo(point.x, point.y, point.x, point.y);
        }
    });
    ctx.strokeStyle = '#237E56';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    
    // Draw points
    points.forEach((point, index) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, index === points.length - 1 ? 5 : 3, 0, 2 * Math.PI);
        ctx.fillStyle = index === points.length - 1 ? '#237E56' : '#FDFDFA';
        ctx.fill();
        ctx.strokeStyle = '#237E56';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

// Initialize Quick Actions
function initializeQuickActions() {
    const generateCodeBtn = document.getElementById('quick-generate-code');
    
    if (generateCodeBtn) {
        generateCodeBtn.addEventListener('click', function() {
            // Redirect to staff management page with generate code modal open
            window.location.href = 'owner-staff.html#generate-code';
        });
    }
}

// Success Message (reuse from app.js if exists, or define here)
function showSuccessMessage(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.innerHTML = `
        <span class="material-icons">check_circle</span>
        <span>${message}</span>
    `;
    
    // Add styles if not exists
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .success-toast {
                position: fixed;
                bottom: 24px;
                left: 50%;
                transform: translateX(-50%);
                background: #28A745;
                color: white;
                padding: 14px 20px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 14px;
                font-weight: 500;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                animation: slideUp 0.3s ease;
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            
            .success-toast .material-icons {
                font-size: 20px;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideUp 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}
