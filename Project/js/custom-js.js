document.addEventListener("DOMContentLoaded", function() {
    //fetching the global header the footer
    fetch("header.html")
        .then(response => response.text())
        .then(headerContent => {
            document.getElementById("header").innerHTML = headerContent;
        });

    fetch("footer.html")
        .then(response => response.text())
        .then(footerContent => {
            document.getElementById("footer").innerHTML = footerContent;
        });

    //js code for contact page
    const contactFormDetails = document.querySelector('.contact-form-details');
    const successMessage = document.querySelector('.success-message');

    if (contactFormDetails && successMessage) {
        contactFormDetails.addEventListener('submit', function (event) {
            event.preventDefault();
            contactFormDetails.style.display = 'none';
            successMessage.style.display = 'flex';
        });
    }

    // js code for products
    if (document.body.className.startsWith('product-')) {
        const productImages = document.querySelectorAll('.product-image-gallery .product-image');
        const prevButton = document.querySelector('.gallery-nav.prev');
        const nextButton = document.querySelector('.gallery-nav.next');
        let currentImageIndex = 0;

        function showImage(index) {
            productImages.forEach(img => img.classList.remove('active'));
            productImages[index].classList.add('active');
        }

        if (productImages.length > 0) {
            showImage(currentImageIndex);
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentImageIndex--;
                if (currentImageIndex < 0) {
                    currentImageIndex = productImages.length - 1;
                }
                showImage(currentImageIndex);
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentImageIndex++;
                if (currentImageIndex >= productImages.length) {
                    currentImageIndex = 0;
                }
                showImage(currentImageIndex);
            });
        }

        //js code for add to cart
        const buyBtn = document.querySelector(".buy-button");
        if (buyBtn) {
            buyBtn.addEventListener("click", function () {
                const productContainer = document.querySelector('.product-container');
                const product = {
                    id: productContainer.dataset.productId,
                    name: document.querySelector('.product-detail h1').textContent,
                    price: parseFloat(document.querySelector('.price').textContent.replace('$', '')),
                    quantity: 1,
                    image: document.querySelector('.product-image.active').src
                };

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingProductIndex = cart.findIndex(item => item.id === product.id);

                if (existingProductIndex > -1) {
                    cart[existingProductIndex].quantity += 1;
                } else {
                    cart.push(product);
                }

                localStorage.setItem('cart', JSON.stringify(cart));

                const message = document.createElement("div");
                message.textContent = `"${product.name}" added to cart! Click here to view.`;
                message.classList.add("cart-alert");
                message.addEventListener("click", () => {
                    window.location.href = "cart.html";
                });
                document.body.appendChild(message);

                setTimeout(() => {
                    message.remove();
                }, 3000);
            });
        }
    }

    // js code for cart
    if (document.body.classList.contains('cart-page')) {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSummary = document.getElementById('cart-summary');
        const cartSubtotal = document.getElementById('cart-subtotal');
        const cartTotal = document.getElementById('cart-total');
        const emptyCartMessage = document.getElementById('empty-cart-message');
        const thankYouMessage = document.getElementById('thank-you-message');
        const checkoutButton = document.querySelector('.checkout-button');
        const cartItemTemplate = document.getElementById('cart-item-template');
        const cartHeading = document.getElementById('cart-heading');


        function calculateTotals(cart) {
            const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            const total = subtotal;

            cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
            cartTotal.textContent = `$${total.toFixed(2)}`;
        }

        function updateCartItem(id, quantity) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemIndex = cart.findIndex(item => item.id === id);

            if (itemIndex > -1) {
                cart[itemIndex].quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        }

        function removeCartItem(id) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const updatedCart = cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            renderCart();
        }

        function renderCart() {
            const cart = (JSON.parse(localStorage.getItem('cart')) || []);
            cartItemsContainer.innerHTML = '';

            if (cart.length === 0) {
                emptyCartMessage.classList.remove('hidden');
                cartSummary.classList.add('hidden');
            } else {
                emptyCartMessage.classList.add('hidden');
                cartSummary.classList.remove('hidden');

                cart.forEach(item => {
                    const clone = cartItemTemplate.content.cloneNode(true);
                    const cartItemEl = clone.querySelector('.cart-item');
                    cartItemEl.dataset.id = item.id;

                    const img = cartItemEl.querySelector('.cart-item-image');
                    img.src = item.image;
                    img.alt = item.name;

                    cartItemEl.querySelector('.cart-item-name').textContent = item.name;
                    cartItemEl.querySelector('.cart-item-price').textContent = `$${(item.price * item.quantity).toFixed(2)}`;

                    const quantityInput = cartItemEl.querySelector('.item-quantity');
                    quantityInput.value = item.quantity;

                    cartItemsContainer.appendChild(clone);
                });

                calculateTotals(cart);
            }
        }


        cartItemsContainer.addEventListener('change', (event) => {
            if (event.target.classList.contains('item-quantity')) {
                const quantity = parseInt(event.target.value, 10);
                const cartItem = event.target.closest('.cart-item');
                const id = cartItem.dataset.id;
                if (quantity > 0) {
                    updateCartItem(id, quantity);
                } else {
                    removeCartItem(id);
                }
            }
        });

        cartItemsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item-button')) {
                const cartItem = event.target.closest('.cart-item');
                const id = cartItem.dataset.id;
                removeCartItem(id);
            }
        });

        checkoutButton.addEventListener('click', () => {
            localStorage.removeItem('cart');
            cartItemsContainer.innerHTML = '';
            cartSummary.classList.add('hidden');
            thankYouMessage.classList.remove('hidden');

            if (cartHeading) {
                cartHeading.classList.add('hidden');
            }
        });

        renderCart();
    }
});
