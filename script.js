// Define classes (same as before)
class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  class ShoppingCartItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
    }
  
    calculateTotalPrice() {
      return this.product.price * this.quantity;
    }
  }
  
  class ShoppingCart {
    constructor() {
      this.items = [];
    }
  
    getTotalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    }
  
    addItem(product, quantity) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push(new ShoppingCartItem(product, quantity));
      }
      updateCartDisplay();
    }
  
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      updateCartDisplay();
    }
  
    getTotalCost() {
      return this.items.reduce((total, item) => total + item.calculateTotalPrice(), 0);
    }
  
    displayCart() {
      return this.items;
    }
  }
  
  // Initialize products and cart
  const product1 = new Product(1, "Laptop", 1200);
  const product2 = new Product(2, "Phone", 800);
  const product3 = new Product(3, "Tablet", 600);
  
  const products = [product1, product2, product3];
  const cart = new ShoppingCart();
  
  // DOM references
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const totalItems = document.getElementById("total-items");
  const totalCost = document.getElementById("total-cost");
  
  // Display products
  function displayProducts() {
    products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: $${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(productDiv);
    });
  }
  
  // Add product to cart
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      cart.addItem(product, 1);
    }
  }
  
  // Update cart display
  function updateCartDisplay() {
    cartItems.innerHTML = "";
  
    const items = cart.displayCart();
    items.forEach(item => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");
      cartItemDiv.innerHTML = `
        <h3>${item.product.name}</h3>
        <p>Quantity: ${item.quantity}</p>
        <p>Total Price: $${item.calculateTotalPrice().toFixed(2)}</p>
        <button onclick="removeFromCart(${item.product.id})">Remove</button>
      `;
      cartItems.appendChild(cartItemDiv);
    });
  
    totalItems.textContent = `Total Items: ${cart.getTotalItems()}`;
    totalCost.textContent = `Total Cost: $${cart.getTotalCost().toFixed(2)}`;
  }
  
  // Remove product from cart
  function removeFromCart(productId) {
    cart.removeItem(productId);
  }
  
  // Initialize the page
  displayProducts();
  