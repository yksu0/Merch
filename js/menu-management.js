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
        } else {
            modalTitle.textContent = 'Edit Menu Item';
            const title = card.querySelector('.menu-card-title').textContent;
            const category = card.dataset.category;
            const description = card.querySelector('.menu-card-description').textContent;
            const price = card.querySelector('.menu-card-price').textContent.replace('₱', '');
            const image = card.querySelector('.menu-card-image img').src.split('/').pop();
            const available = card.querySelector('.availability-badge').classList.contains('available');
            
            document.getElementById('item-name').value = title;
            document.getElementById('item-category').value = category;
            document.getElementById('item-description').value = description;
            document.getElementById('item-price').value = price;
            document.getElementById('item-image').value = image;
            document.getElementById('item-available').checked = available;
        }
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
        
        card.innerHTML = `
            <div class="menu-card-image">
                <img src="../assets/images/${data.image}" alt="${data.name}">
                <div class="availability-badge ${data.available ? 'available' : 'unavailable'}">
                    ${data.available ? 'Available' : 'Unavailable'}
                </div>
            </div>
            <div class="menu-card-content">
                <h3 class="menu-card-title">${data.name}</h3>
                <p class="menu-card-category">${getCategoryLabel(data.category)}</p>
                <p class="menu-card-description">${data.description}</p>
                <div class="menu-card-footer">
                    <span class="menu-card-price">₱${data.price}</span>
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
        
        const formData = {
            name: document.getElementById('item-name').value,
            category: document.getElementById('item-category').value,
            description: document.getElementById('item-description').value,
            price: parseFloat(document.getElementById('item-price').value).toFixed(2),
            image: document.getElementById('item-image').value,
            available: document.getElementById('item-available').checked
        };
        
        if (editingCard) {
            // Update existing card
            editingCard.dataset.category = formData.category;
            editingCard.querySelector('.menu-card-title').textContent = formData.name;
            editingCard.querySelector('.menu-card-category').textContent = getCategoryLabel(formData.category);
            editingCard.querySelector('.menu-card-description').textContent = formData.description;
            editingCard.querySelector('.menu-card-price').textContent = `₱${formData.price}`;
            editingCard.querySelector('.menu-card-image img').src = `../assets/images/${formData.image}`;
            editingCard.querySelector('.menu-card-image img').alt = formData.name;
            
            const badge = editingCard.querySelector('.availability-badge');
            const toggle = editingCard.querySelector('.toggle-switch input');
            toggle.checked = formData.available;
            
            if (formData.available) {
                badge.classList.remove('unavailable');
                badge.classList.add('available');
                badge.textContent = 'Available';
            } else {
                badge.classList.remove('available');
                badge.classList.add('unavailable');
                badge.textContent = 'Unavailable';
            }
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
        }
        
        closeModal();
    });
});
