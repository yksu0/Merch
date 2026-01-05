// Menu Management JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const menuGrid = document.getElementById('menu-items-grid');
    const categoryFilters = document.querySelectorAll('.filter-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const searchInput = document.getElementById('menu-search');
    const modal = document.getElementById('menu-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalClose = document.getElementById('modal-close');
    const cancelBtn = document.getElementById('cancel-btn');
    const menuForm = document.getElementById('menu-item-form');
    let editingCard = null;

    // Real-time profit margin calculator
    const priceInput = document.getElementById('item-price');
    const costInput = document.getElementById('item-cost');
    const profitMarginEl = document.getElementById('profit-margin');
    
    function calculateProfitMargin() {
        const price = parseFloat(priceInput.value) || 0;
        const cost = parseFloat(costInput.value) || 0;
        
        if (price > 0 && cost > 0) {
            const margin = ((price - cost) / price * 100).toFixed(1);
            const profit = (price - cost).toFixed(2);
            profitMarginEl.textContent = `Profit: ₱${profit} (${margin}% margin)`;
            profitMarginEl.className = 'form-hint profit';
        } else {
            profitMarginEl.textContent = '';
        }
    }
    
    if (priceInput && costInput) {
        priceInput.addEventListener('input', calculateProfitMargin);
        costInput.addEventListener('input', calculateProfitMargin);
    }

    // Variants toggle
    const hasVariantsCheckbox = document.getElementById('has-variants');
    const variantsContainer = document.getElementById('variants-container');
    
    if (hasVariantsCheckbox) {
        hasVariantsCheckbox.addEventListener('change', (e) => {
            variantsContainer.style.display = e.target.checked ? 'flex' : 'none';
        });
    }
    
    // Add-ons toggle and management
    const hasAddonsCheckbox = document.getElementById('has-addons');
    const addonsContainer = document.getElementById('addons-container');
    const addAddonBtn = document.getElementById('add-addon-btn');
    
    if (hasAddonsCheckbox) {
        hasAddonsCheckbox.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            addonsContainer.style.display = isChecked ? 'flex' : 'none';
            addAddonBtn.style.display = isChecked ? 'inline-block' : 'none';
        });
    }
    
    if (addAddonBtn) {
        addAddonBtn.addEventListener('click', () => {
            const addonItem = document.createElement('div');
            addonItem.className = 'addon-item';
            addonItem.innerHTML = `
                <input type="text" class="form-input-sm" placeholder="e.g., Extra Sauce" data-addon-name>
                <input type="number" class="form-input-sm" placeholder="₱15" step="0.01" min="0" data-addon-price>
                <button type="button" class="btn-remove-small">×</button>
            `;
            addonsContainer.appendChild(addonItem);
            
            // Attach remove handler
            addonItem.querySelector('.btn-remove-small').addEventListener('click', () => {
                addonItem.remove();
            });
        });
    }
    
    // Remove addon handlers for existing items
    document.querySelectorAll('.addon-item .btn-remove-small').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.addon-item').remove();
        });
    });
    
    // Customizations toggle and management
    const hasCustomizationsCheckbox = document.getElementById('has-customizations');
    const customizationsContainer = document.getElementById('customizations-container');
    const addCustomBtn = document.getElementById('add-custom-btn');
    
    if (hasCustomizationsCheckbox) {
        hasCustomizationsCheckbox.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            customizationsContainer.style.display = isChecked ? 'flex' : 'none';
            addCustomBtn.style.display = isChecked ? 'inline-block' : 'none';
        });
    }
    
    if (addCustomBtn) {
        addCustomBtn.addEventListener('click', () => {
            const customItem = document.createElement('div');
            customItem.className = 'custom-item';
            customItem.innerHTML = `
                <input type="text" class="form-input-sm" placeholder="e.g., Less spicy" data-custom-option>
                <button type="button" class="btn-remove-small">×</button>
            `;
            customizationsContainer.appendChild(customItem);
            
            // Attach remove handler
            customItem.querySelector('.btn-remove-small').addEventListener('click', () => {
                customItem.remove();
            });
        });
    }
    
    // Remove customization handlers for existing items
    document.querySelectorAll('.custom-item .btn-remove-small').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.custom-item').remove();
        });
    });
    
    // Combo meals toggle and management
    const isComboCheckbox = document.getElementById('is-combo');
    const comboContainer = document.getElementById('combo-container');
    const comboItemsList = document.getElementById('combo-items-list');
    const comboIndividualPrice = document.getElementById('combo-individual-price');
    const comboPriceInput = document.getElementById('combo-price');
    const comboSavingsDiv = document.getElementById('combo-savings');
    const savingsAmountEl = document.getElementById('savings-amount');
    const savingsPercentEl = document.getElementById('savings-percent');
    const comboItemsCount = document.getElementById('combo-items-count');
    
    function populateComboItemsList() {
        comboItemsList.innerHTML = '';
        const allMenuCards = document.querySelectorAll('.menu-card');
        
        allMenuCards.forEach(card => {
            const name = card.querySelector('.menu-card-title').textContent;
            const category = card.querySelector('.menu-card-category').textContent;
            const priceText = card.querySelector('.menu-card-price').textContent;
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            
            if (!isNaN(price)) {
                const itemCheckbox = document.createElement('label');
                itemCheckbox.className = 'combo-item-checkbox';
                itemCheckbox.innerHTML = `
                    <input type="checkbox" data-item-name="${name}" data-item-price="${price}">
                    <div class="combo-item-info">
                        <div class="combo-item-name">${name}</div>
                        <div class="combo-item-category">${category}</div>
                    </div>
                    <div class="combo-item-price">₱${price.toFixed(2)}</div>
                `;
                comboItemsList.appendChild(itemCheckbox);
                
                // Add change listener
                itemCheckbox.querySelector('input').addEventListener('change', calculateComboSavings);
            }
        });
    }
    
    function calculateComboSavings() {
        const selectedItems = comboItemsList.querySelectorAll('input[type="checkbox"]:checked');
        const count = selectedItems.length;
        
        if (count === 0) {
            comboItemsCount.textContent = 'No items selected';
            comboIndividualPrice.value = '₱0.00';
            comboSavingsDiv.style.display = 'none';
            return;
        }
        
        comboItemsCount.textContent = `${count} item${count > 1 ? 's' : ''} selected`;
        
        let totalIndividual = 0;
        selectedItems.forEach(cb => {
            totalIndividual += parseFloat(cb.dataset.itemPrice);
        });
        
        comboIndividualPrice.value = `₱${totalIndividual.toFixed(2)}`;
        
        const comboPrice = parseFloat(comboPriceInput.value) || 0;
        if (comboPrice > 0 && comboPrice < totalIndividual) {
            const savings = totalIndividual - comboPrice;
            const savingsPercent = ((savings / totalIndividual) * 100).toFixed(0);
            
            savingsAmountEl.textContent = `₱${savings.toFixed(2)}`;
            savingsPercentEl.textContent = `(${savingsPercent}% off)`;
            comboSavingsDiv.style.display = 'flex';
        } else {
            comboSavingsDiv.style.display = 'none';
        }
    }
    
    if (isComboCheckbox) {
        isComboCheckbox.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            comboContainer.style.display = isChecked ? 'block' : 'none';
            
            if (isChecked) {
                populateComboItemsList();
                
                // Disable other sections when combo is enabled
                document.getElementById('has-variants').disabled = true;
                document.getElementById('has-addons').disabled = true;
                document.getElementById('has-customizations').disabled = true;
            } else {
                // Re-enable sections
                document.getElementById('has-variants').disabled = false;
                document.getElementById('has-addons').disabled = false;
                document.getElementById('has-customizations').disabled = false;
            }
        });
    }
    
    if (comboPriceInput) {
        comboPriceInput.addEventListener('input', calculateComboSavings);
    }

    // Category Filter
    categoryFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            const menuCards = document.querySelectorAll('.menu-card');
            
            menuCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // View Toggle
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.dataset.view;
            if (view === 'list') {
                menuGrid.classList.add('list-view');
            } else {
                menuGrid.classList.remove('list-view');
            }
        });
    });

    // Search Functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const menuCards = document.querySelectorAll('.menu-card');
            
            menuCards.forEach(card => {
                const title = card.querySelector('.menu-card-title').textContent.toLowerCase();
                const description = card.querySelector('.menu-card-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Modal Functions
    function openModal(mode = 'add', card = null) {
        editingCard = card;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        if (mode === 'add') {
            modalTitle.textContent = 'Add Menu Item';
            menuForm.reset();
            document.getElementById('item-available').checked = true;
            // Generate SKU for new items
            const sku = generateSKU();
            document.getElementById('item-sku').value = sku;
        } else {
            modalTitle.textContent = 'Edit Menu Item';
            const title = card.querySelector('.menu-card-title').textContent;
            const category = card.dataset.category;
            const description = card.querySelector('.menu-card-description').textContent;
            const price = card.querySelector('.menu-card-price').textContent.replace('₱', '');
            const image = card.querySelector('.menu-card-image img').src.split('/').pop();
            const available = card.querySelector('.availability-badge').classList.contains('available');
            
            // Get additional fields
            const sku = card.dataset.sku || generateSKU();
            const prepTime = card.dataset.prepTime || '15-20';
            const spiceLevel = card.dataset.spiceLevel || 'none';
            const instructions = card.dataset.instructions || '';
            const cost = card.dataset.cost || '';
            const stock = card.dataset.stock || '999';
            const orderLimit = card.dataset.orderLimit || '';
            const variants = card.dataset.variants || '';
            const addons = card.dataset.addons || '';
            const customizations = card.dataset.customizations || '';
            
            document.getElementById('item-name').value = title;
            document.getElementById('item-category').value = category;
            document.getElementById('item-description').value = description;
            document.getElementById('item-price').value = price;
            document.getElementById('item-image').value = image;
            document.getElementById('item-available').checked = available;
            document.getElementById('item-sku').value = sku;
            document.getElementById('item-prep-time').value = prepTime;
            document.getElementById('item-instructions').value = instructions;
            document.getElementById('item-cost').value = cost;
            document.getElementById('item-stock').value = stock;
            document.getElementById('item-order-limit').value = orderLimit;
            
            // Load variants
            if (variants) {
                const variantsData = JSON.parse(variants);
                document.getElementById('has-variants').checked = true;
                variantsContainer.style.display = 'flex';
                const variantInputs = variantsContainer.querySelectorAll('.variant-item');
                variantsData.forEach((v, i) => {
                    if (variantInputs[i]) {
                        variantInputs[i].querySelector('input[type="text"]').value = v.name;
                        variantInputs[i].querySelector('input[type="number"]').value = v.price;
                    }
                });
            }
            
            // Load add-ons
            if (addons) {
                const addonsData = JSON.parse(addons);
                document.getElementById('has-addons').checked = true;
                addonsContainer.style.display = 'flex';
                addAddonBtn.style.display = 'inline-block';
                addonsContainer.innerHTML = '';
                addonsData.forEach(addon => {
                    const addonItem = document.createElement('div');
                    addonItem.className = 'addon-item';
                    addonItem.innerHTML = `
                        <input type="text" class="form-input-sm" placeholder="e.g., Extra Rice" data-addon-name value="${addon.name}">
                        <input type="number" class="form-input-sm" placeholder="₱20" step="0.01" min="0" data-addon-price value="${addon.price}">
                        <button type="button" class="btn-remove-small">×</button>
                    `;
                    addonsContainer.appendChild(addonItem);
                    addonItem.querySelector('.btn-remove-small').addEventListener('click', () => addonItem.remove());
                });
            }
            
            // Load customizations
            if (customizations) {
                const customData = JSON.parse(customizations);
                document.getElementById('has-customizations').checked = true;
                customizationsContainer.style.display = 'flex';
                addCustomBtn.style.display = 'inline-block';
                customizationsContainer.innerHTML = '';
                customData.forEach(custom => {
                    const customItem = document.createElement('div');
                    customItem.className = 'custom-item';
                    customItem.innerHTML = `
                        <input type="text" class="form-input-sm" placeholder="e.g., No onions" data-custom-option value="${custom}">
                        <button type="button" class="btn-remove-small">×</button>
                    `;
                    customizationsContainer.appendChild(customItem);
                    customItem.querySelector('.btn-remove-small').addEventListener('click', () => customItem.remove());
                });
            }
            
            // Load combo data
            const isCombo = card.dataset.isCombo === 'true';
            const comboItems = card.dataset.comboItems || '';
            const comboIndividualTotal = card.dataset.comboIndividualTotal || '';
            
            if (isCombo) {
                document.getElementById('is-combo').checked = true;
                comboContainer.style.display = 'block';
                populateComboItemsList();
                
                // Check the selected items
                if (comboItems) {
                    const selectedNames = JSON.parse(comboItems);
                    selectedNames.forEach(name => {
                        const checkbox = comboItemsList.querySelector(`input[data-item-name="${name}"]`);
                        if (checkbox) checkbox.checked = true;
                    });
                }
                
                // Set combo price
                if (price) {
                    comboPriceInput.value = price;
                }
                
                calculateComboSavings();
                
                // Disable other sections
                document.getElementById('has-variants').disabled = true;
                document.getElementById('has-addons').disabled = true;
                document.getElementById('has-customizations').disabled = true;
            }
            
            // Set spice level radio
            const spiceRadio = document.querySelector(`input[name="spice-level"][value="${spiceLevel}"]`);
            if (spiceRadio) spiceRadio.checked = true;
            
            // Calculate profit margin
            calculateProfitMargin();
        }
    }
    
    function generateSKU() {
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        return `GT-${timestamp}${random}`;
    }
    
    function getSpiceLabel(level) {
        const labels = {
            'none': '',
            'mild': 'Mild',
            'medium': 'Medium',
            'hot': 'Hot'
        };
        return labels[level] || '';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        editingCard = null;
    }

    function getCategoryLabel(category) {
        const labels = {
            'appetizers': 'Appetizers',
            'main': 'Main Course',
            'desserts': 'Desserts',
            'beverages': 'Beverages'
        };
        return labels[category] || category;
    }

    function createMenuCard(data) {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.dataset.category = data.category;
        card.dataset.sku = data.sku;
        card.dataset.prepTime = data.prepTime;
        card.dataset.spiceLevel = data.spiceLevel;
        card.dataset.instructions = data.instructions || '';
        card.dataset.cost = data.cost || '';
        card.dataset.stock = data.stock || '999';
        card.dataset.orderLimit = data.orderLimit || '';
        card.dataset.ordersToday = '0';
        card.dataset.variants = data.variants || '';
        card.dataset.addons = data.addons || '';
        card.dataset.customizations = data.customizations || '';
        card.dataset.isCombo = data.isCombo || 'false';
        card.dataset.comboItems = data.comboItems || '';
        card.dataset.comboIndividualTotal = data.comboIndividualTotal || '';
        
        const isCombo = data.isCombo === 'true';
        
        const spiceBadge = data.spiceLevel && data.spiceLevel !== 'none' 
            ? `<span class="spice-badge spice-${data.spiceLevel}">${getSpiceLabel(data.spiceLevel)}</span>`
            : '';
            
        // Calculate stock badge
        const stock = parseInt(data.stock) || 999;
        let stockBadge = '';
        if (stock === 0) {
            stockBadge = '<div class="stock-badge stock-out">Out of Stock</div>';
        } else if (stock < 10) {
            stockBadge = `<div class="stock-badge stock-low">${stock} left</div>`;
        } else if (stock < 999) {
            stockBadge = `<div class="stock-badge stock-good">${stock} left</div>`;
        }
        
        // Calculate profit margin
        let profitIndicator = '';
        if (data.cost && data.price) {
            const cost = parseFloat(data.cost);
            const price = parseFloat(data.price);
            if (cost > 0 && price > 0) {
                const margin = ((price - cost) / price * 100).toFixed(0);
                profitIndicator = `<span class="profit-indicator">+${margin}%</span>`;
            }
        }
        
        // Order limit badge
        const orderLimit = data.orderLimit || '';
        const ordersToday = 0;
        let limitBadge = '';
        if (orderLimit) {
            limitBadge = `<span class="limit-badge">${ordersToday}/${orderLimit} orders today</span>`;
        }
        
        // Extras tags
        let extrasTags = '';
        const hasVariants = data.variants && JSON.parse(data.variants).length > 0;
        const hasAddons = data.addons && JSON.parse(data.addons).length > 0;
        const hasCustomizations = data.customizations && JSON.parse(data.customizations).length > 0;
        
        // Combo items display
        let comboItemsDisplay = '';
        if (isCombo && data.comboItems) {
            const itemNames = JSON.parse(data.comboItems);
            comboItemsDisplay = `
                <div class="combo-items-tag">
                    <div class="combo-items-tag-title">Includes</div>
                    <div class="combo-items-tag-list">${itemNames.join(' • ')}</div>
                </div>
            `;
        }
        
        if (hasVariants || hasAddons || hasCustomizations) {
            const tags = [];
            if (hasVariants) {
                const variantsCount = JSON.parse(data.variants).length;
                tags.push(`<div class="extras-tag">${variantsCount} sizes</div>`);
            }
            if (hasAddons) {
                const addonsCount = JSON.parse(data.addons).length;
                tags.push(`<div class="extras-tag">${addonsCount} add-ons</div>`);
            }
            if (hasCustomizations) {
                tags.push(`<div class="extras-tag">Customizable</div>`);
            }
            extrasTags = `<div class="menu-card-extras">${tags.join('')}</div>`;
        }
        
        // Determine price display
        let priceDisplay = `₱${data.price}`;
        let savingsBadge = '';
        
        if (isCombo && data.comboIndividualTotal) {
            const individualTotal = parseFloat(data.comboIndividualTotal);
            const comboPrice = parseFloat(data.price);
            if (!isNaN(individualTotal) && !isNaN(comboPrice) && comboPrice < individualTotal) {
                const savings = individualTotal - comboPrice;
                savingsBadge = `<span class="combo-save-badge">Save ₱${savings.toFixed(2)}</span>`;
            }
        } else if (hasVariants) {
            const variantsData = JSON.parse(data.variants);
            const prices = variantsData.map(v => parseFloat(v.price)).filter(p => p > 0);
            if (prices.length > 0) {
                const minPrice = Math.min(...prices);
                priceDisplay = `From ₱${minPrice.toFixed(2)}`;
            }
        }
        
        card.innerHTML = `
            <div class="menu-card-image">
                <img src="../assets/images/${data.image}" alt="${data.name}">
                <div class="availability-badge ${data.available ? 'available' : 'unavailable'}">
                    ${data.available ? 'Available' : 'Unavailable'}
                </div>
                ${isCombo ? '<span class="combo-badge"><span class="material-icons">restaurant</span>COMBO</span>' : ''}
                ${stockBadge}
            </div>
            <div class="menu-card-content">
                <div class="menu-card-header">
                    <h3 class="menu-card-title">${data.name}</h3>
                    <span class="menu-sku">${data.sku}</span>
                </div>
                <p class="menu-card-category">${getCategoryLabel(data.category)}</p>
                <p class="menu-card-description">${data.description}</p>
                <div class="menu-card-meta">
                    <span class="meta-item">
                        <span class="material-icons">schedule</span>
                        ${data.prepTime} mins
                    </span>
                    ${spiceBadge}
                    ${limitBadge}
                </div>
                ${comboItemsDisplay}
                ${extrasTags}
                <div class="menu-card-footer">
                    <div class="price-info">
                        <span class="menu-card-price">${priceDisplay}</span>
                        ${savingsBadge}
                        ${profitIndicator}
                    </div>
                    <div class="menu-card-actions">
                        <button class="icon-btn" title="Edit">
                            <span class="material-icons">edit</span>
                        </button>
                        <button class="icon-btn" title="Delete">
                            <span class="material-icons">delete</span>
                        </button>
                        <label class="toggle-switch">
                            <input type="checkbox" ${data.available ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        `;
        
        attachCardEvents(card);
        return card;
    }

    function attachCardEvents(card) {
        // Delete button
        const deleteBtn = card.querySelector('.icon-btn[title="Delete"]');
        deleteBtn.addEventListener('click', () => {
            const itemName = card.querySelector('.menu-card-title').textContent;
            if (confirm(`Are you sure you want to delete "${itemName}"?`)) {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => card.remove(), 300);
            }
        });
        
        // Edit button
        const editBtn = card.querySelector('.icon-btn[title="Edit"]');
        editBtn.addEventListener('click', () => openModal('edit', card));
        
        // Toggle switch
        const toggle = card.querySelector('.toggle-switch input');
        toggle.addEventListener('change', (e) => {
            const badge = card.querySelector('.availability-badge');
            if (e.target.checked) {
                badge.classList.remove('unavailable');
                badge.classList.add('available');
                badge.textContent = 'Available';
            } else {
                badge.classList.remove('available');
                badge.classList.add('unavailable');
                badge.textContent = 'Unavailable';
            }
        });
    }

    // Delete Buttons
    document.querySelectorAll('.icon-btn[title="Delete"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.menu-card');
            const itemName = card.querySelector('.menu-card-title').textContent;
            if (confirm(`Are you sure you want to delete "${itemName}"?`)) {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => card.remove(), 300);
            }
        });
    });

    // Edit Buttons
    document.querySelectorAll('.icon-btn[title="Edit"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.menu-card');
            openModal('edit', card);
        });
    });

    // Add Menu Button
    const addMenuBtn = document.getElementById('add-menu-btn');
    if (addMenuBtn) {
        addMenuBtn.addEventListener('click', () => openModal('add'));
    }

    // Toggle Switches
    document.querySelectorAll('.toggle-switch input').forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const card = e.target.closest('.menu-card');
            const badge = card.querySelector('.availability-badge');
            if (e.target.checked) {
                badge.classList.remove('unavailable');
                badge.classList.add('available');
                badge.textContent = 'Available';
            } else {
                badge.classList.remove('available');
                badge.classList.add('unavailable');
                badge.textContent = 'Unavailable';
            }
        });
    });

    // Modal Close Events
    modalClose.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    // Form Submit
    menuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const spiceLevel = document.querySelector('input[name="spice-level"]:checked').value;
        
        // Collect variants data
        let variantsData = [];
        if (document.getElementById('has-variants').checked) {
            const variantItems = variantsContainer.querySelectorAll('.variant-item');
            variantItems.forEach(item => {
                const name = item.querySelector('input[type="text"]').value.trim();
                const price = item.querySelector('input[type="number"]').value;
                if (name && price) {
                    variantsData.push({ name, price: parseFloat(price).toFixed(2) });
                }
            });
        }
        
        // Collect add-ons data
        let addonsData = [];
        if (document.getElementById('has-addons').checked) {
            const addonItems = addonsContainer.querySelectorAll('.addon-item');
            addonItems.forEach(item => {
                const name = item.querySelector('input[type="text"]').value.trim();
                const price = item.querySelector('input[type="number"]').value;
                if (name && price) {
                    addonsData.push({ name, price: parseFloat(price).toFixed(2) });
                }
            });
        }
        
        // Collect customizations data
        let customizationsData = [];
        if (document.getElementById('has-customizations').checked) {
            const customItems = customizationsContainer.querySelectorAll('.custom-item input');
            customItems.forEach(input => {
                const value = input.value.trim();
                if (value) {
                    customizationsData.push(value);
                }
            });
        }
        
        // Collect combo data
        let isCombo = 'false';
        let comboItemsData = [];
        let comboIndividualTotal = '0';
        
        if (document.getElementById('is-combo').checked) {
            isCombo = 'true';
            const selectedCheckboxes = comboItemsList.querySelectorAll('input[type="checkbox"]:checked');
            let totalIndividual = 0;
            
            selectedCheckboxes.forEach(cb => {
                comboItemsData.push(cb.dataset.itemName);
                totalIndividual += parseFloat(cb.dataset.itemPrice);
            });
            
            comboIndividualTotal = totalIndividual.toFixed(2);
        }
        
        const formData = {
            name: document.getElementById('item-name').value,
            category: document.getElementById('item-category').value,
            description: document.getElementById('item-description').value,
            price: parseFloat(document.getElementById('item-price').value).toFixed(2),
            image: document.getElementById('item-image').value,
            available: document.getElementById('item-available').checked,
            sku: document.getElementById('item-sku').value,
            prepTime: document.getElementById('item-prep-time').value,
            spiceLevel: spiceLevel,
            instructions: document.getElementById('item-instructions').value,
            cost: document.getElementById('item-cost').value,
            stock: document.getElementById('item-stock').value || '999',
            orderLimit: document.getElementById('item-order-limit').value,
            variants: JSON.stringify(variantsData),
            addons: JSON.stringify(addonsData),
            customizations: JSON.stringify(customizationsData),
            isCombo: isCombo,
            comboItems: JSON.stringify(comboItemsData),
            comboIndividualTotal: comboIndividualTotal
        };
        
        if (editingCard) {
            // Update existing card - just re-create it from scratch for simplicity
            const newCard = createMenuCard(formData);
            editingCard.replaceWith(newCard);
            
            showSuccessMessage('Menu item updated successfully!');
        } else {
            // Add new card
            const newCard = createMenuCard(formData);
            menuGrid.appendChild(newCard);
            newCard.style.opacity = '0';
            newCard.style.transform = 'scale(0.9)';
            setTimeout(() => {
                newCard.style.transition = 'all 0.3s ease';
                newCard.style.opacity = '1';
                newCard.style.transform = 'scale(1)';
            }, 10);
            
            showSuccessMessage('Menu item added successfully!');
        }
        
        closeModal();
    });
});
