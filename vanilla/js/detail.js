document.addEventListener( 'DOMContentLoaded', () => {
  const detailContainer = document.getElementById( 'category-detail' );
  const params = new URLSearchParams( window.location.search );
  const categoryId = Number( params.get( 'id' ) );

  const categories = [
    {
      id: 1,
      name: 'Peluches',
      type: 'peluches',
      src: 'imgs/peluches.webp',
      srcset: 'imgs/peluches-small.webp 300w, imgs/peluches-800.webp 800w',
      width: 1200,
      height: 800,
      description:
        'Peluches de diversos tamaños y colores para todas las edades.',
    },
    {
      id: 2,
      name: 'Coleccionable',
      type: 'coleccionable',
      src: 'imgs/coleccionable.webp',
      srcset: 'imgs/coleccionable-small.webp 300w, imgs/coleccionable-800.webp 800w',
      width: 1200,
      height: 800,
      description:
        'Figuras coleccionables de tus personajes favoritos de series y películas.',
    },
    {
      id: 3,
      name: 'Juegos de Mesa',
      type: 'juguetes-educativos',
      src: 'imgs/mesa.webp',
      srcset: 'imgs/mesa-small.webp 300w, imgs/mesa-800.webp 800w',
      width: 1200,
      height: 800,
      description: 'Juegos de mesa para toda la familia.',
    },
    {
      id: 4,
      name: 'Juegos de Construcción',
      type: 'juguetes-educativos',
      src: 'imgs/construccion.webp',
      srcset: 'imgs/construccion.webp',
      width: 1200,
      height: 800,
      description:
        'Sets de construcción que fomentan la creatividad y la coordinación.',
    },
  ];

  const category = categories.find( ( c ) => c.id === categoryId );

  if ( category ) {
    detailContainer.innerHTML = `
      <div class="col-lg-8">
        <div class="card mb-5">
          <picture>
            <source srcset="${ category.srcset }" 
            sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 800px"
            type="image/webp">
            <img 
              src="${ category.src }" 
              class="card-img-top img-fluid detail-image" 
              alt="${ category.name }"
              width="${ category.width }"
              height="${ category.height }"
              loading="eager">
          </picture>
          <div class="card-body">
            <h3 class="card-title">${ category.name }</h3>
            <p class="card-text">${ category.description }</p>
            <a href="gallery.html" class="btn btn-secondary">Volver a Categorías</a>
          </div>
        </div>
      </div>
    `;
  } else {
    detailContainer.innerHTML = '<p>Categoría no encontrada.</p>';
  }
} );
