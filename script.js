// Toggle Menu
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    if (menu) menu.classList.toggle('active');
}

// Menu Data
const menuItems = [
    // Breakfast
    { id: 1, category: 'breakfast', name: 'Classic American Breakfast', description: 'Eggs, bacon, toast, hashbrowns', price: 12 },
    { id: 2, category: 'breakfast', name: 'Pancake Stack', description: '3 fluffy pancakes with maple syrup', price: 10 },
    { id: 3, category: 'breakfast', name: 'French Toast', description: 'Thick cut bread, powdered sugar', price: 9 },
    { id: 4, category: 'breakfast', name: 'Breakfast Burrito', description: 'Eggs, cheese, sausage, peppers', price: 11 },
    { id: 5, category: 'breakfast', name: 'Avocado Toast', description: 'Sourdough, avocado, poached egg', price: 10 },

    // Lunch
    { id: 6, category: 'lunch', name: 'Classic Cheeseburger', description: 'Beef patty, cheddar, lettuce, tomato', price: 13 },
    { id: 7, category: 'lunch', name: 'BBQ Bacon Burger', description: 'Double patty, BBQ sauce, crispy bacon', price: 15 },
    { id: 8, category: 'lunch', name: 'Grilled Chicken Sandwich', description: 'Lettuce, tomato, mayo', price: 12 },
    { id: 9, category: 'lunch', name: 'Club Sandwich', description: 'Turkey, bacon, lettuce, tomato', price: 13 },
    { id: 10, category: 'lunch', name: 'Fish & Chips', description: 'Crispy fish fillet, fries, coleslaw', price: 14 },
    { id: 11, category: 'lunch', name: 'Mac & Cheese', description: 'Creamy homemade style', price: 10 },

    // Sandwiches
    { id: 12, category: 'sandwiches', name: 'BLT Sandwich', description: 'Bacon, lettuce, tomato, mayo', price: 9 },
    { id: 13, category: 'sandwiches', name: 'Tuna Melt', description: 'Tuna, cheddar, toasted bread', price: 10 },
    { id: 14, category: 'sandwiches', name: 'Philly Cheesesteak', description: 'Beef, peppers, onions, provolone', price: 14 },
    { id: 15, category: 'sandwiches', name: 'Reuben Sandwich', description: 'Corned beef, sauerkraut, swiss', price: 13 },

    // Sides
    { id: 16, category: 'sides', name: 'French Fries', description: 'Crispy golden fries', price: 4 },
    { id: 17, category: 'sides', name: 'Onion Rings', description: 'Crispy battered onion rings', price: 5 },
    { id: 18, category: 'sides', name: 'Coleslaw', description: 'Creamy homemade coleslaw', price: 3 },
    { id: 19, category: 'sides', name: 'Side Salad', description: 'Fresh garden salad', price: 5 },

    // Drinks
    { id: 20, category: 'drinks', name: 'Soft Drinks', description: 'Coke, Sprite, or Dr. Pepper', price: 3 },
    { id: 21, category: 'drinks', name: 'Fresh Lemonade', description: 'Freshly squeezed lemonade', price: 4 },
    { id: 22, category: 'drinks', name: 'Milkshake', description: 'Chocolate, vanilla, or strawberry', price: 6 },
    { id: 23, category: 'drinks', name: 'Coffee', description: 'Hot or iced coffee', price: 3 },
    { id: 24, category: 'drinks', name: 'Iced Tea', description: 'Sweet or unsweetened', price: 3 },
];

// Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save Cart
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => el.textContent = count);
}

// Render Menu
function renderMenu(filter = 'all') {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;

    const filtered = filter === 'all' ?
        menuItems :
        menuItems.filter(item => item.category === filter);

    grid.innerHTML = filtered.map(item => `
        <div class="menu-item">
            <h3>${getCategoryEmoji(item.category)} ${item.name}</h3>
            <p>${item.description}</p>
            <div class="menu-item-footer">
                <span class="price">$${item.price}.00</span>
                <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                    + Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Get Category Emoji
function getCategoryEmoji(category) {
    const emojis = {
        breakfast: '🍳',
        lunch: '🍔',
        sandwiches: '🥪',
        sides: '🍟',
        drinks: '🥤'
    };
    return emojis[category] || '🍽️';
}

// Filter Menu
function filterMenu(category) {
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    renderMenu(category);
}

// Add to Cart
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const existing = cart.find(i => i.id === itemId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    saveCart();
    showAddedNotification(item.name);
}

// Show Added Notification
function showAddedNotification(name) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #8B2500;
        color: #FFF8DC;
        padding: 15px 25px;
        border-radius: 8px;
        font-size: 16px;
        z-index: 9999;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    notification.textContent = `✅ ${name} added to cart!`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2500);
}

// Render Cart
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>🛒 Your cart is empty</h3>
                <p>Add some delicious items from our menu!</p>
                <br>
                <button onclick="window.location.href='menu.html'"
                    style="padding:12px 30px; background-color:#8B2500; color:#FFF8DC; border:none; border-radius:5px; font-size:16px; cursor:pointer; font-weight:bold;">
                    Browse Menu
                </button>
            </div>
        `;
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
                <span style="font-size:18px; font-weight:bold;">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + 5;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;

    if (cartSummary) cartSummary.style.display = 'block';
}

// Update Quantity
function updateQty(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== itemId);
    }

    saveCart();
    renderCart();
}

