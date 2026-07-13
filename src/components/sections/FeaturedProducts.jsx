import { Link } from "react-router-dom";
import { products } from "../../data/products";
import ProductCard from "../ui/ProductCard";
import styles from "./FeaturedProducts.module.css";

// Selección curada: 2 cafés con etiqueta, 1 cafetera destacada, 1 accesorio
const CURATED_IDS = [1, 2, 8, 10]; // Timbuyacu, Guatemala, Chemex, Stick Art Latte

export default function FeaturedProducts() {
  const featured = products.filter((p) => CURATED_IDS.includes(p.id));

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <p className={styles.label}>Selección curada</p>
            <h2 className={styles.title}>Productos destacados</h2>
          </div>
          <Link to="/productos" className={styles.verTodos}>
            Ver todos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        <div className={styles.grid}>
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
