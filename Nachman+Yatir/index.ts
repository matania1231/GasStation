
interface Product { 
    name: string;
    price: number;
    quantity: number;
    description: string; 
    image: string; 
}

interface Cart {
    products: Product[];
    totalPrice: number;
}

const cart: Cart = {
    products: [],
    totalPrice: 0
};


let currentProduct: Partial<Product> = {};




function sortProductsByPrice(products: Product[], ascending: boolean = true): Product[] {
    return [...products].sort((a, b) => {
        return ascending ? a.price - b.price : b.price - a.price;
    });
}

function htmlproudct(products: Product[], totalPrice: number): string {
    return `
        <div class="cart">
            <h2>עגלת קניות</h2>
            ${products.map(product => `
                <div class="product">
                    <h3>${product.name}</h3>
                    <p>מחיר: ₪${product.price.toFixed(2)}</p>
                    <p>כמות: ${product.quantity}</p>
                    <p>תיאור: ${product.description}</p>
                    ${product.image ? `<img src="${product.image}" alt="${product.name}" style="max-width: 200px; height: auto;" />` : ""}
                </div>
            `).join('')}
            <h3>מחיר כולל: ₪${totalPrice.toFixed(2)}</h3>
        </div>
    `;
}

function renderCart(products: Product[]): void {
    try {
        const cartRoot = document.getElementById("cartRoot"); 
        if (!cartRoot) throw new Error("Cart root element not found");

        cartRoot.innerHTML = htmlproudct(products, cart.totalPrice);
    } catch (error) {
        console.error("Error rendering cart:", error);
    }
}




let sortAscending = true;


function sortAndRenderCart(ascending: boolean = true): void {
    const sortedProducts = sortProductsByPrice(cart.products, ascending);
    renderCart(sortedProducts);
}

function addProductToCart(product: Product): void {
    cart.products.push(product);
    cart.totalPrice += product.price * product.quantity;
    renderCart(cart.products);
}

function handleNameChange(ev: Event): void {
    try {
        const input = ev.target as HTMLInputElement;
        const newName = input.value;

        if (!newName) {
            throw new Error("Product name cannot be empty");
        }

        currentProduct.name = newName; 
    } catch (error) {
        console.error("Error handling name change:", error);
    }
}

function handlePriceChange(ev: Event): void {
    try {
        const input = ev.target as HTMLInputElement;
        const newPrice = parseFloat(input.value);

        if (isNaN(newPrice) || newPrice < 0) {
            throw new Error("Invalid price");
        }

        currentProduct.price = newPrice; 
    } catch (error) {
        console.error("Error handling price change:", error);
    }
}

function handleQuantityChange(ev: Event): void {
    try {
        const input = ev.target as HTMLInputElement;
        const newQuantity = parseInt(input.value, 10);

        if (isNaN(newQuantity) || newQuantity < 0) {
            throw new Error("Invalid quantity");
        }

        currentProduct.quantity = newQuantity; 
    } catch (error) {
        console.error("Error handling quantity change:", error);
    }
}

function handleDescriptionChange(ev: Event): void {
    try {
        const input = ev.target as HTMLInputElement;
        const newDescription = input.value;

        if (!newDescription) {
            throw new Error("Product description cannot be empty");
        }

        currentProduct.description = newDescription; 
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
            currentProduct.image = e.target?.result as string; 
        };
        reader.readAsDataURL(file);
    }
}


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
        currentProduct = {}; 
        
    
        const form = document.querySelector('.customform') as HTMLFormElement;
        if (form) form.reset();
        
    } catch (error) {
        console.error("Error submitting product:", error);
    }
}


(window as any).sortAndRenderCart = sortAndRenderCart;


(window as any).sortAndRenderCart = sortAndRenderCart;


document.addEventListener('DOMContentLoaded', function() {
    renderCart(cart.products);
    
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitProduct);
    }
    
    
    const sortBtn = document.getElementById('sortByPrice');
    if (sortBtn) {
        sortBtn.addEventListener('click', function() {
            sortAndRenderCart(sortAscending);
            sortAscending = !sortAscending; 
            
            
            sortBtn.textContent = sortAscending ? 'מיין מזול ליקר' : 'מיין מיקר לזול';
        });
    }
});

renderCart(cart.products);