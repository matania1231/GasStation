var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var cart = {
    products: [],
    totalPrice: 0
};
var currentProduct = {};
function sortProductsByPrice(products, ascending) {
    if (ascending === void 0) { ascending = true; }
    return __spreadArrays(products).sort(function (a, b) {
        return ascending ? a.price - b.price : b.price - a.price;
    });
}
function htmlproudct(products, totalPrice) {
    return "\n        <div class=\"cart\">\n            <h2>\u05E2\u05D2\u05DC\u05EA \u05E7\u05E0\u05D9\u05D5\u05EA</h2>\n            " + products.map(function (product) { return "\n                <div class=\"product\">\n                    <h3>" + product.name + "</h3>\n                    <p>\u05DE\u05D7\u05D9\u05E8: \u20AA" + product.price.toFixed(2) + "</p>\n                    <p>\u05DB\u05DE\u05D5\u05EA: " + product.quantity + "</p>\n                    <p>\u05EA\u05D9\u05D0\u05D5\u05E8: " + product.description + "</p>\n                    " + (product.image ? "<img src=\"" + product.image + "\" alt=\"" + product.name + "\" style=\"max-width: 200px; height: auto;\" />" : "") + "\n                </div>\n            "; }).join('') + "\n            <h3>\u05DE\u05D7\u05D9\u05E8 \u05DB\u05D5\u05DC\u05DC: \u20AA" + totalPrice.toFixed(2) + "</h3>\n        </div>\n    ";
}
function renderCart(products) {
    try {
        var cartRoot = document.getElementById("cartRoot");
        if (!cartRoot)
            throw new Error("Cart root element not found");
        cartRoot.innerHTML = htmlproudct(products, cart.totalPrice);
    }
    catch (error) {
        console.error("Error rendering cart:", error);
    }
}
var sortAscending = true;
function sortAndRenderCart(ascending) {
    if (ascending === void 0) { ascending = true; }
    var sortedProducts = sortProductsByPrice(cart.products, ascending);
    renderCart(sortedProducts);
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
        currentProduct.name = newName;
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
        currentProduct.price = newPrice;
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
        currentProduct.quantity = newQuantity;
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
        currentProduct.description = newDescription;
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
            currentProduct.image = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(file);
    }
}
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
        currentProduct = {};
        var form = document.querySelector('.customform');
        if (form)
            form.reset();
    }
    catch (error) {
        console.error("Error submitting product:", error);
    }
}
window.sortAndRenderCart = sortAndRenderCart;
window.sortAndRenderCart = sortAndRenderCart;
document.addEventListener('DOMContentLoaded', function () {
    renderCart(cart.products);
    var submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitProduct);
    }
    var sortBtn = document.getElementById('sortByPrice');
    if (sortBtn) {
        sortBtn.addEventListener('click', function () {
            sortAndRenderCart(sortAscending);
            sortAscending = !sortAscending;
            sortBtn.textContent = sortAscending ? 'מיין מזול ליקר' : 'מיין מיקר לזול';
        });
    }
});
renderCart(cart.products);
