document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product');
            const productId = productElement.dataset.id;
            const productName = productElement.querySelector('h3').innerText;
            const productPrice = parseFloat(productElement.querySelector('p').innerText.replace('$', ''));

            const product = cart.find(item => item.id === productId);
            if (product) {
                product.quantity++;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${productName} has been added to your cart!`);
        });
    });

    if (document.getElementById('cart-items')) {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalPriceContainer = document.getElementById('total-price');
        
        let totalPrice = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.price * item.quantity;
        });

        totalPriceContainer.innerText = totalPrice.toFixed(2);
    }

    if (document.getElementById('checkout')) {
        document.getElementById('checkout').addEventListener('click', () => {
            localStorage.removeItem('cart');
            alert('Thank you for your purchase!');
            window.location.href = 'index.html';
        });
    }
});
