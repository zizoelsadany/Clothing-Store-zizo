 let items = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const cartGrid = document.getElementById('cart-grid');
        const total = document.getElementById('total');

        function renderCart() {
            if(items.length) {
                let sum = 0;
                cartGrid.innerHTML = '';
                items.forEach((item, i) => {
                    sum += item.price;
                    cartGrid.innerHTML += `
                        <div class="product-item">
                            <img src="${item.img}" alt="${item.name}">
                            <h3>${item.name}</h3>
                            <p>${item.desc}</p>
                            <span class="price">${item.price}EGP</span>
                            <div class="product-actions">
                                <button onclick="removeItem(${i})" class="remove-btn">Remove</button>
                            </div>
                        </div>
                    `;
                });
                total.textContent = `Items: ${items.length} | Total: ${sum}EGP`;
            } else {
                cartGrid.innerHTML = '<p class="empty-cart">Cart is empty</p>';
                total.textContent = '';
            }
        }

        window.removeItem = function(index) {
            items.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(items));
            renderCart();
        };

        renderCart();
         const toggle = document.getElementById('menu-toggle');
  const links = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    links.classList.toggle('active');
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('active');
    });
  });