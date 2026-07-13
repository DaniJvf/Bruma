import { useState, useEffect } from "react";
import styles from "./PromoBanner.module.css";

const messages = [
  "🚚  Envíos a todo el país — Seguimiento en tiempo real",
  "☕  10% OFF en tu primera compra — Código: BRUMA10",
  "✦  Tueste artesanal enviado en menos de 48 horas",
  "🌿  Granos de origen único, seleccionados con cuidado",
];

export default function PromoBanner() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % messages.length), 4000);
    return () => clearInterval(t);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.inner}>
        <button
          className={styles.arrow}
          onClick={() => setIndex((i) => (i - 1 + messages.length) % messages.length)}
          aria-label="Anterior"
        >‹</button>
        <div className={styles.messageWrap}>
          <span key={index} className={styles.text}>{messages[index]}</span>
        </div>
        <button
          className={styles.arrow}
          onClick={() => setIndex((i) => (i + 1) % messages.length)}
          aria-label="Siguiente"
        >›</button>
      </div>
      <button className={styles.close} onClick={() => setVisible(false)} aria-label="Cerrar">×</button>
    </div>
  );
}
