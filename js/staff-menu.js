// Staff Menu Page JavaScript (Read-only)

document.addEventListener('DOMContentLoaded', function() {
    const menuGrid = document.getElementById('menu-grid');
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const detailsModal = document.getElementById('details-modal');
    const closeModalBtn = document.getElementById('close-details-modal');
    const closeBtn = document.getElementById('close-modal-btn');

    // Menu item data
    const menuItems = {
        'lumpia': {
            name: 'Lumpia Shanghai',
            category: 'Appetizers',
            description: 'Crispy Filipino spring rolls filled with savory meat and vegetables. Served with sweet and sour sauce.',
            price: '₱100',
            image: '../assets/images/lumpia.jpg',
            available: true
        },
        'spring-rolls': {
            name: 'Fresh Spring Rolls',
            category: 'Appetizers',
            description: 'Light and healthy spring rolls with fresh vegetables and shrimp. Served with peanut sauce.',
            price: '₱90',
            image: '../assets/images/spring-rolls.jpg',
            available: true
        },
        'chicken-inasal': {
            name: 'Chicken Inasal',
            category: 'Main Course',
            description: 'Grilled chicken marinated in Filipino spices including lemongrass, garlic, and ginger. Served with rice.',
            price: '₱150',
            image: '../assets/images/chicken-inasal.jpg',
            available: true
        },
        'adobo': {
            name: 'Adobo',
            category: 'Main Course',
            description: 'Classic Filipino chicken or pork stew in soy sauce and vinegar. A national favorite!',
            price: '₱150',
            image: '../assets/images/adobo.jpg',
            available: true
        },
        'sisig': {
            name: 'Sisig',
            category: 'Main Course',
            description: 'Sizzling pork with onions and chili peppers served on a hot plate. Spicy and savory!',
            price: '₱150',
            image: '../assets/images/sisig.jpg',
            available: true
        },
        'pancit': {
            name: 'Pancit Canton',
            category: 'Main Course',
            description: 'Stir-fried noodles with vegetables and meat. A Filipino staple for celebrations.',
            price: '₱120',
            image: '../assets/images/pancit.jpg',
            available: true
        },
        'beef-tapa': {
            name: 'Beef Tapa',
            category: 'Main Course',
            description: 'Marinated beef served with garlic rice and eggs. Perfect for breakfast or any meal!',
            price: '₱180',
            image: '../assets/images/beef-tapa.jpg',
            available: false
        },
        'halo-halo': {
            name: 'Halo-Halo',
            category: 'Desserts',
            description: 'Classic Filipino shaved ice dessert with sweet beans, fruits, leche flan, and ube ice cream.',
            price: '₱100',
            image: '../assets/images/halo-halo.jpg',
            available: true
        },
        'leche-flan': {
            name: 'Leche Flan',
            category: 'Desserts',
            description: 'Creamy Filipino caramel custard made with eggs and condensed milk. Rich and sweet!',
            price: '₱80',
            image: '../assets/images/leche-flan.jpg',
            available: true
        },
        'buko-juice': {
            name: 'Buko Juice',
            category: 'Beverages',
            description: 'Fresh coconut juice served cold. Natural and refreshing!',
            price: '₱60',
            image: '../assets/images/buko-juice.jpg',
            available: true
        },
        'calamansi': {
            name: 'Calamansi Juice',
            category: 'Beverages',
            description: 'Refreshing Filipino lime juice. Sweet, sour, and perfect for hot days!',
            price: '₱50',
            image: '../assets/images/calamansi.jpg',
            available: true
        },
        'iced-coffee': {
            name: 'Iced Coffee',
            category: 'Beverages',
            description: 'Cold brewed coffee with milk and sugar. Energizing and delicious!',
            price: '₱70',
            image: '../assets/images/iced-coffee.jpg',
            available: true
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
            
            const category = this.dataset.category;
            filterByCategory(category);
        });
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
        
        cards.forEach(card => {
            const name = card.querySelector('.menu-name').textContent.toLowerCase();
            const description = card.querySelector('.menu-description').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function filterByCategory(category) {
        const cards = document.querySelectorAll('.menu-card');
        
        cards.forEach(card => {
            if (category === 'all') {
                card.style.display = '';
            } else {
                if (card.dataset.category === category) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            }
        });
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
});
