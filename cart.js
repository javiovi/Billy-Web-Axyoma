// cart.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('products.json')
  .then(response => response.json())
  .then(allProducts => {
    const destacados = allProducts.filter(product => product.section === 'destacados');
    const generales = allProducts.filter(product => product.section === 'generales');
    
    
    loadDestacados(destacados);
    loadGenerales(generales);
  })
  .catch(error => {
    console.error('Error al cargar los productos:', error);
  });
});

  // Esta función ahora se llama después de cargar los productos
  function loadDestacados(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // Limpia el contenido existente

    products.forEach((product) => {
      const productName = product.name.replace('EXT', "<br class='sm:hidden'>EXT");
      const productHtml = `
      <div class="dinamic-one -mb-8 flex md:flex-row items-center md:items-start bg-black p-4 rounded-lg overflow-hidden sm:mb-6  sm:items-start">
      <div class="hidden md:block  md:flex-shrink-0  md:w-full md:h-auto">
      <a href="interna.html?id=${product.id}"  class="block">
        <img src="${product.imageUrl}" alt="${productName}" class="w-full object-cover object-center">
      </a>
      </div>

        <div class="flex-grow">
        <img src="${product.imageUrl}" alt="${productName}" class="md:hidden w-full object-cover object-center">
        <a href="interna.html?id=${product.id}"  class="block"> 
        <h3 class="text-lg font-semibold mb-2 sm:mb-4 product-n">${productName}</h3> </a>
            <p class="text-sm mb-6 sm:mb-6 product-description">${product.description}</p>
            <div class="flex items-baseline mb-2 sm:mb-4 ">
              <div class="text-lg font-bold product-price">$${product.price}.-</div>
              <div class="text-sm product-previous-price">$${product.previousPrice}.-</div>
            </div>
            <button class="mt-2 agregar-btn">Agregar al pedido</button>
        
          </div>
        </div>
      `;
      // Usa insertAdjacentHTML en lugar de innerHTML +
      container.insertAdjacentHTML('beforeend', productHtml);
    });

    // Ahora inicializa los botones después de agregarlos
    initializeAddToCartButtons();

  }
  function loadGenerales(products) {
    const container = document.getElementById('additional-products-container');
    container.innerHTML = ''; // Limpia el contenido existente
  
    products.forEach((product) => {
     const productName = product.name
      const productHtml = `
      <div class="flex flex-col bg-black p-4 rounded-lg overflow-hidden mb-4 sm:mb-6 w-full product" data-id="${product.id}">
      <a href="interna.html?id=${product.id}"  class="block">
      <img src="${product.imageUrl}" alt="${productName}" class="w-full h-auto object-cover mb-4"> 
      </a>
      <div class="text-left ">
      <a href="interna.html?id=${product.id}"  class="block">
        <h3 class="text-lg font-semibold mb-2 product-n1">${productName}</h3>
        </a>
        <p class="text-sm mb-4 product-description1">${product.description}</p>
      </div>
      <div class="flex justify-between items-center">
        <div class="text-lg font-bold product-price1 ml-10">$${product.price}</div>
        <button class="agregar-boton">Agregar al pedido</button>
      </div>
    </div>
   
      `;
      // Usa insertAdjacentHTML en lugar de innerHTML +=
      container.insertAdjacentHTML('beforeend', productHtml);
    });

    if (window.innerWidth < 640) {
      const hiddenProducts = document.querySelectorAll('#additional-products-container .product[data-id]');
      hiddenProducts.forEach(product => {
        const productId = parseInt(product.dataset.id);
        if (productId > 5) {
          product.classList.add('hidden');
        }
      });
    }
  
    // Inicializa los botones después de agregarlos
    initializeAddToCartButtons();
  }
  
  


function initializeAddToCartButtons() {
 
  document.querySelectorAll('.agregar-btn, .agregar-boton').forEach(button => {
    button.addEventListener('click', addToCart);
  });
}

function addToCart() {
  // Incrementa el contador en el carrito
  let cartCount = parseInt(localStorage.getItem('cartCount') || 0);
  cartCount++;
  localStorage.setItem('cartCount', cartCount);
  updateCartCount();
}


function updateCartCount() {
  // Actualiza el contador del carrito
  const cartCount = localStorage.getItem('cartCount') || 0;
  document.getElementById('cart-count').textContent = `(${cartCount})`;
}


// Boton seleccionado en carrito 

document.querySelectorAll('.tab-principal').forEach(button => {
  button.addEventListener('click', function() {
    document.querySelectorAll('.tab-principal').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
  });
});

// BOTON + PRODUCTOS

function toggleVisibilityOfProducts() {
  const hiddenProducts = document.querySelectorAll('#additional-products-container .product[data-id]');
  // Toggle visibilidad de los productos con id > 5
  hiddenProducts.forEach(product => {
    const productId = parseInt(product.dataset.id);
    if (productId > 5) {
      product.classList.toggle('hidden');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle-products-button');

  // Inicialmente oculta los productos con id > 5 solo si es mobile
  if (window.innerWidth < 640) {
    toggleVisibilityOfProducts(); // Llamar la función al cargar la página
  }

  // Escuchar clicks en el botón de "VER MÁS PRODUCTOS"
  toggleButton.addEventListener('click', function() {
    toggleVisibilityOfProducts(); // Llamar la función en el click

    // Cambia el texto del botón
    if (this.textContent.includes('VER MÁS')) {
      this.textContent = '- VER MENOS PRODUCTOS';
    } else {
      this.textContent = '+ VER MÁS PRODUCTOS';
    }
  });

  // Evento para manejar cambios de tamaño de pantalla
  window.addEventListener('resize', function() {
    // Verifica si la pantalla es desktop y si hay productos ocultos
    if (window.innerWidth >= 640) {
      const hiddenProducts = document.querySelectorAll('#additional-products-container .product[data-id].hidden');
      // Si hay productos ocultos y es pantalla grande, los muestra
      if (hiddenProducts.length > 0) {
        toggleVisibilityOfProducts();
        toggleButton.textContent = '+ VER MÁS PRODUCTOS'; // Restablecer el texto del botón
      }
    }
  });
});
/* GALERIA INTERNA PRODUCTOS */

