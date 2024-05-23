// Sample menu data (Consider fetching this data from a server in a real-world scenario)
const menu = {
    "Starters": ["Nachos", "Wings", "Spring Rolls", "Garlic Bread", "Bruschetta"],
    "Main Course": ["Burger", "Pizza", "Pasta", "Margherita Pizza", "Spaghetti Carbonara"],
    "Desserts": ["Ice Cream", "Cake", "Cheesecake", "Tiramisu"],
    "Drinks": ["Soda", "Juice", "Coffee"]
};

// Function to populate the menu items on the webpage
function populateMenu() {
    const menuContainer = document.getElementById('menu');

    for (let category in menu) {
        let categoryHeading = document.createElement('h2');
        categoryHeading.textContent = category;
        menuContainer.appendChild(categoryHeading);

        let itemList = document.createElement('ul');

        menu[category].forEach(item => {
            let listItem = document.createElement('li');
            listItem.textContent = item;
            listItem.addEventListener('click', () => handleItemClick(item)); // Using named callback function
            itemList.appendChild(listItem);
        });

        menuContainer.appendChild(itemList);
    }
}

// Callback function for adding an item to the order
function handleItemClick(item) {
    orderState.addItem(item); // Update order state
    updateOrder();
}

// Function to update the order summary
function updateOrder() {
    const orderList = document.getElementById('order-items');
    const totalElement = document.getElementById('order-total');
    let totalPrice = 0;

    // Clear previous order list
    orderList.innerHTML = '';

    // Populate order list
    const currentOrder = orderState.getOrder(); // Get current order state
    currentOrder.forEach(item => {
        let listItem = document.createElement('li');
        listItem.textContent = item;
        orderList.appendChild(listItem);
        // You might have some logic to calculate prices here
        // For simplicity, let's just add a fixed price for each item
        totalPrice += 5; // Assuming each item costs $5
    });

    // Update total price
    totalElement.textContent = totalPrice.toFixed(2);
}

// Function to initialize the menu system
function initMenuSystem(menu) {
    populateMenu(menu);
}

// Initialize order state using closure
const orderState = (() => {
    let order = [];
    return {
        getOrder: () => order,
        addItem: (item) => order.push(item),
        clearOrder: () => order = []
    };
})();

// Call the initMenuSystem function when the page loads
window.onload = () => {
    initMenuSystem(menu);
};