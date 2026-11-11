
// Product Details
const products = [
    {
        id: 1,
        name: "Elegant Pink Top",
        price: 599,
        image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600"
    },
    {
        id: 2,
        name: "Classic White Top",
        price: 499,
        image: "https://images.unsplash.com/photo-1564257577-0a6b2b5a8c8b?w=600"
    },
    {
        id: 3,
        name: "Casual Fashion Top",
        price: 699,
        image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600"
    },
    {
        id: 4,
        name: "Stylish Black Top",
        price: 549,
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600"
    },
    {
        id: 5,
        name: "Floral Design Top",
        price: 649,
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600"
    },
    {
        id: 6,
        name: "Trendy Summer Top",
        price: 799,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600"
    }
];

// Shopping Cart
let cart = [];

// Display Products
function displayProducts(items) {
    const productList = document.getElementById("product-list");

    productList.innerHTML = "";

    if (items.length === 0) {
        productList.innerHTML = "<p>No products found.</p>";
        return;
    }

    items.forEach(product => {
        productList.innerHTML += `
            <div class="product-card">
                <img src="${product.image}"
                     alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: ₹${product.price}</p>
                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

// Add Products to Cart
function addToCart(id) {
    const product = products.find(item => item.id === id);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    alert(product.name + " added to cart!");
}

// Remove Products
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Update Cart
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    const cartCount = document.getElementById("cart-count");

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "Your cart is empty.";
    } else {
        cartItems.innerHTML = "";

        cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;

            cartItems.innerHTML += `
                <div class="cart-row">
                    <span>${item.name}</span>
                    <span>₹${item.price} × ${item.quantity}</span>
                    <button onclick="removeFromCart(${item.id})">
                        Remove
                    </button>
                </div>
            `;
        });
    }

    totalElement.textContent = total;
    cartCount.textContent = count;
}

// Search Products
document.getElementById("search").addEventListener("input", function() {
    const searchValue = this.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchValue)
    );

    displayProducts(filteredProducts);
});

// Checkout
function showCheckout() {
    if (cart.length === 0) {
        alert("Please add products to your cart first!");
        return;
    }

    document.getElementById("checkout").scrollIntoView({
        behavior: "smooth"
    });
}

// Place Order
document.getElementById("order-form").addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const payment = document.querySelector(
        'input[name="payment"]:checked'
    );

    if (!payment) {
        alert("Please select a payment method.");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    let orderDetails = "";

    cart.forEach(item => {
        orderDetails +=
            `${item.name} - Quantity: ${item.quantity} - ₹${item.price * item.quantity}\n`;
    });

    const message = `
NEW BOUTIQUE ORDER

Customer: ${name}
Phone: ${phone}
Address: ${address}

ORDER DETAILS:
${orderDetails}

Total Amount: ₹${total}
Payment Method: ${payment.value}

Thank you!
    `;

    // Replace with your boutique's WhatsApp number.
    const boutiqueNumber = "91XXXXXXXXXX";

    const whatsappURL =
        "https://wa.me/" + boutiqueNumber +
        "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
});

// Initial Display
displayProducts(products);
updateCart();
