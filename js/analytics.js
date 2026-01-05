// Analytics & Reports Page JavaScript - Enhanced Version

document.addEventListener('DOMContentLoaded', function() {
    // Period Selector - Basic Filters
    const periodButtons = document.querySelectorAll('.period-option');
    const advancedFilterBtn = document.getElementById('advanced-filter-btn');
    const advancedFilterMenu = document.getElementById('advanced-filter-menu');
    const activeFilterDisplay = document.getElementById('active-filter-display');
    const filterLabel = document.getElementById('filter-label');
    const clearFilterBtn = document.getElementById('clear-filter');
    
    // Quarterly & Yearly Selectors
    const quarterlySelector = document.getElementById('quarterly-selector');
    const yearlySelector = document.getElementById('yearly-selector');
    const quarterlyBtn = document.getElementById('quarterly-btn');
    const yearlyBtn = document.getElementById('yearly-btn');
    const customRangeBtn = document.getElementById('custom-range-btn');
    const compareToggle = document.getElementById('compare-toggle');
    
    // Date Range Modal
    const dateRangeModal = document.getElementById('date-range-modal');
    const dateRangeClose = document.getElementById('date-range-close');
    const dateRangeCancel = document.getElementById('date-range-cancel');
    const dateRangeApply = document.getElementById('date-range-apply');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const quickRangeBtns = document.querySelectorAll('.quick-range-btn');
    
    // Filters Bar
    const filtersBar = document.getElementById('filters-bar');
    const categoryFilters = document.querySelectorAll('.filter-tag[data-category]');
    const itemTypeFilters = document.querySelectorAll('.filter-tag[data-itemtype]');
    
    let currentPeriod = 'today';
    let currentQuarter = null;
    let currentYear = 2026;
    let customStartDate = null;
    let customEndDate = null;
    let comparisonMode = false;
    
    // Set default dates
    const today = new Date();
    endDateInput.value = today.toISOString().split('T')[0];
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    startDateInput.value = weekAgo.toISOString().split('T')[0];
    
    // Period Button Clicks
    periodButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('dropdown-toggle')) return;
            
            periodButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            currentPeriod = this.dataset.period;
            quarterlySelector.style.display = 'none';
            yearlySelector.style.display = 'none';
            activeFilterDisplay.style.display = 'none';
            
            updateAnalyticsData(currentPeriod);
        });
    });
    
    // Advanced Filter Dropdown Toggle
    if (advancedFilterBtn) {
        advancedFilterBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            advancedFilterBtn.classList.toggle('active');
            advancedFilterMenu.classList.toggle('active');
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.period-dropdown')) {
            advancedFilterBtn?.classList.remove('active');
            advancedFilterMenu?.classList.remove('active');
        }
    });
    
    // Dropdown item clicks
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const period = this.dataset.period;
            
            if (period === 'quarter') {
                showQuarterlyView();
            } else if (period === 'year') {
                showYearlyView();
            } else if (period === 'custom') {
                openDateRangeModal();
            } else if (period) {
                currentPeriod = period;
                updateAnalyticsData(period);
                quarterlySelector.style.display = 'none';
                yearlySelector.style.display = 'none';
                activeFilterDisplay.style.display = 'none';
            }
            
            advancedFilterBtn.classList.remove('active');
            advancedFilterMenu.classList.remove('active');
        });
    });
    
    // Quarterly View
    function showQuarterlyView() {
        quarterlySelector.style.display = 'flex';
        yearlySelector.style.display = 'none';
        activeFilterDisplay.style.display = 'flex';
        filterLabel.textContent = 'Quarterly View';
        
        // Set current quarter
        const month = new Date().getMonth();
        const currentQ = `Q${Math.floor(month / 3) + 1}`;
        document.querySelectorAll('.quarter-option').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.quarter === currentQ);
        });
        
        updateQuarterlyData(currentQ, currentYear);
    }
    
    // Yearly View
    function showYearlyView() {
        yearlySelector.style.display = 'flex';
        quarterlySelector.style.display = 'none';
        activeFilterDisplay.style.display = 'flex';
        filterLabel.textContent = `Yearly View - ${currentYear}`;
        
        updateYearlyData(currentYear);
    }
    
    // Quarter Selection
    document.querySelectorAll('.quarter-option').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.quarter-option').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentQuarter = this.dataset.quarter;
            const year = document.getElementById('quarter-year-picker').value;
            filterLabel.textContent = `${currentQuarter} ${year}`;
            updateQuarterlyData(currentQuarter, year);
        });
    });
    
    // Quarter Year Picker
    document.getElementById('quarter-year-picker')?.addEventListener('change', function() {
        const quarter = document.querySelector('.quarter-option.active')?.dataset.quarter || 'Q1';
        filterLabel.textContent = `${quarter} ${this.value}`;
        updateQuarterlyData(quarter, this.value);
    });
    
    // Year Picker
    document.getElementById('year-picker')?.addEventListener('change', function() {
        currentYear = parseInt(this.value);
        filterLabel.textContent = `Yearly View - ${currentYear}`;
        updateYearlyData(currentYear);
    });
    
    // Clear Filter
    clearFilterBtn?.addEventListener('click', function() {
        quarterlySelector.style.display = 'none';
        yearlySelector.style.display = 'none';
        activeFilterDisplay.style.display = 'none';
        periodButtons.forEach(btn => btn.classList.remove('active'));
        periodButtons[0].classList.add('active');
        currentPeriod = 'today';
        updateAnalyticsData('today');
    });
    
    // Date Range Modal Functions
    function openDateRangeModal() {
        dateRangeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeDateRangeModal() {
        dateRangeModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    dateRangeClose?.addEventListener('click', closeDateRangeModal);
    dateRangeCancel?.addEventListener('click', closeDateRangeModal);
    dateRangeModal?.querySelector('.modal-overlay')?.addEventListener('click', closeDateRangeModal);
    
    // Quick Range Buttons
    quickRangeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            quickRangeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const days = parseInt(this.dataset.range);
            const end = new Date();
            const start = new Date();
            start.setDate(start.getDate() - days);
            
            startDateInput.value = start.toISOString().split('T')[0];
            endDateInput.value = end.toISOString().split('T')[0];
            updateDateRangeInfo();
        });
    });
    
    // Date Input Changes
    startDateInput?.addEventListener('change', updateDateRangeInfo);
    endDateInput?.addEventListener('change', updateDateRangeInfo);
    
    function updateDateRangeInfo() {
        const start = new Date(startDateInput.value);
        const end = new Date(endDateInput.value);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        const infoEl = document.getElementById('date-range-info');
        if (start && end && start <= end) {
            infoEl.textContent = `${diffDays} days selected`;
            infoEl.style.color = 'var(--turf-green)';
        } else {
            infoEl.textContent = 'Invalid date range';
            infoEl.style.color = '#ff6b6b';
        }
    }
    
    // Apply Date Range
    dateRangeApply?.addEventListener('click', function() {
        const start = new Date(startDateInput.value);
        const end = new Date(endDateInput.value);
        
        if (start && end && start <= end) {
            customStartDate = startDateInput.value;
            customEndDate = endDateInput.value;
            
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            activeFilterDisplay.style.display = 'flex';
            filterLabel.textContent = `Custom: ${customStartDate} to ${customEndDate} (${diffDays} days)`;
            
            updateCustomRangeData(customStartDate, customEndDate);
            closeDateRangeModal();
        }
    });
    
    // Category Filters
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.category;
            filterDataByCategory(category);
        });
    });
    
    // Item Type Filters
    itemTypeFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            itemTypeFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            const itemType = this.dataset.itemtype;
            filterDataByItemType(itemType);
        });
    });
    
    // Comparison Mode Toggle
    compareToggle?.addEventListener('click', function() {
        comparisonMode = !comparisonMode;
        this.style.background = comparisonMode ? 'rgba(35, 126, 86, 0.1)' : 'none';
        if (comparisonMode) {
            showSuccessMessage('Comparison mode enabled!');
            // Implementation for comparison view
        }
    });
    
    // Export Button
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            showExportOptions();
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
    
    // Initialize Charts
    initializePieChart();
    initializeLineChart();
    initializeHeatmap();
    generateInsights();
});

