document.addEventListener( 'DOMContentLoaded', () => {
  const galleryContainer = document.getElementById( 'gallery-container' );
  const categoryFilter = document.getElementById( 'categoryFilter' );

  const categories = [
    {
      id: 1,
      name: 'Peluches',
      type: 'peluches',
      src: 'imgs/peluches.webp',
      srcset: 'imgs/peluches-small.webp 300w, imgs/peluches-800.webp 800w',
      width: 800,
      height: 600,
    },
    {
      id: 2,
      name: 'Coleccionable',
      type: 'coleccionable',
      src: 'imgs/coleccionable.webp',
      srcset: 'imgs/coleccionable-small.webp 300w, imgs/coleccionable-800.webp 800w',
      width: 800,
      height: 600,
    },
    {
      id: 3,
      name: 'Juegos de Mesa',
      type: 'juguetes-educativos',
      src: 'imgs/mesa.webp',
      srcset: 'imgs/mesa-small.webp 300w, imgs/mesa-800.webp 800w',
      width: 800,
      height: 600,
    },
    {
      id: 4,
      name: 'Juegos de Construcción',
      type: 'juguetes-educativos',
      src: 'imgs/construccion.webp',
      width: 800,
      height: 600,
    },
  ];

  function loadGallery( filter = 'all' ) {
    galleryContainer.innerHTML = '';

    const filteredCategories =
      filter === 'all'
        ? categories
        : categories.filter( ( c ) => c.type === filter );

    filteredCategories.forEach( ( category ) => {
      const col = document.createElement( 'div' );
      col.classList.add( 'col-md-4', 'mb-3' );
      col.innerHTML = `
        <div class="card h-100">
          <div class="ratio ratio-16x9 card-img-container">
            <img 
              src="${ category.src }" 
              srcset="${ category.srcset }"
              sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 800px"
              loading="lazy" 
              class="card-img-top" 
              alt="${ category.name }" 
              width="${ category.width }"
              height="${ category.height }"
              style="object-fit: cover;">
          </div>
          <div class="card-body text-center d-flex flex-column">
            <h5 class="card-title">${ category.name }</h5>
            <a href="detail.html?id=${ category.id }" class="btn btn-primary mt-auto">Ver Detalle</a>
          </div>
        </div>
      `;
      galleryContainer.appendChild( col );
    } );
  }

  // Implementar observador de intersección para mejorar la carga
  const observer = new IntersectionObserver( ( entries ) => {
    entries.forEach( entry => {
      if ( entry.isIntersecting ) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve( img );
      }
    } );
  } );

  categoryFilter.addEventListener( 'change', ( event ) => {
    loadGallery( event.target.value );
  } );

  loadGallery();
} );
