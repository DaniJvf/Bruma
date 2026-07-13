import { useState } from "react";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hola BRUMA! Soy ${form.nombre} (${form.email}).\n\n${form.mensaje}`;
    window.open(`https://wa.me/5491167883082?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.label}>Contacto</p>
          <h1 className={styles.title}>¿Hablamos?</h1>
          <p className={styles.sub}>Estamos para ayudarte a encontrar tu café ideal.</p>
        </div>

        <div className={styles.layout}>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.529 5.85L0 24l6.335-1.505A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.519-5.17-1.424l-.37-.22-3.762.893.945-3.668-.241-.378A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </div>
              <div>
                <h3>WhatsApp</h3>
                <a href="https://wa.me/5491167883082" target="_blank" rel="noreferrer">+54 9 11 6788-3082</a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <h3>Email</h3>
                <a href="mailto:danielavillanueva22@gmail.com">danielavillanueva22@gmail.com</a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <h3>Horarios</h3>
                <p>Lun–Vie: 9:00 – 18:00</p>
                <p>Sáb: 10:00 – 14:00</p>
              </div>
            </div>
          </div>

          {sent ? (
            <div className={styles.success}>
              <span>✓</span>
              <p>¡Gracias! Te contactaremos pronto.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label>Nombre</label>
                <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Tu nombre" />
              </div>
              <div className={styles.field}>
                <label>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="tu@email.com" />
              </div>
              <div className={styles.field}>
                <label>Mensaje</label>
                <textarea name="mensaje" value={form.mensaje} onChange={handleChange} required placeholder="¿En qué te podemos ayudar?" rows={5} />
              </div>
              <button type="submit" className={styles.btn}>Enviar por WhatsApp</button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
