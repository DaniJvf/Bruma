import { Link } from "react-router-dom";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Café de Especialidad
        </div>
        <h1 className={styles.title}>
          El café<br />
          <em>que merece</em><br />
          tu mañana.
        </h1>
        <p className={styles.sub}>
          Granos seleccionados de origen único, tostados artesanalmente y enviados frescos a tu puerta.
        </p>
        <div className={styles.actions}>
          <Link to="/productos?cat=cafe" className={styles.btnPrimary}>
            Comprar Café
          </Link>
          <Link to="/productos" className={styles.btnSecondary}>
            Ver toda la tienda
          </Link>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <strong>12+</strong>
            <span>Orígenes</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <strong>48h</strong>
            <span>Tueste fresco</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <strong>100%</strong>
            <span>Especialidad</span>
          </div>
        </div>
      </div>
      <div className={`${styles.imageWrap} ${styles.imageWrapAnim}`}>
        <img
          src="/taza.webp"
          alt="Taza de café de especialidad BRUMA, preparación artesanal"
          className={styles.heroImg}
        />
        <div className={styles.imageBadge}>
          <span>Tueste</span>
          <strong>Artesanal</strong>
        </div>

      </div>
    </section>
  );
}
