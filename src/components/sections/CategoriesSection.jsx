import { Link } from "react-router-dom";
import styles from "./CategoriesSection.module.css";

const cats = [
  {
    id: "cafe",
    label: "Café en Granos",
    desc: "Orígenes únicos, tostados artesanalmente.",
    // Granos de café de especialidad — imagen correcta para cafés
    img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=85&auto=format&fit=crop",
    href: "/productos?cat=cafe",
  },
  {
    id: "cafeteras",
    label: "Cafeteras",
    desc: "Moka, Chemex, Prensa Francesa y más.",
    // Cafetera real — imagen de cafetera/moka/chemex
    img: "/products/cafetera.jpg",
    href: "/productos?cat=cafeteras",
  },
  {
    id: "accesorios",
    label: "Accesorios",
    desc: "Todo para preparar el café perfecto.",
    // Accesorios de café reales (tamper, pitcher, herramientas)
    img: "/products/accesorios.jpg",
    href: "/productos?cat=accesorios",
  },
];

export default function CategoriesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.label}>Explorá la tienda</p>
          <h2 className={styles.title}>Categorías</h2>
        </div>
        <div className={styles.grid}>
          {cats.map((c) => (
            <Link to={c.href} key={c.id} className={styles.card}>
              <div className={styles.imgWrap}>
                <img src={c.img} alt={c.label} className={styles.img} loading="lazy" />
                <div className={styles.overlay} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.catTitle}>{c.label}</h3>
                <p className={styles.catDesc}>{c.desc}</p>
                <span className={styles.cta}>
                  Ver productos
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