// Render Checkout Summary
function renderCheckoutSummary() {
    const orderItems = document.getElementById('order-items');
    if (!orderItems) return;

    if (cart.length === 0) {
        window.location.href = 'menu.html';
        return;
    }

    orderItems.innerHTML = cart.map(item => `
        <div class="order-summary-item">
            <span>${item.quantity}x ${item.name}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + 5;

    document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;

    // Payment method toggle
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('paypal-info').style.display = 'none';
            document.getElementById('bank-info').style.display = 'none';
            document.getElementById('zelle-info').style.display = 'none';

            if (this.value === 'paypal') {
                document.getElementById('paypal-info').style.display = 'block';
            } else if (this.value === 'bank') {
                document.getElementById('bank-info').style.display = 'block';
            } else if (this.value === 'zelle') {
                document.getElementById('zelle-info').style.display = 'block';
            }
        });
    });
}

// Place Order
async function placeOrder() {
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const email = document.getElementById('customer-email').value;
    const address = document.getElementById('delivery-address').value;
    const city = document.getElementById('delivery-city').value;
    const zip = document.getElementById('delivery-zip').value;
    const deliveryNotes = document.getElementById('delivery-notes').value;
    const orderNotes = document.getElementById('order-notes').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;

    if (!name || !phone || !email || !address || !city || !zip) {
        alert('Please fill in all required fields!');
        return;
    }

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const confirmed = confirm(
        'IMPORTANT NOTICE:\n\n' +
        'All orders are final and cannot be cancelled once placed.\n\n' +
        'Do you want to confirm your order?'
    );

    if (!confirmed) return;

    try {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal + 5;
        const orderNumber = 'TPE-' + Date.now().toString().slice(-6);

        await db.collection('orders').add({
            orderNumber,
            customerName: name,
            customerPhone: phone,
            customerEmail: email,
            deliveryAddress: address,
            deliveryCity: city,
            deliveryZip: zip,
            deliveryNotes,
            orderNotes,
            paymentMethod: payment,
            items: cart,
            subtotal: subtotal.toFixed(2),
            deliveryFee: '5.00',
            total: total.toFixed(2),
            status: 'new',
            createdAt: new Date().toISOString()
        });

        // Save order number and clear cart
        localStorage.setItem('lastOrder', JSON.stringify({
            orderNumber,
            customerName: name,
            deliveryAddress: address,
            deliveryCity: city,
            paymentMethod: payment,
            total: total.toFixed(2),
            items: cart
        }));

        cart = [];
        saveCart();

        window.location.href = 'confirmation.html';

    } catch (error) {
        alert('Error placing order. Please try again.');
        console.error(error);
    }
}

// Render Confirmation
function renderConfirmation() {
    const orderDetails = document.getElementById('order-details');
    if (!orderDetails) return;

    const lastOrder = JSON.parse(localStorage.getItem('lastOrder'));
    if (!lastOrder) {
        window.location.href = 'index.html';
        return;
    }

    orderDetails.innerHTML = `
        <p><strong>Order #:</strong> <span>${lastOrder.orderNumber}</span></p>
        <p><strong>Name:</strong> <span>${lastOrder.customerName}</span></p>
        <p><strong>Address:</strong> <span>${lastOrder.deliveryAddress}, ${lastOrder.deliveryCity}</span></p>
        <p><strong>Payment:</strong> <span>${lastOrder.paymentMethod}</span></p>
        <p><strong>Total:</strong> <span style="color:#8B2500; font-weight:bold;">$${lastOrder.total}</span></p>
        <p><strong>Estimated Time:</strong> <span>20 - 40 minutes</span></p>
        <hr style="margin:15px 0; border-color:#D4A017;">
        <strong>Items:</strong>
        ${lastOrder.items.map(item => `
            <div style="display:flex; justify-content:space-between; padding:5px 0;">
                <span>${item.quantity}x ${item.name}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('')}
    `;
}

// Initialize Pages
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();

    if (document.getElementById('menu-grid')) {
        renderMenu();
    }

    if (document.getElementById('cart-items')) {
        renderCart();
    }

    if (document.getElementById('order-items')) {
        renderCheckoutSummary();
    }

    if (document.getElementById('order-details')) {
        renderConfirmation();
    }
});