function updateAnalyticsData(period) {
    // Show loading state
    showLoadingState();
    
    // Simulate data fetch delay
    setTimeout(() => {
        // Data for different periods
        const data = {
            today: {
                sales: '₱12,540',
                salesChange: '12.5%',
                orders: '48',
                ordersChange: '8.3%',
                avgOrder: '₱261',
                avgChange: '4.2%',
                profit: '₱8,540',
                customers: '342',
                mostOrdered: 'Chicken Inasal',
                mostOrderedCount: '248'
            },
            yesterday: {
                sales: '₱11,150',
                salesChange: '9.2%',
                orders: '44',
                ordersChange: '5.8%',
                avgOrder: '₱253',
                avgChange: '3.4%',
                profit: '₱7,605',
                customers: '318',
                mostOrdered: 'Chicken Inasal',
                mostOrderedCount: '235'
            },
            week: {
                sales: '₱78,750',
                salesChange: '15.2%',
                orders: '336',
                ordersChange: '10.5%',
                avgOrder: '₱234',
                avgChange: '4.5%',
                profit: '₱53,550',
                customers: '2,394',
                mostOrdered: 'Chicken Inasal',
                mostOrderedCount: '1,736'
            },
            month: {
                sales: '₱337,500',
                salesChange: '18.7%',
                orders: '1,440',
                ordersChange: '12.8%',
                avgOrder: '₱234',
                avgChange: '5.2%',
                profit: '₱229,950',
                customers: '10,260',
                mostOrdered: 'Chicken Inasal',
                mostOrderedCount: '7,440'
            },
            last7: {
                sales: '₱84,630',
                salesChange: '16.1%',
                orders: '362',
                ordersChange: '11.2%',
                avgOrder: '₱234',
                avgChange: '4.4%',
                profit: '₱57,610',
                customers: '2,574',
                mostOrdered: 'Chicken Inasal',
                mostOrderedCount: '1,868'
            },
            last30: {
                sales: '₱362,250',
                salesChange: '19.4%',
                orders: '1,548',
                ordersChange: '13.5%',
                avgOrder: '₱234',
                avgChange: '5.2%',
                profit: '₱246,730',
                customers: '11,022',
                mostOrdered: 'Chicken Inasal',
                mostOrderedCount: '7,998'
            },
            last90: {
                sales: '₱1,096,750',
                salesChange: '21.3%',
                orders: '4,686',
                ordersChange: '14.8%',
                avgOrder: '₱234',
                avgChange: '5.7%',
                profit: '₱746,590',
                customers: '33,372',
                mostOrdered: 'Chicken Inasal',
                mostOrderedCount: '24,204'
            }
        };

        const selectedData = data[period] || data.today;
        
        // Update cards with animation
        updateCardWithAnimation('.analytics-card:nth-child(1) .analytics-value', selectedData.sales);
        updateCardWithAnimation('.analytics-card:nth-child(1) .analytics-change', `
            <span class="material-icons">arrow_upward</span>
            ${selectedData.salesChange} vs previous period
        `);
        
        updateCardWithAnimation('.analytics-card:nth-child(2) .analytics-value', selectedData.orders);
        updateCardWithAnimation('.analytics-card:nth-child(2) .analytics-change', `
            <span class="material-icons">arrow_upward</span>
            ${selectedData.ordersChange} vs previous period
        `);
        
        updateCardWithAnimation('.analytics-card:nth-child(3) .analytics-value', selectedData.avgOrder);
        updateCardWithAnimation('.analytics-card:nth-child(3) .analytics-change', `
            <span class="material-icons">arrow_upward</span>
            ${selectedData.avgChange} vs previous period
        `);
        
        // Update extended cards
        updateCardWithAnimation('#total-profit', selectedData.profit);
        updateCardWithAnimation('#total-customers', selectedData.customers);
        updateCardWithAnimation('#most-ordered-item', selectedData.mostOrdered);
        updateCardWithAnimation('#most-ordered-count', `${selectedData.mostOrderedCount} orders`);
        
        hideLoadingState();
        generateInsights();
    }, 300);
}

