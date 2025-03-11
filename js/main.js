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
      srcset: 'imgs/peluches-small.webp 300w, imgs/peluches-800.webp 800w',
      width: 800,
      height: 600,
      featured: true,
    },
    {
      id: 2,
      name: 'Coleccionable',
      type: 'coleccionable',
      src: 'imgs/coleccionable.webp',
      srcset: 'imgs/coleccionable-small.webp 300w, imgs/coleccionable-800.webp 800w',
      width: 800,
      height: 600,
      featured: true,
    },
    {
      id: 3,
      name: 'Juegos de Mesa',
      type: 'juegos-de-mesa',
      src: 'imgs/mesa.webp',
      srcset: 'imgs/mesa-small.webp 300w, imgs/mesa-800.webp 800w',
      width: 800,
      height: 600,
      featured: false,
    },
  ];

  const featuredCategories = categories.filter((category) => category.featured);

  featuredCategories.forEach((category) => {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-3');
    card.innerHTML = `
      <div class="card h-100">
        <div class="card-img-container">
          <img 
            src="${category.src}" 
            srcset="${category.srcset}"
            sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 800px"
            class="card-img-top" 
            alt="${category.name}" 
            loading="lazy"
            width="${category.width}"
            height="${category.height}">
        </div>
        <div class="card-body text-center d-flex flex-column">
          <h5 class="card-title">${category.name}</h5>
          <a href="detail.html?id=${category.id}" class="btn btn-primary mt-auto">Ver Detalle</a>
        </div>
      </div>
    `;
    featuredContainer.appendChild(card);
  });
});
