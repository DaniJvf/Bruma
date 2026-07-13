import { useCart } from "../../context/CartContext";
import styles from "./ProductCard.module.css";

const catLabels = {
  cafe: "Café",
  cafeteras: "Cafeteras",
  accesorios: "Accesorios",
};

const etiquetaClass = {
  "Más vendido": styles.tagBestSeller,
  "Recomendado": styles.tagRecommended,
  "Nuevo": styles.tagNew,
  "Edición limitada": styles.tagLimited,
};

export default function ProductCard({ product }) {
  const { addItem, openCart } = useCart();

  const handleAdd = () => {
    addItem(product);
    openCart();
  };

  const fmt = (n) => n.toLocaleString("es-AR");

  return (
    <article className={styles.card}>
      <div className={styles.imgWrap}>
        <img
          src={product.img}
          alt={product.nombre}
          className={styles.img}
          loading="lazy"
        />
        <span className={styles.categoria}>{catLabels[product.categoria] || product.categoria}</span>
        {product.etiqueta && (
          <span className={`${styles.etiqueta} ${etiquetaClass[product.etiqueta] || ""}`}>
            {product.etiqueta}
          </span>
        )}
        <button className={styles.quickAdd} onClick={handleAdd} aria-label="Agregar al carrito">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>
      <div className={styles.body}>
        <h3 className={styles.nombre}>{product.nombre}</h3>
        <p className={styles.desc}>{product.descripcion}</p>
        <div className={styles.footer}>
          <span className={styles.precio}>${fmt(product.precio)}</span>
          <button className={styles.btn} onClick={handleAdd}>
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
