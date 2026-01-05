// Analytics & Reports Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Period Selector
    const periodButtons = document.querySelectorAll('.period-option');
    
    periodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active from all
            periodButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
            
            const period = this.dataset.period;
            updateAnalyticsData(period);
        });
    });

    // Export Button
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            // Show success message (placeholder for actual export)
            showExportMessage();
        });
    }

    // Hover effect for trend bars
    const trendBars = document.querySelectorAll('.trend-bar');
    trendBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            const value = this.dataset.value;
            showTooltip(this, value);
        });
        
        bar.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
});

function updateAnalyticsData(period) {
    // Data for different periods
    const data = {
        today: {
            sales: '₱12,540',
            salesChange: '12.5%',
            orders: '48',
            ordersChange: '8.3%',
            avgOrder: '₱261',
            avgChange: '4.2%'
        },
        week: {
            sales: '₱78,750',
            salesChange: '15.2%',
            orders: '336',
            ordersChange: '10.5%',
            avgOrder: '₱234',
            avgChange: '4.5%'
        },
        month: {
            sales: '₱337,500',
            salesChange: '18.7%',
            orders: '1,440',
            ordersChange: '12.8%',
            avgOrder: '₱234',
            avgChange: '5.2%'
        }
    };

    const selectedData = data[period];
    
    // Update cards
    const cards = document.querySelectorAll('.analytics-card');
    cards[0].querySelector('.analytics-value').textContent = selectedData.sales;
    cards[0].querySelector('.analytics-change').innerHTML = `
        <span class="material-icons">arrow_upward</span>
        ${selectedData.salesChange} vs previous period
    `;
    
    cards[1].querySelector('.analytics-value').textContent = selectedData.orders;
    cards[1].querySelector('.analytics-change').innerHTML = `
        <span class="material-icons">arrow_upward</span>
        ${selectedData.ordersChange} vs previous period
    `;
    
    cards[2].querySelector('.analytics-value').textContent = selectedData.avgOrder;
    cards[2].querySelector('.analytics-change').innerHTML = `
        <span class="material-icons">arrow_upward</span>
        ${selectedData.avgChange} vs previous period
    `;
}

function showTooltip(element, value) {
    // Create tooltip if doesn't exist
    let tooltip = document.querySelector('.chart-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'chart-tooltip';
        document.body.appendChild(tooltip);
    }
    
    tooltip.textContent = value;
    tooltip.style.display = 'block';
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
}

function hideTooltip() {
    const tooltip = document.querySelector('.chart-tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

function showExportMessage() {
    // Create temporary message
    const message = document.createElement('div');
    message.className = 'export-message';
    message.innerHTML = `
        <span class="material-icons">check_circle</span>
        <span>Report exported successfully</span>
    `;
    
    document.body.appendChild(message);
    
    // Show with animation
    setTimeout(() => {
        message.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 3000);
}
