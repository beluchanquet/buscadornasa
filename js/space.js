const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const contenedor = document.getElementById('contenedor');

async function buscarImagenes() {
  const termino = inputBuscar.value.trim();
  if (!termino) {
    alert('Por favor, ingresa un término de búsqueda.');
    return;
  }

  const url = `https://images-api.nasa.gov/search?q=${termino}`;

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    mostrarResultados(datos.collection.items);
  } catch (error) {
    console.error('Error al obtener datos de la API:', error);
    alert('Hubo un problema al realizar la búsqueda. Inténtalo de nuevo.');
  }
}

function mostrarResultados(items) {
  contenedor.innerHTML = '';

  if (items.length === 0) {
    contenedor.innerHTML = '<p>No se encontraron resultados para tu búsqueda.</p>';
    return;
  }

  items.forEach((item) => {
    const data = item.data[0];
    const link = item.links ? item.links[0].href : '';

    const card = document.createElement('div');
    card.classList.add('card', 'm-2');
    card.style.width = '18rem';

    const img = document.createElement('img');
    img.src = link;
    img.alt = data.title || 'Imagen de NASA';
    img.classList.add('card-img-top');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = data.title || 'Sin título';

    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = data.description || 'Sin descripción';

    const date = document.createElement('p');
    date.classList.add('card-text');
    date.textContent = `Fecha: ${data.date_created || 'No disponible'}`;

    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(date);
    card.appendChild(img);
    card.appendChild(cardBody);

    contenedor.appendChild(card);
  });
}

btnBuscar.addEventListener('click', buscarImagenes);