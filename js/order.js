// PRODUCTS DATA
const products = [
  { id: 1, name: 'Sourdough Bread', description: 'Fresh artisan loaf', price: 5.99, image: 'images/bread1.jpg' },
  { id: 2, name: 'Croissant', description: 'Buttery pastry', price: 4.49, image: 'images/hero1.jpg' },
  { id: 3, name: 'Ciabatta', description: 'Italian style bread', price: 6.99, image: 'images/bread2.jpg' },
  { id: 4, name: 'Whole Wheat Bread', description: 'Nutritious & hearty', price: 5.49, image: 'images/bread3.jpg' },
  { id: 5, name: 'Chocolate Cake', description: 'Decadent chocolate', price: 12.99, image: 'images/hero2.jpg' },
  { id: 6, name: 'Blueberry Muffin', description: 'Fresh berries', price: 3.99, image: 'images/product7.jpg' },
];

let cart = [];

// RENDER PRODUCTS
function renderProducts() {
  const container = document.getElementById('productsContainer');
  container.innerHTML = products.map(product => `
    <div class="order-product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="order-product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="order-product-bottom">
          <span class="order-price">$${product.price.toFixed(2)}</span>
        </div>
        <button class="add-to-cart-btn" onclick="orderNow(${product.id})">
          <i class="fas fa-check-circle"></i> Order Now
        </button>
      </div>
    </div>
  `).join('');
}

// ORDER NOW FUNCTION
function orderNow(productId) {
  const product = products.find(p => p.id === productId);
  
  // Add to cart
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  
  // Scroll to form
  setTimeout(() => {
    document.querySelector('.order-form-section').scrollIntoView({ behavior: 'smooth' });
  }, 300);
}

// REMOVE FROM CART
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// UPDATE CART DISPLAY
function updateCart() {
  const cartItemsDiv = document.getElementById('cartItems');
  
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
  } else {
    cartItemsDiv.innerHTML = cart.map(item => `
      <div class="cart-item">
        <span class="cart-item-name">${item.name} x${item.quantity}</span>
        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `).join('');
  }

  updateTotals();
}

// UPDATE TOTALS
function updateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const delivery = cart.length > 0 ? 2.50 : 0;
  const total = subtotal + tax + delivery;

  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('delivery').textContent = `$${delivery.toFixed(2)}`;
  document.getElementById('total').textContent = `$${total.toFixed(2)}`;

  // Enable/disable checkout button
  document.getElementById('checkoutBtn').disabled = cart.length === 0;
}

// HANDLE FORM SUBMISSION
document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert('Please add items to your cart');
    return;
  }

  const formData = new FormData(this);
  const orderData = Object.fromEntries(formData);
  
  console.log('Order Summary:', {
    ...orderData,
    items: cart,
    total: document.getElementById('total').textContent
  });

  alert('Thank you for your order! \n\nOrder Details:\n' + 
    `Name: ${orderData.fullName}\n` +
    `Email: ${orderData.email}\n` +
    `Items: ${cart.length} product(s)\n` +
    `Total: ${document.getElementById('total').textContent}\n\n` +
    'You will receive a confirmation email shortly.');

  // Reset form
  this.reset();
  cart = [];
  updateCart();
});

// MOBILE MENU TOGGLE
document.getElementById('menu-toggle').addEventListener('click', function() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
});

// DARK MODE TOGGLE
document.getElementById('darkToggleBtn').addEventListener('click', function() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});

// LOAD DARK MODE PREFERENCE
window.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
  }
  renderProducts();
  updateTotals();
});
