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
            <img src="${product.imageUrl}" alt="${productName}" class=" w-full object-cover object-center">
           
          </div>


        <div class="flex-grow">
        <img src="${product.imageUrl}" alt="${productName}" class="md:hidden w-full  object-cover object-center">
      
        <h3 class="text-lg font-semibold mb-2 sm:mb-4 product-n">${productName}</h3>
            <p class="text-sm mb-6 sm:mb-6 product-description">${product.description}</p>
            <div class="flex items-baseline mb-2 sm:mb-4 ">
              <div class="text-lg font-bold product-price">$${product.price}.-</div>
              <div class="text-sm product-previous-price">$${product.previousPrice}.-</div>
            </div>
            <button class="mt-2 py-2 px-4 agregar-btn">Agregar al pedido</button>
        
          </div>
        </div>
      `;
      // Usa insertAdjacentHTML en lugar de innerHTML +=
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
    </div>
   
      `;
      // Usa insertAdjacentHTML en lugar de innerHTML +=
      container.insertAdjacentHTML('beforeend', productHtml);
    });
  
    // Ahora inicializa los botones después de agregarlos
    initializeAddToCartButtons();
  }


function initializeAddToCartButtons() {
  // Asegúrate de que esta función se llama después de agregar los productos
  document.querySelectorAll('.agregar-btn').forEach(button => {
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


document.addEventListener('DOMContentLoaded', function () {
  const allProducts = document.querySelectorAll('#additional-products-container .flex');
  const loadMoreButton = document.getElementById('load-more-button');

  // Asumiendo que quieres mostrar solo 3 productos en móvil.
  const maxProductsToShowOnMobile = 3;

  // Función para actualizar la visualización de productos
  function updateProductDisplay() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    
    // Mostrar solo los primeros 3 productos en móvil
    allProducts.forEach((product, index) => {
      if (width < 768 && index >= maxProductsToShowOnMobile) { // 768px es un punto de quiebre común para móviles
        product.style.display = 'none';
      } else {
        product.style.display = 'flex'; // o tu clase display por defecto
      }
    });
  }

  // Ejecutar al cargar la página
  updateProductDisplay();

  // Escuchar al botón para cargar más productos
  loadMoreButton.addEventListener('click', function() {
    allProducts.forEach(product => {
      product.style.display = 'flex'; // o tu clase display por defecto
    });
    loadMoreButton.style.display = 'none'; // Ocultar el botón después de mostrar todos los productos
  });

  // Escuchar el redimensionamiento de la ventana para ajustar la visualización de productos
  window.addEventListener('resize', updateProductDisplay);
});