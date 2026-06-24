const menu = [
  { nombre: 'Bruschetta Clásica',     descripcion: 'Pan tostado con tomate y albahaca fresca',    precio: 4500,  categoria: 'Entrada'      },
  { nombre: 'Tabla de Quesos',         descripcion: 'Selección de quesos importados con mermelada', precio: 7800,  categoria: 'Entrada'      },
  { nombre: 'Lomo al Vino Tinto',      descripcion: 'Lomo de res en reducción de vino tinto',       precio: 15500, categoria: 'Plato Fuerte' },
  { nombre: 'Pasta Carbonara',         descripcion: 'Pasta con tocino, huevo y queso parmesano',    precio: 10200, categoria: 'Plato Fuerte' },
  { nombre: 'Salmón a la Plancha',     descripcion: 'Filete de salmón con vegetales al vapor',      precio: 13800, categoria: 'Plato Fuerte' },
  { nombre: 'Tiramisú',               descripcion: 'Postre italiano con café y mascarpone',          precio: 5200,  categoria: 'Postre'       },
  { nombre: 'Cheesecake de Maracuyá', descripcion: 'Cheesecake cremoso con coulis de maracuyá',    precio: 4800,  categoria: 'Postre'       },
];
 
let reservas = [];
let categoriaActual = 'Todos';
 
// Muestra los platillos en pantalla según la categoría activa
function renderMenu() {
  let contenedor = document.getElementById('contenedor-menu');
  contenedor.innerHTML = '';
 
  for (let i = 0; i < menu.length; i++) {
    let platillo = menu[i];
 
    // Muestra todos o solo los que coinciden con la categoría
    if (categoriaActual === 'Todos' || platillo.categoria === categoriaActual) {
 
      let columna = document.createElement('div');
      columna.className = 'col-md-4';
 
      let card = document.createElement('div');
      card.className = 'card-plato';
 
      let titulo = document.createElement('h3');
      titulo.innerText = platillo.nombre;
 
      let descripcion = document.createElement('p');
      descripcion.innerText = platillo.descripcion;
 
      // Precio formateado en colones con separador de miles
      let precio = document.createElement('p');
      precio.className = 'precio';
      precio.innerText = '₡' + platillo.precio.toLocaleString('es-CR');
 
      let categoriaSpan = document.createElement('span');
      categoriaSpan.className = 'categoria';
      categoriaSpan.innerText = platillo.categoria;
 
      card.appendChild(titulo);
      card.appendChild(descripcion);
      card.appendChild(precio);
      card.appendChild(categoriaSpan);
      columna.appendChild(card);
      contenedor.appendChild(columna);
    }
  }
}
 
// Filtra el menú por categoría y marca el botón activo
function filtrarCategoria(categoria) {
  categoriaActual = categoria;
  renderMenu();
 
  let botones = document.querySelectorAll('.btn-filtro');
  for (let i = 0; i < botones.length; i++) {
    if (botones[i].dataset.categoria === categoria) {
      botones[i].classList.add('activo');
    } else {
      botones[i].classList.remove('activo');
    }
  }
}
 
// Valida los campos del formulario y habilita el botón si todo es correcto
function validarFormulario() {
  let esValido = true;
 
  let nombre   = document.getElementById('nombre').value;
  let correo   = document.getElementById('correo').value;
  let fecha    = document.getElementById('fecha').value;
  let personas = document.getElementById('personas').value;
 
  let spanNombre   = document.getElementById('error-nombre');
  let spanCorreo   = document.getElementById('error-correo');
  let spanFecha    = document.getElementById('error-fecha');
  let spanPersonas = document.getElementById('error-personas');
 
  // Solo letras y espacios (con tildes)
  let regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
 
  if (nombre === '') {
    spanNombre.innerText = 'El nombre es obligatorio';
    esValido = false;
  } else if (nombre.length < 5) {
    spanNombre.innerText = 'El nombre debe tener al menos 5 caracteres';
    esValido = false;
  } else if (!regexNombre.test(nombre)) {
    spanNombre.innerText = 'El nombre solo puede tener letras y espacios';
    esValido = false;
  } else {
    spanNombre.innerText = '';
  }
 
  // Formato básico de correo con regex
  let regexCorreo = /^[^ @]+@[^ @]+\.[^ @]+$/;
 
  if (correo === '') {
    spanCorreo.innerText = 'El correo es obligatorio';
    esValido = false;
  } else if (!regexCorreo.test(correo)) {
    spanCorreo.innerText = 'El correo no tiene un formato valido';
    esValido = false;
  } else {
    spanCorreo.innerText = '';
  }
 
  // La fecha no puede ser anterior al día de hoy
  if (fecha === '') {
    spanFecha.innerText = 'La fecha es obligatoria';
    esValido = false;
  } else {
    let hoy = new Date().toISOString().split('T')[0];
 
    if (fecha < hoy) {
      spanFecha.innerText = 'La fecha no puede ser anterior a hoy';
      esValido = false;
    } else {
      spanFecha.innerText = '';
    }
  }
 
  // Número entre 1 y 20
  if (personas === '') {
    spanPersonas.innerText = 'El numero de personas es obligatorio';
    esValido = false;
  } else if (personas < 1 || personas > 20) {
    spanPersonas.innerText = 'Debe ser un numero entre 1 y 20';
    esValido = false;
  } else {
    spanPersonas.innerText = '';
  }
 
  let btnReservar = document.getElementById('btn-reservar');
  btnReservar.disabled = !esValido;
 
  return esValido;
}
 
