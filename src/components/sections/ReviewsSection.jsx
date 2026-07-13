import styles from "./ReviewsSection.module.css";

const reseñas = [
  {
    id: 1,
    nombre: "Valentina M.",
    ciudad: "Buenos Aires",
    texto: "El Café Timbuyacu es increíble. Noté la diferencia desde el primer sorbo. Nunca voy a volver al café de supermercado.",
    estrellas: 5,
    inicial: "V",
    color: "#c9853a",
  },
  {
    id: 2,
    nombre: "Matías R.",
    ciudad: "Córdoba",
    texto: "La Chemex llegó perfecta y el café Colombia es exactamente lo que buscaba. Excelente servicio y atención.",
    estrellas: 5,
    inicial: "M",
    color: "#5d3c1e",
  },
  {
    id: 3,
    nombre: "Lucía F.",
    ciudad: "Rosario",
    texto: "Pedí el kit para empezar con café de especialidad y el asesoramiento fue impecable. Muy recomendable.",
    estrellas: 5,
    inicial: "L",
    color: "#3d1f0a",
  },
  {
    id: 4,
    nombre: "Ignacio T.",
    ciudad: "Mendoza",
    texto: "La Moka es de muy buena calidad y el café Guatemala es exquisito. Llegó en tiempo récord.",
    estrellas: 5,
    inicial: "I",
    color: "#7a5230",
  },
];

function Stars({ n }) {
  return (
    <div className={styles.stars} aria-label={`${n} estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < n ? "#c9853a" : "none"}
          stroke="#c9853a"
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.label}>Lo que dicen nuestros clientes</p>
          <h2 className={styles.title}>Reseñas</h2>
          <div className={styles.rating}>
            <Stars n={5} />
            <span className={styles.ratingText}>4.9 de 5 — +200 reseñas verificadas</span>
          </div>
        </div>
        <div className={styles.grid}>
          {reseñas.map((r) => (
            <div key={r.id} className={styles.card}>
              <Stars n={r.estrellas} />
              <p className={styles.texto}>&ldquo;{r.texto}&rdquo;</p>
              <div className={styles.author}>
                <div
                  className={styles.avatar}
                  style={{ background: r.color }}
                >
                  {r.inicial}
                </div>
                <div>
                  <strong className={styles.nombre}>{r.nombre}</strong>
                  <span className={styles.ciudad}>{r.ciudad}</span>
                </div>
                <div className={styles.verifiedBadge}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Verificado
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
