document.addEventListener('DOMContentLoaded', () => {
  const detailContainer = document.getElementById('category-detail');
  const params = new URLSearchParams(window.location.search);
  const categoryId = Number(params.get('id'));

  const categories = [
    {
      id: 1,
      name: 'Peluches',
      type: 'peluches',
      src: 'imgs/peluches.webp',
      description:
        'Peluches de diversos tamaños y colores para todas las edades.',
    },
    {
      id: 2,
      name: 'Coleccionable',
      type: 'coleccionable',
      src: 'imgs/coleccionable.webp',
      description:
        'Figuras coleccionables de tus personajes favoritos de series y películas.',
    },
    {
      id: 3,
      name: 'Juegos de Mesa',
      type: 'juguetes-educativos',
      src: 'imgs/mesa.webp',
      description: 'Juegos de mesa para toda la familia.',
    },
    {
      id: 4,
      name: 'Juegos de Construcción',
      type: 'juguetes-educativos',
      src: 'imgs/construccion.webp',
      description:
        'Sets de construcción que fomentan la creatividad y la coordinación.',
    },
  ];

  const category = categories.find((c) => c.id === categoryId);

  if (category) {
    detailContainer.innerHTML = `
      <div class="col-lg-8">
        <div class="card mb-5">
          <img src="${category.src}" class="card-img-top img-fluid detail-image" alt="${category.name}">
          <div class="card-body">
            <h3 class="card-title">${category.name}</h3>
            <p class="card-text">${category.description}</p>
            <a href="gallery.html" class="btn btn-secondary">Volver a Categorías</a>
          </div>
        </div>
      </div>
    `;
  } else {
    detailContainer.innerHTML = '<p>Categoría no encontrada.</p>';
  }
});
