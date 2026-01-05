// Staff Orders JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tab = this.dataset.tab;
            
            // Remove active from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active to clicked tab
            this.classList.add('active');
            document.getElementById(`${tab}-orders`).classList.add('active');
        });
    });

    // Accept order buttons
    document.querySelectorAll('[data-action="accept"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderCard = this.closest('.order-card');
            const orderId = orderCard.dataset.orderId;
            const orderNumber = orderCard.querySelector('.order-number span:last-child').textContent;
            
            if (confirm(`Accept ${orderNumber}?`)) {
                acceptOrder(orderCard, orderId);
            }
        });
    });

    // Reject order buttons
    document.querySelectorAll('[data-action="reject"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderCard = this.closest('.order-card');
            const orderId = orderCard.dataset.orderId;
            const orderNumber = orderCard.querySelector('.order-number span:last-child').textContent;
            
            if (confirm(`Are you sure you want to reject ${orderNumber}?`)) {
                rejectOrder(orderCard, orderId);
            }
        });
    });

    // Mark as Ready buttons
    document.querySelectorAll('[data-action="mark-ready"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderCard = this.closest('.order-card');
            const orderId = orderCard.dataset.orderId;
            
            markAsReady(orderCard, orderId);
        });
    });

    // Mark as Served buttons
    document.querySelectorAll('[data-action="mark-served"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderCard = this.closest('.order-card');
            const orderId = orderCard.dataset.orderId;
            
            markAsServed(orderCard, orderId);
        });
    });

    // Cancel order buttons
    document.querySelectorAll('[data-action="cancel"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderCard = this.closest('.order-card');
            const orderId = orderCard.dataset.orderId;
            const orderNumber = orderCard.querySelector('.order-number span:last-child').textContent;
            
            if (confirm(`Cancel ${orderNumber}? This cannot be undone.`)) {
                cancelOrder(orderCard, orderId);
            }
        });
    });

    function acceptOrder(orderCard, orderId) {
        // Animate out
        orderCard.style.opacity = '0';
        orderCard.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            // Move to in-progress
            const progressTab = document.getElementById('progress-orders').querySelector('.orders-list');
            
            // Update card status
            orderCard.classList.remove('new');
            orderCard.classList.add('progress');
            orderCard.dataset.status = 'preparing';
            
            // Update badge
            const badge = orderCard.querySelector('.priority-badge');
            badge.className = 'status-badge preparing';
            badge.textContent = 'Preparing';
            
            // Add progress bar
            const progressBar = document.createElement('div');
            progressBar.className = 'order-progress-bar';
            progressBar.innerHTML = '<div class="progress-fill" style="width: 30%;"></div>';
            
            const orderItems = orderCard.querySelector('.order-items');
            orderItems.after(progressBar);
            
            // Update actions
            const actionsDiv = orderCard.querySelector('.order-actions');
            actionsDiv.innerHTML = `
                <button class="btn-secondary" data-action="cancel">Cancel</button>
                <button class="btn-primary" data-action="mark-ready">Mark as Ready</button>
            `;
            
            // Attach new event listeners
            actionsDiv.querySelector('[data-action="cancel"]').addEventListener('click', function() {
                if (confirm('Cancel this order? This cannot be undone.')) {
                    cancelOrder(orderCard, orderId);
                }
            });
            
            actionsDiv.querySelector('[data-action="mark-ready"]').addEventListener('click', function() {
                markAsReady(orderCard, orderId);
            });
            
            // Update time
            const timeDetail = orderCard.querySelectorAll('.detail-row')[1];
            timeDetail.innerHTML = `
                <span class="material-icons">access_time</span>
                <span>Started just now</span>
            `;
            
            // Add to progress list
            progressTab.insertBefore(orderCard, progressTab.firstChild);
            
            // Reset styles and show
            orderCard.style.opacity = '0';
            orderCard.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                orderCard.style.transition = 'all 0.3s ease';
                orderCard.style.opacity = '1';
                orderCard.style.transform = 'translateX(0)';
            }, 10);
            
            // Update tab counts
            updateTabCounts();
            
            showSuccessMessage('Order accepted and moved to In Progress');
        }, 300);
    }

    function rejectOrder(orderCard, orderId) {
        orderCard.style.opacity = '0';
        orderCard.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            orderCard.remove();
            updateTabCounts();
            showSuccessMessage('Order rejected');
        }, 300);
    }

    function markAsReady(orderCard, orderId) {
        // Update status
        orderCard.dataset.status = 'ready';
        
        // Update badge
        const badge = orderCard.querySelector('.status-badge');
        badge.className = 'status-badge ready';
        badge.textContent = 'Ready';
        
        // Update progress bar
        const progressFill = orderCard.querySelector('.progress-fill');
        progressFill.style.width = '100%';
        
        // Update actions
        const actionsDiv = orderCard.querySelector('.order-actions');
        actionsDiv.innerHTML = `
            <button class="btn-primary full-width" data-action="mark-served">Mark as Served</button>
        `;
        
        actionsDiv.querySelector('[data-action="mark-served"]').addEventListener('click', function() {
            markAsServed(orderCard, orderId);
        });
        
        // Update time
        const timeDetail = orderCard.querySelectorAll('.detail-row')[1];
        timeDetail.innerHTML = `
            <span class="material-icons">access_time</span>
            <span>Ready just now</span>
        `;
        
        showSuccessMessage('Order marked as ready for serving');
    }

    function markAsServed(orderCard, orderId) {
        // Animate out
        orderCard.style.opacity = '0';
        orderCard.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            // Move to completed
            const completedTab = document.getElementById('completed-orders').querySelector('.orders-list');
            
            // Update card
            orderCard.classList.remove('progress');
            orderCard.classList.add('completed');
            
            // Update badge
            const badge = orderCard.querySelector('.status-badge');
            badge.className = 'status-badge completed';
            badge.textContent = 'Completed';
            
            // Remove progress bar
            const progressBar = orderCard.querySelector('.order-progress-bar');
            if (progressBar) progressBar.remove();
            
            // Remove actions
            const actionsDiv = orderCard.querySelector('.order-actions');
            actionsDiv.remove();
            
            // Update time
            const timeDetail = orderCard.querySelectorAll('.detail-row')[1];
            timeDetail.innerHTML = `
                <span class="material-icons">check_circle</span>
                <span>Completed just now</span>
            `;
            
            // Add total
            const total = document.createElement('div');
            total.className = 'order-total';
            total.innerHTML = `
                <span>Total:</span>
                <span class="total-amount">₱${Math.floor(Math.random() * 500) + 200}</span>
            `;
            orderCard.querySelector('.order-items').after(total);
            
            // Add to completed list
            completedTab.insertBefore(orderCard, completedTab.firstChild);
            
            // Reset styles and show
            orderCard.style.opacity = '0';
            orderCard.style.transform = 'scale(0.95)';
            setTimeout(() => {
                orderCard.style.transition = 'all 0.3s ease';
                orderCard.style.opacity = '1';
                orderCard.style.transform = 'scale(1)';
            }, 10);
            
            // Update tab counts
            updateTabCounts();
            
            showSuccessMessage('Order completed successfully!');
        }, 300);
    }

    function cancelOrder(orderCard, orderId) {
        orderCard.style.opacity = '0';
        orderCard.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            orderCard.remove();
            updateTabCounts();
            showSuccessMessage('Order cancelled');
        }, 300);
    }

    function updateTabCounts() {
        const newCount = document.querySelectorAll('#new-orders .order-card').length;
        const progressCount = document.querySelectorAll('#progress-orders .order-card').length;
        
        tabButtons[0].textContent = `New (${newCount})`;
        tabButtons[1].textContent = `In Progress (${progressCount})`;
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
