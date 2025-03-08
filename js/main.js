document.addEventListener('DOMContentLoaded', () => {
  const featuredContainer = document.getElementById(
    'featured-categories-container',
  );

  const categories = [
    {
      id: 1,
      name: 'Peluches',
      type: 'peluches',
      src: 'imgs/peluches.webp',
      featured: true,
    },
    {
      id: 2,
      name: 'Coleccionable',
      type: 'coleccionable',
      src: 'imgs/coleccionable.webp',
      featured: true,
    },
    {
      id: 3,
      name: 'Juegos de Mesa',
      type: 'juegos-de-mesa',
      src: 'imgs/mesa.webp',
      featured: false,
    },
  ];

  const featuredCategories = categories.filter((category) => category.featured);

  featuredCategories.forEach((category) => {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-3');
    card.innerHTML = `
      <div class="card">
        <img src="${category.src}" class="card-img-top" alt="${category.name}">
        <div class="card-body text-center">
          <h5 class="card-title">${category.name}</h5>
          <a href="detail.html?id=${category.id}" class="btn btn-primary">Ver Detalle</a>
        </div>
      </div>
    `;
    featuredContainer.appendChild(card);
  });
});
