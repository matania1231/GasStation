interface Product { 
    name: string;
    price: number;
    quantity: number;
    description: string; // Fixed typo: descrption -> description
    image: string; // Fixed typo: imege -> image
}

interface Cart {
    products: Product[];
    totalPrice: number;
}

const cart: Cart = {
    products: [],
    totalPrice: 0
};

// Add a current product to track form inputs
let currentProduct: Partial<Product> = {};

function htmlproudct(products: Product[], totalPrice: number): string {
    return `
        <div class="cart">
            <h2>Cart</h2>
            ${products.map(product => `
                <div class="product">
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <p>Quantity: ${product.quantity}</p>
                    <p>Description: ${product.description}</p>
                    ${product.image ? `<img src="${product.image}" alt="Product named ${product.name} displayed in a shopping cart. Product description: ${product.description}. Price is ${product.price.toFixed(2)} dollars. Quantity is ${product.quantity}. The product is presented in a clean and organized online shopping environment." />` : ""}
                </div>
            `).join('')}
            <h3>Total Price: $${totalPrice.toFixed(2)}</h3>
        </div>
    `;
}

function renderCart(products: Product[]): void {
    try {
        const cartRoot = document.getElementById("cartRoot"); // Fixed: was looking for wrong class name
        if (!cartRoot) throw new Error("Cart root element not found");

        cartRoot.innerHTML = htmlproudct(cart.products, cart.totalPrice);
    } catch (error) {
        console.error("Error rendering cart:", error);
    }
}

function addProductToCart(product: Product): void {
    cart.products.push(product);
    cart.totalPrice += product.price * product.quantity;
    renderCart(cart.products);
}

function handelNameChange(ev: Event): void {
    try {
        const input = ev.target as HTMLInputElement;
        const newName = input.value;

        if (!newName) {
            throw new Error("Product name cannot be empty");
        }

        currentProduct.name = newName; // Fixed: store in currentProduct instead of cart.products[0]
    } catch (error) {
        console.error("Error handling name change:", error);
    }
}

function handelPriceChange(ev: Event): void {
    try {
        const input = ev.target as HTMLInputElement;
        const newPrice = parseFloat(input.value);

        if (isNaN(newPrice) || newPrice < 0) {
            throw new Error("Invalid price");
        }

        currentProduct.price = newPrice; // Fixed: store in currentProduct instead of cart.products[0]
    } catch (error) {
        console.error("Error handling price change:", error);
    }
}

function handelQuantityChange(ev: Event): void {
    try {
        const input = ev.target as HTMLInputElement;
        const newQuantity = parseInt(input.value, 10);

        if (isNaN(newQuantity) || newQuantity < 0) {
            throw new Error("Invalid quantity");
        }

        currentProduct.quantity = newQuantity; // Fixed: store in currentProduct instead of cart.products[0]
    } catch (error) {
        console.error("Error handling quantity change:", error);
    }
}

function handelDescriptionChange(ev: Event): void {
    try {
        const input = ev.target as HTMLInputElement;
        const newDescription = input.value;

        if (!newDescription) {
            throw new Error("Product description cannot be empty");
        }

        currentProduct.description = newDescription; // Fixed: store in currentProduct instead of cart.products[0]
    } catch (error) {
        console.error("Error handling description change:", error);
    }
}

function handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            currentProduct.image = e.target?.result as string; // Fixed: store in currentProduct instead of cart.products[0]
        };
        reader.readAsDataURL(file);
    }
}

// Added: Submit function to add currentProduct to cart
function submitProduct(): void {
    try {
        if (!currentProduct.name || !currentProduct.price || !currentProduct.quantity || !currentProduct.description) {
            throw new Error("All fields are required");
        }

        const product: Product = {
            name: currentProduct.name,
            price: currentProduct.price,
            quantity: currentProduct.quantity,
            description: currentProduct.description,
            image: currentProduct.image || ""
        };

        addProductToCart(product);
        currentProduct = {}; // Reset current product
        
        // Reset form
        const form = document.querySelector('.customform') as HTMLFormElement;
        if (form) form.reset();
        
    } catch (error) {
        console.error("Error submitting product:", error);
    }
}

// Added: Initialize event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    renderCart(cart.products);
    
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitProduct);
    }
});

renderCart(cart.products);