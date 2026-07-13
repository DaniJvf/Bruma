import { Link } from "react-router-dom";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.imageWrap}>
          <img
            src="/nosotros.webp"
            alt="Sobre BRUMA — café de especialidad"
            className={styles.img}
            loading="lazy"
          />
          <div className={styles.imageBadge}>
            <strong>2019</strong>
            <span>Fundación</span>
          </div>
        </div>
        <div className={styles.content}>
          <p className={styles.label}>Nuestra historia</p>
          <h2 className={styles.title}>
            Nació de una taza<br />
            <em>que lo cambió todo.</em>
          </h2>
          <p className={styles.text}>
            BRUMA empezó con una pregunta simple: ¿por qué el café en casa no puede ser tan bueno como en las mejores cafeterías?
          </p>
          <p className={styles.text}>
            Trabajamos directamente con productores de origen para traerte granos únicos, tostados con cuidado y enviados frescos. Cada bolsa cuenta una historia.
          </p>
          <Link to="/nosotros" className={styles.btn}>
            Conocer más
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
