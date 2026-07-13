import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>BRUMA</Link>
          <p className={styles.tagline}>Café de especialidad para quienes disfrutan cada sorbo.</p>
          <div className={styles.social}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className={styles.socialLink}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
              </svg>
              <span>Instagram</span>
            </a>
            <a href="https://wa.me/5491167883082" target="_blank" rel="noreferrer" aria-label="WhatsApp" className={styles.socialLink}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.529 5.85L0 24l6.335-1.505A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.519-5.17-1.424l-.37-.22-3.762.893.945-3.668-.241-.378A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              <span>WhatsApp</span>
            </a>
            <a href="mailto:danielavillanueva22@gmail.com" aria-label="Email" className={styles.socialLink}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>Email</span>
            </a>
          </div>
        </div>

        <div className={styles.col}>
          <h4>Tienda</h4>
          <ul>
            <li><Link to="/productos?cat=cafe">Café en granos</Link></li>
            <li><Link to="/productos?cat=cafeteras">Cafeteras</Link></li>
            <li><Link to="/productos?cat=accesorios">Accesorios</Link></li>
            <li><Link to="/productos">Ver todo</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Información</h4>
          <ul>
            <li><Link to="/nosotros">Sobre Bruma</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Envíos y devoluciones</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Contacto</h4>
          <ul className={styles.contact}>
            <li>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14h0z"/>
              </svg>
              +54 9 11 6788-3082
            </li>
            <li>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              danielavillanueva22@gmail.com
            </li>
            <li>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Lun – Vie: 9 a 18 hs
            </li>
            <li>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Sáb: 10 a 14 hs
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {year} BRUMA. Todos los derechos reservados.</p>
        <p>Hecho con ☕ en Argentina</p>
      </div>
    </footer>
  );
}
