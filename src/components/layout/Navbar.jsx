import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/products";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { totalItems, toggleCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tiendaOpen, setTiendaOpen] = useState(false);
  const [tiendaMobileOpen, setTiendaMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const tiendaRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Cerrar dropdown Tienda al clickear fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (tiendaRef.current && !tiendaRef.current.contains(e.target)) {
        setTiendaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Bloquear scroll cuando menú mobile abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const filtered = query.trim()
    ? products.filter((p) =>
        p.nombre.toLowerCase().includes(query.toLowerCase()) ||
        p.categoria.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const fmt = (n) => n.toLocaleString("es-AR");

  const closeMenu = () => {
    setMenuOpen(false);
    setTiendaMobileOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            <span className={styles.logoText}>BRUMA</span>
            <span className={styles.logoSub}>café de especialidad</span>
          </Link>

          {/* Desktop links */}
          <ul className={styles.links}>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Inicio
              </NavLink>
            </li>

            {/* Tienda dropdown */}
            <li className={styles.dropdown} ref={tiendaRef}>
              <button
                className={`${styles.link} ${styles.dropBtn} ${tiendaOpen ? styles.dropBtnOpen : ""}`}
                onClick={() => setTiendaOpen((v) => !v)}
                aria-expanded={tiendaOpen}
              >
                Tienda
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className={tiendaOpen ? styles.chevronOpen : styles.chevron}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {tiendaOpen && (
                <div className={styles.dropMenu}>
                  <Link
                    to="/productos?cat=cafe"
                    className={styles.dropItem}
                    onClick={() => setTiendaOpen(false)}
                  >
                    Cafés
                  </Link>
                  <Link
                    to="/productos?cat=cafeteras"
                    className={styles.dropItem}
                    onClick={() => setTiendaOpen(false)}
                  >
                    Cafeteras
                  </Link>
                  <Link
                    to="/productos?cat=accesorios"
                    className={styles.dropItem}
                    onClick={() => setTiendaOpen(false)}
                  >
                    Accesorios
                  </Link>
                  <div className={styles.dropDivider} />
                  <Link
                    to="/productos"
                    className={`${styles.dropItem} ${styles.dropItemAll}`}
                    onClick={() => setTiendaOpen(false)}
                  >
                    Ver toda la tienda →
                  </Link>
                </div>
              )}
            </li>

            <li>
              <NavLink
                to="/nosotros"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Nosotros
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contacto"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Contacto
              </NavLink>
            </li>
          </ul>

          <div className={styles.actions}>
            <button
              className={styles.searchBtn}
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>

            <button
              className={styles.cartBtn}
              onClick={toggleCart}
              aria-label="Abrir carrito"
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {totalItems > 0 && (
                <span className={styles.badge}>{totalItems}</span>
              )}
            </button>

            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              <span className={menuOpen ? styles.barOpen : styles.bar} />
              <span className={menuOpen ? styles.barOpen2 : styles.bar} />
              <span className={menuOpen ? styles.barOpen3 : styles.bar} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className={styles.mobileOverlay} onClick={closeMenu} />
      )}

      {/* Mobile menu panel */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        <div className={styles.mobileMenuHeader}>
          <span className={styles.mobileLogoText}>BRUMA</span>
          <button className={styles.mobileClose} onClick={closeMenu} aria-label="Cerrar menú">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <nav className={styles.mobileNav}>
          <NavLink to="/" className={styles.mobileLink} onClick={closeMenu} end>
            Inicio
          </NavLink>

          {/* Tienda accordion mobile */}
          <div>
            <button
              className={`${styles.mobileLink} ${styles.mobileLinkAccordion}`}
              onClick={() => setTiendaMobileOpen((v) => !v)}
            >
              Tienda
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                style={{ transform: tiendaMobileOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s" }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {tiendaMobileOpen && (
              <div className={styles.mobileSublinks}>
                <Link to="/productos?cat=cafe" className={styles.mobileSublink} onClick={closeMenu}>Cafés</Link>
                <Link to="/productos?cat=cafeteras" className={styles.mobileSublink} onClick={closeMenu}>Cafeteras</Link>
                <Link to="/productos?cat=accesorios" className={styles.mobileSublink} onClick={closeMenu}>Accesorios</Link>
              </div>
            )}
          </div>

          <NavLink to="/nosotros" className={styles.mobileLink} onClick={closeMenu}>
            Nosotros
          </NavLink>

          <NavLink to="/contacto" className={styles.mobileLink} onClick={closeMenu}>
            Contacto
          </NavLink>

          <button
            className={`${styles.mobileLink} ${styles.mobileLinkCart}`}
            onClick={() => { closeMenu(); toggleCart(); }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            Carrito
            {totalItems > 0 && <span className={styles.mobileBadge}>{totalItems}</span>}
          </button>
        </nav>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className={styles.searchOverlay} onClick={() => setSearchOpen(false)}>
          <div className={styles.searchBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.searchInputRow}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                ref={inputRef}
                className={styles.searchInput}
                placeholder="Buscar café, cafeteras, accesorios..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className={styles.searchClose} onClick={() => setSearchOpen(false)}>×</button>
            </div>

            <div className={styles.searchResults}>
              {query.trim() === "" ? (
                <p className={styles.searchEmpty}>Escribí para buscar productos</p>
              ) : filtered.length === 0 ? (
                <p className={styles.searchEmpty}>No encontramos productos con ese nombre</p>
              ) : (
                filtered.map((p) => (
                  <Link
                    key={p.id}
                    to={`/productos?cat=${p.categoria}`}
                    className={styles.searchResultItem}
                    onClick={() => setSearchOpen(false)}
                  >
                    <img src={p.img} alt={p.nombre} className={styles.searchThumb} />
                    <div className={styles.searchResultInfo}>
                      <div className={styles.searchResultName}>{p.nombre}</div>
                      <div className={styles.searchResultCat}>{p.categoria}</div>
                    </div>
                    <div className={styles.searchResultPrice}>${fmt(p.precio)}</div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
