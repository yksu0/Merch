// Staff Menu Page JavaScript (Enhanced with quick toggles and sorting)

document.addEventListener('DOMContentLoaded', function() {
    const menuGrid = document.getElementById('menu-grid');
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const sortSelect = document.getElementById('sort-select');
    const detailsModal = document.getElementById('details-modal');
    const closeModalBtn = document.getElementById('close-details-modal');
    const closeBtn = document.getElementById('close-modal-btn');

    // Menu item data (enhanced with prep time, ingredients, combos)
    const menuItems = {
        'lumpia': {
            name: 'Lumpia Shanghai',
            category: 'Appetizers',
            description: 'Crispy Filipino spring rolls filled with savory meat and vegetables. Served with sweet and sour sauce.',
            price: '₱100',
            prepTime: '15 min',
            image: '../assets/images/lumpia.jpg',
            available: true,
            ingredients: 'Ground pork, carrots, onions, garlic, spring roll wrappers, soy sauce, eggs',
            combos: 'Pairs well with Calamansi Juice or Iced Coffee'
        },
        'spring-rolls': {
            name: 'Fresh Spring Rolls',
            category: 'Appetizers',
            description: 'Light and healthy spring rolls with fresh vegetables and shrimp. Served with peanut sauce.',
            price: '₱90',
            prepTime: '12 min',
            image: '../assets/images/spring-rolls.jpg',
            available: true,
            ingredients: 'Rice paper, shrimp, lettuce, carrots, cucumber, vermicelli noodles, peanut sauce',
            combos: 'Great as a starter before Chicken Inasal or Adobo'
        },
        'chicken-inasal': {
            name: 'Chicken Inasal',
            category: 'Main Course',
            description: 'Grilled chicken marinated in Filipino spices including lemongrass, garlic, and ginger. Served with rice.',
            price: '₱150',
            prepTime: '25 min',
            image: '../assets/images/chicken-inasal.jpg',
            available: true,
            ingredients: 'Chicken thighs, lemongrass, garlic, ginger, calamansi, soy sauce, steamed rice',
            combos: 'Perfect with Buko Juice. Add Halo-Halo for dessert!'
        },
        'adobo': {
            name: 'Adobo',
            category: 'Main Course',
            description: 'Classic Filipino chicken or pork stew in soy sauce and vinegar. A national favorite!',
            price: '₱150',
            prepTime: '30 min',
            image: '../assets/images/adobo.jpg',
            available: true,
            ingredients: 'Chicken/pork, soy sauce, vinegar, garlic, bay leaves, peppercorns, steamed rice',
            combos: 'Serve with Pancit Canton for a full Filipino meal'
        },
        'sisig': {
            name: 'Sisig',
            category: 'Main Course',
            description: 'Sizzling pork with onions and chili peppers served on a hot plate. Spicy and savory!',
            price: '₱150',
            prepTime: '20 min',
            image: '../assets/images/sisig.jpg',
            available: true,
            ingredients: 'Pork belly, onions, chili peppers, calamansi, eggs, soy sauce, garlic',
            combos: 'Best enjoyed with Calamansi Juice and steamed rice'
        },
        'pancit': {
            name: 'Pancit Canton',
            category: 'Main Course',
            description: 'Stir-fried noodles with vegetables and meat. A Filipino staple for celebrations.',
            price: '₱120',
            prepTime: '18 min',
            image: '../assets/images/pancit.jpg',
            available: true,
            ingredients: 'Canton noodles, cabbage, carrots, pork/chicken, soy sauce, oyster sauce, garlic',
            combos: 'Great side dish with any main course or as a standalone meal'
        },
        'beef-tapa': {
            name: 'Beef Tapa',
            category: 'Main Course',
            description: 'Marinated beef served with garlic rice and eggs. Perfect for breakfast or any meal!',
            price: '₱180',
            prepTime: '22 min',
            image: '../assets/images/beef-tapa.jpg',
            available: false,
            ingredients: 'Beef sirloin, soy sauce, calamansi, garlic, pepper, garlic rice, fried egg',
            combos: 'Complete breakfast with Iced Coffee'
        },
        'halo-halo': {
            name: 'Halo-Halo',
            category: 'Desserts',
            description: 'Classic Filipino shaved ice dessert with sweet beans, fruits, leche flan, and ube ice cream.',
            price: '₱100',
            prepTime: '10 min',
            image: '../assets/images/halo-halo.jpg',
            available: true,
            ingredients: 'Shaved ice, sweet beans, nata de coco, leche flan, ube ice cream, evaporated milk',
            combos: 'Perfect dessert after any main course, especially on hot days!'
        },
        'leche-flan': {
            name: 'Leche Flan',
            category: 'Desserts',
            description: 'Creamy Filipino caramel custard made with eggs and condensed milk. Rich and sweet!',
            price: '₱80',
            prepTime: '8 min',
            image: '../assets/images/leche-flan.jpg',
            available: true,
            ingredients: 'Eggs, condensed milk, evaporated milk, sugar, vanilla extract',
            combos: 'Excellent with Iced Coffee or as a topping for Halo-Halo'
        },
        'buko-juice': {
            name: 'Buko Juice',
            category: 'Beverages',
            description: 'Fresh coconut juice served cold. Natural and refreshing!',
            price: '₱60',
            prepTime: '5 min',
            image: '../assets/images/buko-juice.jpg',
            available: true,
            ingredients: 'Fresh young coconut, ice, optional sugar',
            combos: 'Refreshing with any grilled dish like Chicken Inasal'
        },
        'calamansi': {
            name: 'Calamansi Juice',
            category: 'Beverages',
            description: 'Refreshing Filipino lime juice. Sweet, sour, and perfect for hot days!',
            price: '₱50',
            prepTime: '5 min',
            image: '../assets/images/calamansi.jpg',
            available: true,
            ingredients: 'Fresh calamansi, water, sugar, ice',
            combos: 'Pairs perfectly with Sisig or Lumpia'
        },
        'iced-coffee': {
            name: 'Iced Coffee',
            category: 'Beverages',
            description: 'Cold brewed coffee with milk and sugar. Energizing and delicious!',
            price: '₱70',
            prepTime: '5 min',
            image: '../assets/images/iced-coffee.jpg',
            available: true,
            ingredients: 'Brewed coffee, milk, sugar, ice',
            combos: 'Great with Leche Flan or as a morning boost with Beef Tapa'
        }
    };

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterMenuItems(searchTerm);
    });

    // Category filter
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Reset search input
            searchInput.value = '';
            
            const category = this.dataset.category;
            filterByCategory(category);
        });
    });

    // Sort functionality
    sortSelect.addEventListener('change', function() {
        sortMenuItems(this.value);
    });

    // View toggle
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            if (view === 'list') {
                menuGrid.classList.add('list-view');
            } else {
                menuGrid.classList.remove('list-view');
            }
        });
    });

    // Quick toggle availability buttons
    document.querySelectorAll('.quick-toggle-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const itemKey = this.dataset.item;
            toggleAvailability(this, itemKey);
        });
    });

    // View details buttons
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemKey = this.dataset.item;
            showItemDetails(itemKey);
        });
    });

    // Close modal
    closeModalBtn.addEventListener('click', closeDetailsModal);
    closeBtn.addEventListener('click', closeDetailsModal);
    detailsModal.querySelector('.modal-overlay').addEventListener('click', closeDetailsModal);

    function filterMenuItems(searchTerm) {
        const cards = document.querySelectorAll('.menu-card');
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
        
        cards.forEach(card => {
            const name = card.querySelector('.menu-name').textContent.toLowerCase();
            const description = card.querySelector('.menu-description').textContent.toLowerCase();
            const matchesSearch = name.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
            
            if (matchesSearch && matchesCategory) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function filterByCategory(category) {
        const cards = document.querySelectorAll('.menu-card');
        
        console.log('Filtering by category:', category);
        console.log('Total cards found:', cards.length);
        
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            console.log('Card category:', cardCategory, 'Filtering for:', category);
            
            if (category === 'all') {
                card.style.display = '';
            } else {
                if (cardCategory === category) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }

    function sortMenuItems(sortType) {
        const cards = Array.from(document.querySelectorAll('.menu-card'));
        
        cards.sort((a, b) => {
            switch(sortType) {
                case 'name-asc':
                    return a.dataset.name.localeCompare(b.dataset.name);
                case 'name-desc':
                    return b.dataset.name.localeCompare(a.dataset.name);
                case 'price-asc':
                    return parseInt(a.dataset.price) - parseInt(b.dataset.price);
                case 'price-desc':
                    return parseInt(b.dataset.price) - parseInt(a.dataset.price);
                case 'prep-time':
                    return parseInt(a.dataset.prep) - parseInt(b.dataset.prep);
                default:
                    return 0;
            }
        });
        
        // Re-append in sorted order
        cards.forEach(card => menuGrid.appendChild(card));
    }

    function toggleAvailability(button, itemKey) {
        const card = button.closest('.menu-card');
        const availabilityBadge = card.querySelector('.availability-badge');
        const stockBadge = card.querySelector('.stock-badge');
        const icon = button.querySelector('.material-icons');
        
        // Toggle availability
        const isAvailable = availabilityBadge.classList.contains('available');
        
        if (isAvailable) {
            // Mark as unavailable
            availabilityBadge.classList.remove('available');
            availabilityBadge.classList.add('unavailable');
            availabilityBadge.textContent = 'Unavailable';
            
            stockBadge.classList.remove('stock-high', 'stock-medium');
            stockBadge.classList.add('stock-low');
            stockBadge.textContent = 'Out of Stock';
            
            icon.textContent = 'visibility_off';
            menuItems[itemKey].available = false;
            
            showToast('Marked as unavailable');
        } else {
            // Mark as available
            availabilityBadge.classList.remove('unavailable');
            availabilityBadge.classList.add('available');
            availabilityBadge.textContent = 'Available';
            
            stockBadge.classList.remove('stock-low');
            stockBadge.classList.add('stock-high');
            stockBadge.textContent = 'In Stock';
            
            icon.textContent = 'visibility';
            menuItems[itemKey].available = true;
            
            showToast('Marked as available');
        }
    }

    function showItemDetails(itemKey) {
        const item = menuItems[itemKey];
        
        if (item) {
            document.getElementById('modal-item-name').textContent = item.name;
            document.getElementById('modal-item-image').src = item.image;
            document.getElementById('modal-item-image').alt = item.name;
            document.getElementById('modal-item-category').textContent = item.category;
            document.getElementById('modal-item-description').textContent = item.description;
            document.getElementById('modal-item-price').textContent = item.price;
            document.getElementById('modal-item-prep').textContent = item.prepTime;
            document.getElementById('modal-item-ingredients').textContent = item.ingredients;
            document.getElementById('modal-item-combos').textContent = item.combos;
            
            const availabilitySpan = document.getElementById('modal-item-availability');
            if (item.available) {
                availabilitySpan.innerHTML = '<span class="availability-badge available">Available</span>';
            } else {
                availabilitySpan.innerHTML = '<span class="availability-badge unavailable">Unavailable</span>';
            }
            
            detailsModal.classList.add('active');
        }
    }

    function closeDetailsModal() {
        detailsModal.classList.remove('active');
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <span class="material-icons">info</span>
            <span>${message}</span>
        `;
        
        // Add styles if not exists
        if (!document.querySelector('#toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
                .toast-notification {
                    position: fixed;
                    bottom: 24px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--turf-green);
                    color: white;
                    padding: 12px 20px;
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
                
                .toast-notification .material-icons {
                    font-size: 18px;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideUp 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
});
