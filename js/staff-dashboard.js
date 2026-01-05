/**
 * Staff Dashboard JavaScript
 * Handles live timers, animations, and dynamic updates
 */

document.addEventListener('DOMContentLoaded', function() {
    initLiveTimers();
    initProgressAnimations();
});

/**
 * Initialize live timers for order cards
 * Updates every minute to show elapsed time
 */
function initLiveTimers() {
    const orderItems = document.querySelectorAll('.order-item[data-order-time]');
    
    // Update timers immediately
    updateTimers(orderItems);
    
    // Update every 60 seconds
    setInterval(() => {
        updateTimers(orderItems);
    }, 60000);
}

/**
 * Update all timer displays
 */
function updateTimers(orderItems) {
    orderItems.forEach(item => {
        const seconds = parseInt(item.dataset.orderTime) || 0;
        const timerEl = item.querySelector('.live-timer');
        
        if (timerEl) {
            // Increment time by 1 minute for simulation
            const currentSeconds = parseInt(item.dataset.orderTime) || 0;
            item.dataset.orderTime = currentSeconds + 60;
            
            const minutes = Math.floor(currentSeconds / 60);
            
            if (minutes < 60) {
                timerEl.textContent = `${minutes}m`;
            } else {
                const hours = Math.floor(minutes / 60);
                const remainingMins = minutes % 60;
                timerEl.textContent = `${hours}h ${remainingMins}m`;
            }
            
            // Update priority class based on wait time
            updatePriorityClass(item, minutes);
        }
    });
}

/**
 * Update priority class based on wait time
 */
function updatePriorityClass(item, minutes) {
    // Only update if not already in progress section
    if (item.closest('#active-orders-list')) {
        item.classList.remove('priority-low', 'priority-medium', 'priority-high');
        
        if (minutes >= 15) {
            item.classList.add('priority-high');
        } else if (minutes >= 10) {
            item.classList.add('priority-medium');
        } else {
            item.classList.add('priority-low');
        }
    }
}

/**
 * Initialize progress bar animations
 */
function initProgressAnimations() {
    const progressBars = document.querySelectorAll('.progress-bar.progress-animated .progress-fill');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        // Animate to target width
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-out';
            bar.style.width = targetWidth;
        }, 100);
    });
}

/**
 * Format time as "X min ago" or "Xh Ym ago"
 */
function formatTimeAgo(minutes) {
    if (minutes < 60) {
        return `${minutes}m`;
    } else {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }
}
