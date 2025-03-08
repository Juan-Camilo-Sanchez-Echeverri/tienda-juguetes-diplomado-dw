document.addEventListener('DOMContentLoaded', () => {
  const galleryContainer = document.getElementById('gallery-container');
  const categoryFilter = document.getElementById('categoryFilter');

  const categories = [
    {
      id: 1,
      name: 'Peluches',
      type: 'peluches',
      src: 'imgs/peluches.webp',
    },
    {
      id: 2,
      name: 'Coleccionable',
      type: 'coleccionable',
      src: 'imgs/coleccionable.webp',
    },
    {
      id: 3,
      name: 'Juegos de Mesa',
      type: 'juguetes-educativos',
      src: 'imgs/mesa.webp',
    },
    {
      id: 4,
      name: 'Juegos de Construcción',
      type: 'juguetes-educativos',
      src: 'imgs/construccion.webp',
    },
  ];

  function loadGallery(filter = 'all') {
    galleryContainer.innerHTML = '';

    const filteredCategories =
      filter === 'all'
        ? categories
        : categories.filter((c) => c.type === filter);

    filteredCategories.forEach((category) => {
      const col = document.createElement('div');
      col.classList.add('col-md-4', 'mb-3');
      col.innerHTML = `
        <div class="card">
          <div class="ratio ratio-16x9">
            <img src="${category.src}" loading="lazy" class="card-img-top" alt="${category.name}" style="object-fit: cover;">
          </div>
          <div class="card-body text-center">
            <h5 class="card-title">${category.name}</h5>
            <a href="detail.html?id=${category.id}" class="btn btn-primary">Ver Detalle</a>
          </div>
        </div>
      `;
      galleryContainer.appendChild(col);
    });
  }

  categoryFilter.addEventListener('change', (event) => {
    loadGallery(event.target.value);
  });

  loadGallery();
});
