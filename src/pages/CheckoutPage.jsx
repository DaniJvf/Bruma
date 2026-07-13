import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import styles from "./CheckoutPage.module.css";

const WHATSAPP_NUMBER = "5491167883082";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const fmt = (n) => n.toLocaleString("es-AR");

  const [form, setForm] = useState({
    nombre: "", email: "", telefono: "", direccion: "", ciudad: "", codigoPostal: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "Requerido";
    if (!form.email.includes("@")) e.email = "Email inválido";
    if (!form.telefono.trim()) e.telefono = "Requerido";
    if (!form.direccion.trim()) e.direccion = "Requerido";
    if (!form.ciudad.trim()) e.ciudad = "Requerido";
    if (!form.codigoPostal.trim()) e.codigoPostal = "Requerido";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    if (!items.length) { alert("El carrito está vacío"); return; }

    const lineas = items
      .map((i) => `☕ ${i.nombre} x${i.cantidad} — $${fmt(i.precio * i.cantidad)}`)
      .join("\n");

    const mensaje = `*Pedido BRUMA* 🌿\n\n${lineas}\n\n*Total: $${fmt(subtotal)}*\n\n---\n*Cliente:* ${form.nombre}\n*Email:* ${form.email}\n*Tel:* ${form.telefono}\n*Dirección:* ${form.direccion}, ${form.ciudad} (CP: ${form.codigoPostal})`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
    clearCart();
    navigate("/");
  };

  if (!items.length) {
    return (
      <main className={styles.page}>
        <div className={styles.empty}>
          <p>No hay productos en el carrito.</p>
          <button className={styles.backBtn} onClick={() => navigate("/productos")}>
            Ver productos
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Finalizar compra</h1>

        <div className={styles.layout}>
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Datos de entrega</h2>

            <div className={styles.row}>
              <Field label="Nombre y apellido" name="nombre" value={form.nombre} error={errors.nombre} onChange={handleChange} placeholder="Juan García" />
              <Field label="Email" name="email" type="email" value={form.email} error={errors.email} onChange={handleChange} placeholder="juan@email.com" />
            </div>
            <div className={styles.row}>
              <Field label="Teléfono" name="telefono" value={form.telefono} error={errors.telefono} onChange={handleChange} placeholder="+54 11 1234-5678" />
            </div>
            <Field label="Dirección" name="direccion" value={form.direccion} error={errors.direccion} onChange={handleChange} placeholder="Av. Corrientes 1234, Piso 2" />
            <div className={styles.row}>
              <Field label="Ciudad" name="ciudad" value={form.ciudad} error={errors.ciudad} onChange={handleChange} placeholder="Buenos Aires" />
              <Field label="Código Postal" name="codigoPostal" value={form.codigoPostal} error={errors.codigoPostal} onChange={handleChange} placeholder="1001" />
            </div>
          </div>

          <div className={styles.summary}>
            <h2 className={styles.sectionTitle}>Resumen del pedido</h2>

            <ul className={styles.items}>
              {items.map((i) => (
                <li key={i.id} className={styles.item}>
                  <img src={i.img} alt={i.nombre} className={styles.itemImg} />
                  <div className={styles.itemInfo}>
                    <span className={styles.itemNombre}>{i.nombre}</span>
                    <span className={styles.itemCant}>x{i.cantidad}</span>
                  </div>
                  <span className={styles.itemPrecio}>${fmt(i.precio * i.cantidad)}</span>
                </li>
              ))}
            </ul>

            <div className={styles.totals}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>${fmt(subtotal)}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Envío</span>
                <span className={subtotal >= 30000 ? styles.gratis : ""}>
                  {subtotal >= 30000 ? "Gratis" : "A coordinar"}
                </span>
              </div>
              <div className={`${styles.totalRow} ${styles.totalFinal}`}>
                <span>Total</span>
                <span>${fmt(subtotal)}</span>
              </div>
            </div>

            <button className={styles.submitBtn} onClick={handleSubmit}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.529 5.85L0 24l6.335-1.505A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.519-5.17-1.424l-.37-.22-3.762.893.945-3.668-.241-.378A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Enviar pedido por WhatsApp
            </button>
            <p className={styles.disclaimer}>
              Al confirmar, se abrirá WhatsApp con tu pedido para coordinarlo con nosotros.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({ label, name, value, error, onChange, placeholder, type = "text" }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
