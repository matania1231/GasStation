var cart = {
    products: [],
    totalPrice: 0
};
// Add a current product to track form inputs
var currentProduct = {};
function htmlproudct(products, totalPrice) {
    return "\n        <div class=\"cart\">\n            <h2>Cart</h2>\n            " + products.map(function (product) { return "\n                <div class=\"product\">\n                    <h3>" + product.name + "</h3>\n                    <p>Price: $" + product.price.toFixed(2) + "</p>\n                    <p>Quantity: " + product.quantity + "</p>\n                    <p>Description: " + product.description + "</p>\n                    " + (product.image ? "<img src=\"" + product.image + "\" alt=\"Product named " + product.name + " displayed in a shopping cart. Product description: " + product.description + ". Price is " + product.price.toFixed(2) + " dollars. Quantity is " + product.quantity + ". The product is presented in a clean and organized online shopping environment.\" />" : "") + "\n                </div>\n            "; }).join('') + "\n            <h3>Total Price: $" + totalPrice.toFixed(2) + "</h3>\n        </div>\n    ";
}
function renderCart(products) {
    try {
        var cartRoot = document.getElementById("cartRoot"); // Fixed: was looking for wrong class name
        if (!cartRoot)
            throw new Error("Cart root element not found");
        cartRoot.innerHTML = htmlproudct(cart.products, cart.totalPrice);
    }
    catch (error) {
        console.error("Error rendering cart:", error);
    }
}
function addProductToCart(product) {
    cart.products.push(product);
    cart.totalPrice += product.price * product.quantity;
    renderCart(cart.products);
}
function handleNameChange(ev) {
    try {
        var input = ev.target;
        var newName = input.value;
        if (!newName) {
            throw new Error("Product name cannot be empty");
        }
        currentProduct.name = newName; // Fixed: store in currentProduct instead of cart.products[0]
    }
    catch (error) {
        console.error("Error handling name change:", error);
    }
}
function handlePriceChange(ev) {
    try {
        var input = ev.target;
        var newPrice = parseFloat(input.value);
        if (isNaN(newPrice) || newPrice < 0) {
            throw new Error("Invalid price");
        }
        currentProduct.price = newPrice; // Fixed: store in currentProduct instead of cart.products[0]
    }
    catch (error) {
        console.error("Error handling price change:", error);
    }
}
function handleQuantityChange(ev) {
    try {
        var input = ev.target;
        var newQuantity = parseInt(input.value, 10);
        if (isNaN(newQuantity) || newQuantity < 0) {
            throw new Error("Invalid quantity");
        }
        currentProduct.quantity = newQuantity; // Fixed: store in currentProduct instead of cart.products[0]
    }
    catch (error) {
        console.error("Error handling quantity change:", error);
    }
}
function handleDescriptionChange(ev) {
    try {
        var input = ev.target;
        var newDescription = input.value;
        if (!newDescription) {
            throw new Error("Product description cannot be empty");
        }
        currentProduct.description = newDescription; // Fixed: store in currentProduct instead of cart.products[0]
    }
    catch (error) {
        console.error("Error handling description change:", error);
    }
}
function handleFileChange(event) {
    var input = event.target;
    if (input.files && input.files[0]) {
        var file = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            currentProduct.image = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result; // Fixed: store in currentProduct instead of cart.products[0]
        };
        reader.readAsDataURL(file);
    }
}
// Added: Submit function to add currentProduct to cart
function submitProduct() {
    try {
        if (!currentProduct.name || !currentProduct.price || !currentProduct.quantity || !currentProduct.description) {
            throw new Error("All fields are required");
        }
        var product = {
            name: currentProduct.name,
            price: currentProduct.price,
            quantity: currentProduct.quantity,
            description: currentProduct.description,
            image: currentProduct.image || ""
        };
        addProductToCart(product);
        currentProduct = {}; // Reset current product
        // Reset form
        var form = document.querySelector('.customform');
        if (form)
            form.reset();
    }
    catch (error) {
        console.error("Error submitting product:", error);
    }
}
// Added: Initialize event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    renderCart(cart.products);
    var submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitProduct);
    }
});
renderCart(cart.products);
