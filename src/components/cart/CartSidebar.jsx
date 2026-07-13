import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import styles from "./CartSidebar.module.css";

export default function CartSidebar() {
  const {
    items, isOpen, closeCart, removeItem, increment, decrement, clearCart,
    subtotal, envioGratis, faltaParaEnvio, totalItems,
  } = useCart();

  const fmt = (n) => n.toLocaleString("es-AR");

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={closeCart} />}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Carrito
            {totalItems > 0 && <span className={styles.count}>{totalItems}</span>}
          </h2>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Cerrar carrito">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {envioGratis ? (
          <div className={`${styles.envioMsg} ${styles.gratis}`}>🎉 ¡Tenés envío gratis!</div>
        ) : (
          <div className={styles.envioMsg}>
            Faltan <strong>${fmt(faltaParaEnvio)}</strong> para envío gratis
          </div>
        )}

        {items.length === 0 ? (
          <div className={styles.empty}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <p>Tu carrito está vacío</p>
            <button className={styles.ctaBtn} onClick={closeCart}>Ver productos</button>
          </div>
        ) : (
          <>
            <ul className={styles.items}>
              {items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <img src={item.img} alt={item.nombre} className={styles.img} />
                  <div className={styles.info}>
                    <p className={styles.nombre}>{item.nombre}</p>
                    <p className={styles.precio}>${fmt(item.precio)}</p>
                    <div className={styles.cantControl}>
                      <button onClick={() => decrement(item.id)}>−</button>
                      <span>{item.cantidad}</span>
                      <button onClick={() => increment(item.id)}>+</button>
                    </div>
                  </div>
                  <button className={styles.removeBtn} onClick={() => removeItem(item.id)} aria-label="Eliminar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles.footer}>
              <div className={styles.subtotal}>
                <span>Subtotal</span>
                <span>${fmt(subtotal)}</span>
              </div>
              <Link to="/checkout" className={styles.checkoutBtn} onClick={closeCart}>
                Finalizar compra
              </Link>
              <button className={styles.clearBtn} onClick={clearCart}>Vaciar carrito</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
