// ==============================
// DATOS DE PRODUCTOS
// ==============================
const productos = [
  { nombre: "Cafe Timbuyacu", precio: 23900, img: "/src/products/timbuyacu.jpg", category: "cafe" },
  { nombre: "Cafe Guatemala", precio: 23900, img: "/src/products/cafe guatemala.jpg", category: "cafe" },
  { nombre: "Cafe La Laguna", precio: 23900, img: "/src/products/la laguna.jpeg", category: "te" },
  { nombre: "Cafe Colombia", precio: 23900, img: "/src/products/cafe colombia.jpg", category: "te" },
  { nombre: "Cafetera Moka", precio: 61000, img: "/src/products/Cafetera Moka.jpg", category: "torta" },
  { nombre: "Cafetera Prensa", precio: 32200, img: "/src/products/prensa.jpg", category: "torta" },
  { nombre: "Cafetera Sifon", precio: 40000, img: "/src/products/sifon.jpg", category: "torta" },
  { nombre: "Cafetera Chemex", precio: 58790, img: "/src/products/chemex.jpg", category: "torta" },
  { nombre: "Pitcher", precio: 21000, img: "/src/products/pitcher.jpg", category: "torta" },
  { nombre: "Stick Art Latte", precio: 8550, img: "/src/products/stick.jpg", category: "torta" },
  { nombre: "Tamper", precio: 15000, img: "/src/products/tamper.jpg", category: "torta" },
  { nombre: "Tamping", precio: 25000, img: "/src/products/tamping.jpg", category: "torta" },
];

// ==============================
// LOGIN
// ==============================
let usuario = localStorage.getItem("usuario") || null;

const modalLogin = document.getElementById("modalLogin");
const cerrarLogin = document.getElementById("cerrarLogin");
const btnLogin = document.getElementById("btnLogin");
const inputNombre = document.getElementById("usuarioNombre");
const btnUsuario = document.getElementById("btnUsuario");

function solicitarLogin() {
  modalLogin.classList.remove("oculto");
}

cerrarLogin.addEventListener("click", () => modalLogin.classList.add("oculto"));

btnLogin.addEventListener("click", () => {
  const nombre = inputNombre.value.trim();
  if (!nombre) return alert("Ingresá un nombre");

  usuario = nombre;
  localStorage.setItem("usuario", nombre);
  modalLogin.classList.add("oculto");
  actualizarBotonUsuario();
  alert(`¡Bienvenido ${nombre}!`);
});

function actualizarBotonUsuario() {
  btnUsuario.textContent = usuario ? "👤 " + usuario : "Iniciar sesión";
}

btnUsuario.addEventListener("click", () => {
  if (usuario) {
    if (confirm("¿Cerrar sesión?")) {
      usuario = null;
      localStorage.removeItem("usuario");
      actualizarBotonUsuario();
    }
  } else {
    solicitarLogin();
  }
});

actualizarBotonUsuario();

// ==============================
// CARRITO
// ==============================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contProductos = document.querySelector(".products");
const carritoBox = document.getElementById("carrito");
const carritoItems = document.getElementById("carritoItems");
const totalCarrito = document.getElementById("totalCarrito");

// ==============================
// RENDER PRODUCTOS
// ==============================
function renderProducts(lista) {
  contProductos.innerHTML = "";

  lista.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.img}" width="120">
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button class="add-cart" data-nombre="${p.nombre}" data-precio="${p.precio}" data-img="${p.img}">Agregar al carrito</button>
      <a href="detalle.html?nombre=${encodeURIComponent(p.nombre)}&precio=${p.precio}&img=${encodeURIComponent(p.img)}&category=${p.category}" 
        class="detalle-btn" target="_blank">🔍 Ver detalle</a>
    `;
    contProductos.appendChild(card);
  });

  addCartEvents();
}

// ==============================
// AGREGAR AL CARRITO
// ==============================
function addCartEvents() {
  document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!usuario) { solicitarLogin(); return; }

      const nombre = btn.dataset.nombre;
      const precio = Number(btn.dataset.precio);
      const img = btn.dataset.img;

      const item = carrito.find(p => p.nombre === nombre);
      if (item) item.cantidad++;
      else carrito.push({ nombre, precio, img, cantidad: 1 });

      guardarCarrito();
      renderCarrito();

      // Abrir carrito automáticamente
      carritoBox.classList.add("mostrar");
    });
  });
}

// ==========================
  // Modificacion alan
  // ==========================
function renderCarrito() {
  carritoItems.innerHTML = "";
  let total = 0;

  carrito.forEach(item => {
    total += item.precio * item.cantidad;
    const div = document.createElement("div");
    div.className = "item-carrito";
    div.innerHTML = `
      <img src="${item.img}" class="img-carrito">
      <div class="info">
        <p>${item.nombre}</p>
        <p>$${item.precio}</p>
        <div class="cant-control">
          <button class="menos" data-nombre="${item.nombre}">-</button>
          <span>${item.cantidad}</span>
          <button class="mas" data-nombre="${item.nombre}">+</button>
        </div>
      </div>
      <button class="eliminar" data-nombre="${item.nombre}">✖</button>
    `;
    carritoItems.appendChild(div);
  });

  // SUBTOTAL / DESCUENTO / TOTAL
  let subtotal = total;
  let descuento = 0;

  document.getElementById("subtotalCarrito").textContent = "$" + subtotal;
  document.getElementById("descuentoCarrito").textContent = "$" + descuento;
  document.getElementById("totalCarrito").textContent = "$" + (subtotal - descuento);

  // ENVÍO GRATIS
  const envioGratisMinimo = 30000;
  let faltante = envioGratisMinimo - subtotal;

  const faltanteEnvio = document.getElementById("mensajeEnvio");

  if (faltante <= 0) {
    faltanteEnvio.textContent = "¡TENÉS ENVÍO GRATIS!";
  } else {
    mensajeEnvio.textContent = `¡Faltan $${faltante} para tu ENVÍO GRATIS!`;
  }

  addCarritoControls();
}


function addCarritoControls() {
  document.querySelectorAll(".mas").forEach(btn => btn.addEventListener("click", () => {
    const item = carrito.find(p => p.nombre === btn.dataset.nombre);
    item.cantidad++;
    guardarCarrito();
    renderCarrito();
  }));

  document.querySelectorAll(".menos").forEach(btn => btn.addEventListener("click", () => {
    const item = carrito.find(p => p.nombre === btn.dataset.nombre);
    if (item.cantidad > 1) item.cantidad--;
    else carrito = carrito.filter(p => p.nombre !== item.nombre);
    guardarCarrito();
    renderCarrito();
  }));

  document.querySelectorAll(".eliminar").forEach(btn => btn.addEventListener("click", () => {
    carrito = carrito.filter(p => p.nombre !== btn.dataset.nombre);
    guardarCarrito();
    renderCarrito();
  }));
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Inicializar
renderProducts(productos);
renderCarrito();
// ==============================
// MOSTRAR PRODUCTOS SEGÚN LA PÁGINA
// ==============================

// Detectar si estoy en productos.html
const esPaginaProductos = window.location.pathname.includes("productos.html");

// Si estoy en inicio → muestro los primeros 4
// Si estoy en productos.html → muestro todos
let productosAMostrar = esPaginaProductos ? productos : productos.slice(0, 4);

// Inicializar
renderProducts(productosAMostrar);
renderCarrito();

// ==============================
// FILTRO POR CATEGORÍA
// ==============================
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.category;
    if (cat === "all") renderProducts(productos);
    else renderProducts(productos.filter(p => p.category === cat));
  });
});
