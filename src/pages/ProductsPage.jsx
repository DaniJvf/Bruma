import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categorias } from "../data/products";
import ProductCard from "../components/ui/ProductCard";
import styles from "./ProductsPage.module.css";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const catParam = searchParams.get("cat") || "todos";

  const filtered = products.filter((p) => {
    const matchCat = catParam === "todos" || p.categoria === catParam;
    const matchSearch =
      searchQuery === "" ||
      p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCat = (id) => {
    setSearchParams(id === "todos" ? {} : { cat: id });
  };

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.pageHeader}>
          <div>
            <p className={styles.pageLabel}>Tienda</p>
            <h1 className={styles.pageTitle}>
              {catParam === "todos"
                ? "Todos los productos"
                : categorias.find((c) => c.id === catParam)?.label || "Productos"}
            </h1>
          </div>
          <div className={styles.searchWrap}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className={styles.searchInput}
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className={styles.searchClear} onClick={() => setSearchQuery("")} aria-label="Limpiar">×</button>
            )}
          </div>
        </div>

        <div className={styles.filterBar}>
          {categorias.map((c) => (
            <button
              key={c.id}
              className={`${styles.filterBtn} ${catParam === c.id ? styles.active : ""}`}
              onClick={() => handleCat(c.id)}
            >
              {c.label}
            </button>
          ))}
          <span className={styles.count}>{filtered.length} producto{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyIcon}>☕</p>
            <p className={styles.emptyTitle}>No encontramos productos</p>
            <p className={styles.emptyDesc}>Intentá con otro término o categoría.</p>
            <button className={styles.emptyReset} onClick={() => { setSearchQuery(""); handleCat("todos"); }}>
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
