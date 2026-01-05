// Enhanced Staff Orders JavaScript with Live Timers, Search, Modal, and Print

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const searchInput = document.getElementById('orders-search-input');
    const orderDetailsModal = document.getElementById('order-details-modal');
    const closeModalBtn = document.getElementById('close-order-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const printBtn = document.getElementById('print-receipt-btn');

    // Start live timers
    startLiveTimers();
    updateUrgencyIndicators();
    updateStats();

    // Update timers every second
    setInterval(() => {
        updateLiveTimers();
        updateUrgencyIndicators();
        updateStats();
    }, 1000);

    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tab = this.dataset.tab;
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${tab}-orders`).classList.add('active');
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterOrders(searchTerm);
        });
    }

    // View order details buttons
    document.querySelectorAll('.view-order-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            const orderCard = this.closest('.order-card');
            showOrderDetails(orderCard);
        });
    });

    // Close modal
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeOrderModal);
    if (closeBtn) closeBtn.addEventListener('click', closeOrderModal);
    if (orderDetailsModal) {
        orderDetailsModal.querySelector('.modal-overlay').addEventListener('click', closeOrderModal);
    }

    // Print receipt
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            printReceipt();
        });
    }

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

    // Live Timer Functions
    function startLiveTimers() {
        const timers = document.querySelectorAll('.live-timer');
        timers.forEach(timer => {
            const timestamp = parseInt(timer.dataset.timestamp);
            if (timestamp) {
                updateTimerDisplay(timer, timestamp);
            }
        });
    }

    function updateLiveTimers() {
        const timers = document.querySelectorAll('.live-timer');
        timers.forEach(timer => {
            const timestamp = parseInt(timer.dataset.timestamp);
            if (timestamp) {
                updateTimerDisplay(timer, timestamp);
            }
        });
    }

    function updateTimerDisplay(timer, timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        
        if (minutes < 1) {
            timer.textContent = 'Just now';
        } else if (minutes === 1) {
            timer.textContent = '1m ago';
        } else {
            timer.textContent = `${minutes}m ago`;
        }
        
        // Add urgent class if over 10 minutes
        if (minutes >= 10) {
            timer.classList.add('urgent');
        } else {
            timer.classList.remove('urgent');
        }
    }

    function updateUrgencyIndicators() {
        const orderCards = document.querySelectorAll('.order-card.new, .order-card.progress');
        orderCards.forEach(card => {
            const timestamp = parseInt(card.dataset.timestamp);
            if (timestamp) {
                const now = Date.now();
                const diff = now - timestamp;
                const minutes = Math.floor(diff / 60000);
                
                if (minutes >= 15) {
                    card.classList.add('urgent');
                } else {
                    card.classList.remove('urgent');
                }
            }
        });
    }

    function updateStats() {
        const newOrders = document.querySelectorAll('#new-orders .order-card').length;
        const progressOrders = document.querySelectorAll('#progress-orders .order-card').length;
        const totalPending = newOrders + progressOrders;
        
        // Update counts
        document.getElementById('new-count').textContent = newOrders;
        document.getElementById('progress-count').textContent = progressOrders;
        document.getElementById('total-pending').textContent = totalPending;
        
        // Calculate longest wait
        let longestWait = 0;
        document.querySelectorAll('.order-card.new, .order-card.progress').forEach(card => {
            const timestamp = parseInt(card.dataset.timestamp);
            if (timestamp) {
                const diff = Date.now() - timestamp;
                const minutes = Math.floor(diff / 60000);
                if (minutes > longestWait) {
                    longestWait = minutes;
                }
            }
        });
        
        document.getElementById('longest-wait').textContent = longestWait > 0 ? `${longestWait}m` : '0m';
    }

    // Search Filter
    function filterOrders(searchTerm) {
        const allOrders = document.querySelectorAll('.order-card');
        
        allOrders.forEach(card => {
            const orderNumber = card.querySelector('.order-number span:last-child').textContent.toLowerCase();
            const customer = card.querySelector('.detail-row span:last-child').textContent.toLowerCase();
            const items = Array.from(card.querySelectorAll('.item-name')).map(item => item.textContent.toLowerCase()).join(' ');
            
            const matches = orderNumber.includes(searchTerm) || customer.includes(searchTerm) || items.includes(searchTerm);
            
            if (matches || searchTerm === '') {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Modal Functions
    function showOrderDetails(orderCard) {
        const orderNumber = orderCard.querySelector('.order-number span:last-child').textContent;
        const table = orderCard.querySelectorAll('.detail-row')[0].querySelector('span:last-child').textContent;
        const time = orderCard.querySelectorAll('.detail-row')[1].querySelector('span:last-child').textContent;
        const items = orderCard.querySelectorAll('.order-item');
        const notesEl = orderCard.querySelector('.order-notes span:last-child');
        const totalEl = orderCard.querySelector('.total-amount');
        const statusBadge = orderCard.querySelector('.priority-badge, .status-badge');
        
        // Set modal content
        document.getElementById('modal-order-number').textContent = orderNumber;
        document.getElementById('modal-table').textContent = table;
        document.getElementById('modal-placed-time').textContent = time;
        document.getElementById('modal-status').textContent = statusBadge ? statusBadge.textContent : 'New';
        document.getElementById('modal-priority').textContent = statusBadge ? statusBadge.textContent : '-';
        
        // Set items
        const itemsList = document.getElementById('modal-items-list');
        itemsList.innerHTML = '';
        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'order-item';
            itemDiv.innerHTML = `
                <span>${item.querySelector('.item-qty').textContent} ${item.querySelector('.item-name').textContent}</span>
            `;
            itemsList.appendChild(itemDiv);
        });
        
        // Set notes
        const notesSection = document.getElementById('modal-notes-section');
        if (notesEl) {
            notesSection.style.display = 'block';
            document.getElementById('modal-notes').textContent = notesEl.textContent;
        } else {
            notesSection.style.display = 'none';
        }
        
        // Set total
        const totalSection = document.getElementById('modal-total-section');
        const printButton = document.getElementById('print-receipt-btn');
        if (totalEl) {
            totalSection.style.display = 'block';
            printButton.style.display = 'flex';
            document.getElementById('modal-total').textContent = totalEl.textContent;
        } else {
            totalSection.style.display = 'none';
            printButton.style.display = 'none';
        }
        
        // Show modal
        orderDetailsModal.classList.add('active');
    }

    function closeOrderModal() {
        orderDetailsModal.classList.remove('active');
    }

    function printReceipt() {
        const orderNumber = document.getElementById('modal-order-number').textContent;
        const table = document.getElementById('modal-table').textContent;
        const items = document.getElementById('modal-items-list').innerHTML;
        const total = document.getElementById('modal-total').textContent;
        
        const printWindow = window.open('', '', 'height=600,width=400');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Receipt - ${orderNumber}</title>
                    <style>
                        body { font-family: monospace; padding: 20px; max-width: 400px; margin: 0 auto; }
                        h2 { text-align: center; margin-bottom: 20px; }
                        .header { text-align: center; border-bottom: 2px dashed #000; padding-bottom: 10px; margin-bottom: 20px; }
                        .items { margin: 20px 0; }
                        .item { padding: 5px 0; }
                        .total { border-top: 2px dashed #000; padding-top: 10px; margin-top: 20px; font-size: 18px; font-weight: bold; text-align: right; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2>Go Tawee Restaurant</h2>
                        <p>${orderNumber}</p>
                        <p>${table}</p>
                        <p>${new Date().toLocaleString()}</p>
                    </div>
                    <div class="items">
                        ${items}
                    </div>
                    <div class="total">
                        Total: ${total}
                    </div>
                    <p style="text-align: center; margin-top: 30px;">Thank you for your order!</p>
                </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    }

    // Order Action Functions
    function acceptOrder(orderCard, orderId) {
        orderCard.style.opacity = '0';
        orderCard.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            const progressTab = document.getElementById('progress-orders').querySelector('.orders-list');
            
            orderCard.classList.remove('new');
            orderCard.classList.add('progress');
            orderCard.dataset.status = 'preparing';
            orderCard.dataset.timestamp = Date.now();
            
            const badge = orderCard.querySelector('.priority-badge');
            badge.className = 'status-badge preparing';
            badge.textContent = 'Preparing';
            
            const progressBar = document.createElement('div');
            progressBar.className = 'order-progress-bar';
            progressBar.innerHTML = '<div class="progress-fill" style="width: 30%;"></div>';
            
            const orderItems = orderCard.querySelector('.order-items');
            orderItems.after(progressBar);
            
            const actionsDiv = orderCard.querySelector('.order-actions');
            actionsDiv.innerHTML = `
                <button class="btn-secondary" data-action="cancel">Cancel</button>
                <button class="btn-primary" data-action="mark-ready">Mark as Ready</button>
            `;
            
            actionsDiv.querySelector('[data-action="cancel"]').addEventListener('click', function() {
                if (confirm('Cancel this order? This cannot be undone.')) {
                    cancelOrder(orderCard, orderId);
                }
            });
            
            actionsDiv.querySelector('[data-action="mark-ready"]').addEventListener('click', function() {
                markAsReady(orderCard, orderId);
            });
            
            const timeDetail = orderCard.querySelectorAll('.detail-row')[1];
            const timerSpan = timeDetail.querySelector('.live-timer');
            timerSpan.dataset.timestamp = Date.now();
            
            progressTab.insertBefore(orderCard, progressTab.firstChild);
            
            orderCard.style.opacity = '0';
            orderCard.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                orderCard.style.transition = 'all 0.3s ease';
                orderCard.style.opacity = '1';
                orderCard.style.transform = 'translateX(0)';
            }, 10);
            
            updateStats();
            showToast('Order accepted and moved to In Progress');
        }, 300);
    }

    function rejectOrder(orderCard, orderId) {
        orderCard.style.opacity = '0';
        orderCard.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            orderCard.remove();
            updateStats();
            showToast('Order rejected');
        }, 300);
    }

    function markAsReady(orderCard, orderId) {
        orderCard.dataset.status = 'ready';
        
        const badge = orderCard.querySelector('.status-badge');
        badge.className = 'status-badge ready';
        badge.textContent = 'Ready';
        
        const progressFill = orderCard.querySelector('.progress-fill');
        progressFill.style.width = '100%';
        
        const actionsDiv = orderCard.querySelector('.order-actions');
        actionsDiv.innerHTML = `
            <button class="btn-primary full-width" data-action="mark-served">Mark as Served</button>
        `;
        
        actionsDiv.querySelector('[data-action="mark-served"]').addEventListener('click', function() {
            markAsServed(orderCard, orderId);
        });
        
        showToast('Order marked as ready for serving');
    }

    function markAsServed(orderCard, orderId) {
        orderCard.style.opacity = '0';
        orderCard.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            const completedTab = document.getElementById('completed-orders').querySelector('.orders-list');
            
            orderCard.classList.remove('progress');
            orderCard.classList.add('completed');
            
            const badge = orderCard.querySelector('.status-badge');
            badge.className = 'status-badge completed';
            badge.textContent = 'Completed';
            
            const progressBar = orderCard.querySelector('.order-progress-bar');
            if (progressBar) progressBar.remove();
            
            const actionsDiv = orderCard.querySelector('.order-actions');
            actionsDiv.remove();
            
            const timeDetail = orderCard.querySelectorAll('.detail-row')[1];
            timeDetail.innerHTML = `
                <span class="material-icons">check_circle</span>
                <span>Completed just now</span>
            `;
            
            const total = document.createElement('div');
            total.className = 'order-total';
            total.innerHTML = `
                <span>Total:</span>
                <span class="total-amount">₱${Math.floor(Math.random() * 500) + 200}</span>
            `;
            orderCard.querySelector('.order-items').after(total);
            
            completedTab.insertBefore(orderCard, completedTab.firstChild);
            
            orderCard.style.opacity = '0';
            orderCard.style.transform = 'scale(0.95)';
            setTimeout(() => {
                orderCard.style.transition = 'all 0.3s ease';
                orderCard.style.opacity = '1';
                orderCard.style.transform = 'scale(1)';
            }, 10);
            
            updateStats();
            showToast('Order completed successfully!');
        }, 300);
    }

    function cancelOrder(orderCard, orderId) {
        orderCard.style.opacity = '0';
        orderCard.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            orderCard.remove();
            updateStats();
            showToast('Order cancelled');
        }, 300);
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <span class="material-icons">check_circle</span>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
});
