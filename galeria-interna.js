let mobileSwiper = null; 
document.addEventListener('DOMContentLoaded', () => {
    fetch('products.json')
      .then(response => response.json())
      .then(products => {
        const limitedProducts = products.slice(4, 7);
        loadProducts(limitedProducts); // Carga los productos
        initializeMobileCarousel(); // Inicia el carousel
      })
      .catch(error => console.error('Error al cargar los productos:', error));
});
  
function initializeMobileCarousel() {
    const swiperContainer = document.getElementById('gallery-products-container-mobile');
    if (window.innerWidth < 640 && !mobileSwiper && swiperContainer) {
      swiperContainer.classList.remove('hidden');
      mobileSwiper = new Swiper(swiperContainer, {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
       
      });
    } else if (window.innerWidth >= 640 && mobileSwiper) {
      mobileSwiper.destroy(true, true); 
    }
  }
  
  window.addEventListener('resize', () => {
    clearTimeout(window.resizingFinished);
    window.resizingFinished = setTimeout(() => {
      initializeMobileCarousel(); // Re-inicializa Swiper en el evento de redimensionamiento
    }, 250);
  });
  
  function loadProducts(products) {
   
    const containerDesktop = document.getElementById('gallery-products-container-desktop');
    const containerMobile = document.getElementById('gallery-products-container-mobile');
  
   
    containerDesktop.innerHTML = '';
    containerMobile.innerHTML = '';
  
    
    products.forEach(product => {
      const productHtml = createProductHtml(product);
      containerDesktop.insertAdjacentHTML('beforeend', productHtml);
     
      
    });
  }
  
  function createProductHtml(product) {
  
    return `
      <div class="product-card swiper-slide flex flex-col bg-black p-4 rounded-lg overflow-hidden mb-4 sm:mb-6 w-full" data-id="${product.id}">
      <a href="interna.html?id=${product.id}"  class="block">
      <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-auto object-cover mb-4">
      </a>
        <div class="text-left">
        <a href="interna.html?id=${product.id}"  class="block">
          <h3 class="text-lg font-semibold mb-2 product-n1">${product.name}</h3>
          </a>
          <p class="text-sm mb-4 product-description1">${product.description}</p>
          <div class="flex justify-center items-center">
            <div class="text-lg font-bold product-price1 ml-10 mr-2 md:ml-10">$${product.price}</div>
            <button class="agregar-boton">Agregar al pedido</button>
          </div>
        </div>
      </div>
    `;
  }
  
  initializeAddToCartButtons();

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
  
  