function updateQuarterlyData(quarter, year) {
    // Placeholder data - would fetch real data in production
    const quarterData = {
        sales: '₱1,012,500',
        salesChange: '22.5%',
        orders: '4,320',
        ordersChange: '15.8%',
        avgOrder: '₱234',
        avgChange: '5.7%',
        profit: '₱689,500',
        customers: '30,744',
        mostOrdered: 'Chicken Inasal',
        mostOrderedCount: '22,320'
    };
    
    updateCardWithAnimation('.analytics-card:nth-child(1) .analytics-value', quarterData.sales);
    updateCardWithAnimation('#total-profit', quarterData.profit);
    updateCardWithAnimation('#total-customers', quarterData.customers);
    updateCardWithAnimation('#most-ordered-item', quarterData.mostOrdered);
    showSuccessMessage(`Showing ${quarter} ${year} data`);
}

function updateYearlyData(year) {
    // Placeholder data
    const yearlyData = {
        sales: '₱4,050,000',
        salesChange: '24.3%',
        orders: '17,280',
        ordersChange: '16.9%',
        avgOrder: '₱234',
        avgChange: '6.3%',
        profit: '₱2,758,000',
        customers: '122,976',
        mostOrdered: 'Chicken Inasal',
        mostOrderedCount: '89,280'
    };
    
    updateCardWithAnimation('.analytics-card:nth-child(1) .analytics-value', yearlyData.sales);
    updateCardWithAnimation('#total-profit', yearlyData.profit);
    updateCardWithAnimation('#total-customers', yearlyData.customers);
    showSuccessMessage(`Showing ${year} yearly data`);
}

