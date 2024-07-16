document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');

    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Prix : ${product.price} €</p>
                `;
                productsContainer.appendChild(productElement);
            });
        })
        .catch(error => console.error('Erreur:', error));
});