// Guarda la reserva en el arreglo y agrega una fila a la tabla
function agregarReserva() {
  let nombre   = document.getElementById('nombre').value;
  let correo   = document.getElementById('correo').value;
  let fecha    = document.getElementById('fecha').value;
  let hora     = document.getElementById('hora').value;
  let personas = document.getElementById('personas').value;
 
  let nuevaReserva = {
    nombre:   nombre,
    correo:   correo,
    fecha:    fecha,
    hora:     hora,
    personas: parseInt(personas)
  };
 
  reservas.push(nuevaReserva);
 
  let fila = document.createElement('tr');
  fila.className = 'fila-reserva';
 
  // Reservas de 6 o más personas reciben la clase vip
  if (nuevaReserva.personas >= 6) {
    fila.classList.add('vip');
  }
 
  let celdaNombre   = document.createElement('td');
  celdaNombre.innerText = nuevaReserva.nombre;
 
  let celdaCorreo   = document.createElement('td');
  celdaCorreo.innerText = nuevaReserva.correo;
 
  let celdaFecha    = document.createElement('td');
  celdaFecha.innerText = nuevaReserva.fecha;
 
  let celdaHora     = document.createElement('td');
  celdaHora.innerText = nuevaReserva.hora;
 
  let celdaPersonas = document.createElement('td');
  celdaPersonas.innerText = nuevaReserva.personas;
 
  fila.appendChild(celdaNombre);
  fila.appendChild(celdaCorreo);
  fila.appendChild(celdaFecha);
  fila.appendChild(celdaHora);
  fila.appendChild(celdaPersonas);
 
  document.getElementById('tabla-reservas').appendChild(fila);
 
  actualizarResumen();
 
  // Limpia el formulario y deshabilita el botón
  document.getElementById('form-reserva').reset();
  document.getElementById('btn-reservar').disabled = true;
}
 
// Calcula y muestra el resumen debajo de la tabla
function actualizarResumen() {
  let contenedor = document.getElementById('resumen-reservas');
  contenedor.innerHTML = '';
 
  let totalPersonas = 0;
  let nombreMayor   = '';
  let cantidadMayor = 0;
 
  for (let i = 0; i < reservas.length; i++) {
    totalPersonas += reservas[i].personas;
 
    if (reservas[i].personas > cantidadMayor) {
      cantidadMayor = reservas[i].personas;
      nombreMayor   = reservas[i].nombre;
    }
  }
 
  let titulo = document.createElement('h3');
  titulo.innerText = 'Resumen de Reservas';
 
  let lineaTotal = document.createElement('p');
  lineaTotal.innerText = 'Total de reservas registradas: ' + reservas.length;
 
  let lineaPersonas = document.createElement('p');
  lineaPersonas.innerText = 'Total de personas esperadas: ' + totalPersonas;
 
  let lineaMayor = document.createElement('p');
  if (reservas.length === 0) {
    lineaMayor.innerText = 'Reserva con mayor numero de personas: todavia no hay reservas';
  } else {
    lineaMayor.innerText = 'Reserva con mayor numero de personas: ' + nombreMayor + ' (' + cantidadMayor + ' personas)';
  }
 
  contenedor.appendChild(titulo);
  contenedor.appendChild(lineaTotal);
  contenedor.appendChild(lineaPersonas);
  contenedor.appendChild(lineaMayor);
}
 
// Al cargar la página se inicializa el menú y el resumen
document.addEventListener('DOMContentLoaded', function () {
  renderMenu();
  actualizarResumen();
 
  // Botón Todos activo por defecto
  let btnTodos = document.querySelector('[data-categoria="Todos"]');
  btnTodos.classList.add('activo');
 
  // Evento click en cada botón de filtro
  let botones = document.querySelectorAll('.btn-filtro');
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', function () {
      filtrarCategoria(this.dataset.categoria);
    });
  }
 
  // Validación en tiempo real al escribir
  document.getElementById('nombre').addEventListener('input', validarFormulario);
  document.getElementById('correo').addEventListener('input', validarFormulario);
  document.getElementById('fecha').addEventListener('input', validarFormulario);
  document.getElementById('personas').addEventListener('input', validarFormulario);
});
 
// Envío del formulario
document.getElementById('form-reserva').addEventListener('submit', function (e) {
  e.preventDefault();
 
  if (validarFormulario()) {
    agregarReserva();
  }
});