function updateCustomRangeData(startDate, endDate) {
    // Calculate days between dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    // Estimate data based on daily average
    const dailyAvg = {
        sales: 12540,
        orders: 48,
        profit: 8540,
        customers: 342
    };
    
    const rangeData = {
        sales: `₱${(dailyAvg.sales * diffDays).toLocaleString()}`,
        orders: `${dailyAvg.orders * diffDays}`,
        profit: `₱${(dailyAvg.profit * diffDays).toLocaleString()}`,
        customers: `${dailyAvg.customers * diffDays}`
    };
    
    updateCardWithAnimation('.analytics-card:nth-child(1) .analytics-value', rangeData.sales);
    updateCardWithAnimation('.analytics-card:nth-child(2) .analytics-value', rangeData.orders);
    updateCardWithAnimation('#total-profit', rangeData.profit);
    updateCardWithAnimation('#total-customers', rangeData.customers);
}

function filterDataByCategory(category) {
    // Filter charts and data by category
    // Notifications removed per user request
}

function filterDataByItemType(itemType) {
    // Filter charts and data by item type
    // Notifications removed per user request
}

function updateCardWithAnimation(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        setTimeout(() => {
            if (typeof value === 'string' && value.includes('<')) {
                element.innerHTML = value;
            } else {
                element.textContent = value;
            }
            element.style.transition = 'all 0.3s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 150);
    }
}

function showLoadingState() {
    document.querySelectorAll('.analytics-value, .card-value-large, .card-value-medium').forEach(el => {
        el.style.opacity = '0.5';
    });
}

function hideLoadingState() {
    document.querySelectorAll('.analytics-value, .card-value-large, .card-value-medium').forEach(el => {
        el.style.opacity = '1';
    });
}

function initializePieChart() {
    const canvas = document.getElementById('categoryPieChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const legend = document.getElementById('pie-legend');
    
    // Sample data
    const data = [
        { label: 'Main Course', value: 45, color: '#237E56' },
        { label: 'Appetizers', value: 20, color: '#EAD290' },
        { label: 'Desserts', value: 18, color: '#FDBC22' },
        { label: 'Beverages', value: 17, color: '#183526' }
    ];
    
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -0.5 * Math.PI;
    
    // Draw pie slices
    data.forEach(item => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.arc(200, 125, 100, currentAngle, currentAngle + sliceAngle);
        ctx.lineTo(200, 125);
        ctx.fillStyle = item.color;
        ctx.fill();
        
        currentAngle += sliceAngle;
    });
    
    // Generate legend
    legend.innerHTML = data.map(item => `
        <div class="legend-item-pie">
            <div class="legend-color" style="background: ${item.color};"></div>
            <span class="legend-text">${item.label}</span>
            <span class="legend-value">${item.value}%</span>
        </div>
    `).join('');
}

function initializeLineChart() {
    const canvas = document.getElementById('trendLineChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Sample data points (7 days)
    const salesData = [5625, 7750, 6875, 9750, 10625, 11500, 12500];
    const ordersData = [22, 32, 28, 40, 44, 47, 51];
    
    // Scale factors
    const maxSales = Math.max(...salesData);
    const maxOrders = Math.max(...ordersData);
    const scaleY = 180;
    const scaleX = 50;
    
    // Draw Sales Line (green)
    ctx.strokeStyle = '#237E56';
    ctx.lineWidth = 3;
    ctx.beginPath();
    salesData.forEach((value, index) => {
        const x = 50 + index * scaleX;
        const y = 190 - (value / maxSales) * scaleY;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // Draw Orders Line (amber) - scaled to fit
    ctx.strokeStyle = '#FDBC22';
    ctx.beginPath();
    ordersData.forEach((value, index) => {
        const x = 50 + index * scaleX;
        const y = 190 - (value / maxOrders) * scaleY;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // Draw points
    salesData.forEach((value, index) => {
        const x = 50 + index * scaleX;
        const y = 190 - (value / maxSales) * scaleY;
        ctx.fillStyle = '#237E56';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
}

function initializeHeatmap() {
    const container = document.getElementById('orderHeatmap');
    if (!container) return;
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({length: 24}, (_, i) => i);
    
    // Generate random intensity data (0-5)
    const intensityData = days.map(() => 
        hours.map(() => Math.floor(Math.random() * 6))
    );
    
    let html = '<div class="heatmap-grid">';
    
    // Column labels (hours)
    html += '<div class="heatmap-row-label"></div>';
    hours.forEach(hour => {
        html += `<div class="heatmap-col-label">${hour}h</div>`;
    });
    
    // Rows (days with cells)
    days.forEach((day, dayIndex) => {
        html += `<div class="heatmap-row-label">${day}</div>`;
        hours.forEach((hour, hourIndex) => {
            const intensity = intensityData[dayIndex][hourIndex];
            html += `<div class="heatmap-cell" data-intensity="${intensity}" title="${day} ${hour}:00 - ${intensity * 10} orders"></div>`;
        });
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function generateInsights() {
    const insightsList = document.getElementById('insights-list');
    if (!insightsList) return;
    
    const insights = [
        {
            icon: 'trending_up',
            title: 'Strong Growth',
            description: 'Sales increased 12.5% today compared to yesterday. Keep up the momentum!',
            badge: '+12.5%'
        },
        {
            icon: 'star',
            title: 'Best Seller',
            description: 'Chicken Inasal is your top performer with 248 orders today.',
            badge: '248 orders'
        },
        {
            icon: 'schedule',
            title: 'Peak Time',
            description: 'Lunch rush (12PM-2PM) generates 40% of daily revenue. Consider adding staff.',
            badge: '40%'
        },
        {
            icon: 'warning',
            title: 'Stock Alert',
            description: '3 items are running low on stock. Restock soon to avoid running out.',
            badge: '3 items'
        }
    ];
    
    insightsList.innerHTML = insights.map(insight => `
        <div class="insight-item">
            <div class="insight-icon">
                <span class="material-icons">${insight.icon}</span>
            </div>
            <div class="insight-content">
                <h4 class="insight-title">${insight.title}</h4>
                <p class="insight-description">${insight.description}</p>
            </div>
            <span class="insight-badge">${insight.badge}</span>
        </div>
    `).join('');
}

function showExportOptions() {
    const options = ['Export as PDF', 'Export as CSV', 'Export Charts (PNG)', 'Print Report'];
    const choice = confirm('Export options:\n\n1. PDF Report\n2. CSV Data\n3. PNG Charts\n4. Print View\n\nFeature coming soon!');
    showSuccessMessage('Export feature will be available in the next update!');
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
