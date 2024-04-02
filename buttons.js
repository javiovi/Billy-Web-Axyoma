document.addEventListener('DOMContentLoaded', () => {
    // Obtén los elementos de la página
    const productsContainer = document.getElementById('additional-products-container');
    const toggleButton = document.getElementById('toggle-products-button');
  
    // Función para cargar productos
    function loadProducts(products) {
      productsContainer.innerHTML = ''; // Limpiar el contenedor
  
      products.forEach(product => {
        if (product.visible) {
          const productHTML = `
          <div class="flex flex-col bg-black p-4 rounded-lg overflow-hidden mb-4 sm:mb-6 w-full">
      <img src="${product.imageUrl}" alt="${productName}" class="w-full h-auto object-cover mb-4"> 
      <div class="text-left ">
        <h3 class="text-lg font-semibold mb-2 product-n1">${productName}</h3>
        <p class="text-sm mb-4 product-description1">${product.description}</p>
      </div>
      <div class="flex justify-between items-center">
        <div class="text-lg font-bold product-price1 ml-10">$${product.price}</div>
        <button class="py-2 px-4 agregar-btn1 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition-colors">Agregar al pedido</button>
      </div>
    </div>` 
          productsContainer.insertAdjacentHTML('beforeend', productHTML);
        }
      });
    }
  
    // Evento del botón para mostrar/ocultar productos
    toggleButton.addEventListener('click', () => {
      // Determina si estamos mostrando más o menos productos
      const showingMore = toggleButton.textContent.includes('VER MÁS');
      
      // Actualiza el texto del botón
      toggleButton.textContent = showingMore ? '- VER MENOS PRODUCTOS' : '+ VER MÁS PRODUCTOS';
  
      // Mostrar/ocultar los productos según el estado
      const allProducts = productsContainer.querySelectorAll('.product');
      allProducts.forEach((product, index) => {
        if (index >= 3) { // Asumiendo que los primeros 3 están siempre visibles
          product.classList.toggle('hidden');
        }
      });
    });
  
    // Cargar los productos del JSON
    fetch('/products.json')
      .then(response => response.json())
      .then(data => loadProducts(data))
      .catch(error => console.error('Error al cargar los productos:', error));
  });
  