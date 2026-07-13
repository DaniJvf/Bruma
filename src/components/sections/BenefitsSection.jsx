import styles from "./BenefitsSection.module.css";

const beneficios = [
  {
    titulo: "Café Premium",
    descripcion: "Seleccionamos los mejores granos de origen único de América Latina y Africa.",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M17 8h1a4 4 0 010 8h-1"/>
        <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z"/>
        <line x1="6" y1="2" x2="6" y2="4"/>
        <line x1="10" y1="2" x2="10" y2="4"/>
        <line x1="14" y1="2" x2="14" y2="4"/>
      </svg>
    ),
  },
  {
    titulo: "Tueste Fresco",
    descripcion: "Tostado artesanal y enviado en menos de 48 horas para máxima frescura.",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    titulo: "Envíos Nacionales",
    descripcion: "Llegamos a todo el país con seguimiento en tiempo real desde el primer día.",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="1" y="3" width="15" height="13"/>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    titulo: "Compra Segura",
    descripcion: "Plataforma segura con múltiples métodos de pago y devolución garantizada.",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    titulo: "Asesoramiento",
    descripcion: "Te guiamos para encontrar el café y el método de preparación ideal para vos.",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
  },
];

export default function BenefitsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.label}>Por qué elegirnos</p>
          <h2 className={styles.title}>La experiencia BRUMA</h2>
        </div>
        <div className={styles.grid}>
          {beneficios.map((b) => (
            <div key={b.titulo} className={styles.item}>
              <div className={styles.iconWrap}>{b.svg}</div>
              <h3 className={styles.itemTitle}>{b.titulo}</h3>
              <p className={styles.itemDesc}>{b.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
