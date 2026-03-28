const API_URL = "https://storage.googleapis.com/acciojob-open-file-collections/appsmith-uploads/bb3807e9b0bc49958d39563eb1759406.json";

let globalMenu = [];
let cartCount = 0; 

// 1. Fetch Menu
async function getMenu() {
    try {
        const response = await fetch(API_URL);
        const foodItems = await response.json();
        globalMenu = foodItems; 
        
        const menuContainer = document.getElementById('menu-container');
        if (!menuContainer) return; 
        menuContainer.innerHTML = ''; 

        foodItems.forEach(item => {
            const cardHTML = `
                <div class="menu-card">
                    <img src="${item.imgSrc}" alt="${item.name}" class="food-img">
                    <div class="card-details">
                        <div class="info">
                            <h4>${item.name}</h4>
                            <p>$${item.price}</p>
                        </div>
                        <button class="add-btn" onclick="addToCart()">+</button>
                    </div>
                </div>
            `;
            menuContainer.innerHTML += cardHTML;
        });
    } catch (error) {
        console.error("Error loading menu:", error);
    }
}

// UI Interaction
function addToCart() {
    cartCount++;
    const cartBar = document.getElementById('cart-bar');
    cartBar.classList.remove('hidden');
    document.getElementById('cart-count').innerText = `${cartCount} Item(s)`;
}

// 2. Take Order
function TakeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const burgers = globalMenu.filter(item => item.name.toLowerCase().includes('burger'));
            const randomBurgers = [];
            
            for (let i = 0; i < 3; i++) {
                if (burgers.length > 0) {
                    randomBurgers.push(burgers[Math.floor(Math.random() * burgers.length)]);
                } else {
                    randomBurgers.push({name: "Generic Burger"});
                }
            }
            resolve({ items: randomBurgers });
        }, 2500); 
    });
}

// 3. Prepare Order
function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500); 
    });
}

// 4. Pay Order
function payOrder() {
    return new Promise((resolve) => {
        document.getElementById('payment-overlay').classList.remove('hidden');
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000); 
    });
}

// 5. Thank You
function thankyouFnc() {
    document.getElementById('payment-overlay').classList.add('hidden');
    alert("Thank you for eating with us today!");
    
    cartCount = 0;
    document.getElementById('cart-bar').classList.add('hidden');
}

// Promise Chain
async function startOrderProcess() {
    try {
        document.getElementById('cart-bar').innerHTML = "<span>Processing...</span>"; 
        
        const order = await TakeOrder();
        const prep = await orderPrep();
        const payment = await payOrder();

        if (payment.paid) {
            thankyouFnc();
        }
    } catch (error) {
        console.error("Error in process:", error);
    }
}

window.onload = () => {
    getMenu();
};