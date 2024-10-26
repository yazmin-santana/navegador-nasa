const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const contenedor = document.getElementById('contenedor');

// Función para buscar imágenes 
const buscarImagenes = () => {
  const termino = inputBuscar.value.trim();
  if (termino === '') {
    alert('Por favor ingrese su búsqueda');
    return;
  }

  const nasa = `https://images-api.nasa.gov/search?q=${termino}`;
  
  fetch(nasa)
    .then(response => {
      if (!response.ok) {
        throw new Error('Ocurrió un error');
      }
      return response.json();
    })
    .then(data => {
      contenedor.innerHTML = '';

      // Verificar si hay resultados
      const items = data.collection.items;
      if (items.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron resultados acordes a la búsqueda</p>';
        return;
      }

      // Mostrar los resultados en formato de tarjeta de Boostrap
      items.forEach(item => {
        // DESTRUCTURACIÓN 
        const { title, description, date_created } = item.data[0];
        const img = item.links && item.links.length > 0 ? item.links[0].href : null;

        // Crear las tarjetas para mostrar la información. utilizando un card grid de Bootstrap (linea 41)
        const card = `
          <div class="col-md-4 my-3"> 
            <div class="card">
              ${img ? `<img src="${img}" class="card-img-top" alt="${title}">` : ''}
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description || 'No hay una descripción disponible'}</p>
                <p class="card-text"><small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small></p>
              </div>
            </div>
          </div>
        `;
        contenedor.innerHTML += card;
      });
    })
    .catch(error => {
      console.error('Ocurrió un error:', error);
      contenedor.innerHTML = '<p>Ocurrió un error al realizar la búsqueda</p>';
    });
};

// Asignar evento click al botón de búsqueda
btnBuscar.addEventListener('click', buscarImagenes);