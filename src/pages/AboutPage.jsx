import styles from "./AboutPage.module.css";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.hero}>
          <p className={styles.label}>Nuestra historia</p>
          <h1 className={styles.title}>
            Somos BRUMA,<br />
            <em>una tienda de café con alma.</em>
          </h1>
        </div>

        <div className={styles.imgFull}>
          <img src="/nosotros.webp" alt="BRUMA café" />
        </div>

        <div className={styles.text}>
          <p>
            Nació de una pregunta simple: ¿por qué el café en casa no puede ser tan bueno como en las mejores cafeterías del mundo?
          </p>
          <p>
            Trabajamos directamente con productores de origen en Colombia, Ecuador, Guatemala y más, para traerte granos de especialidad con trazabilidad real y calidad consistente.
          </p>
          <p>
            Cada lote se tuesta en pequeñas cantidades y se envía fresco. Sin intermediarios, sin mezclas mediocres, sin compromiso en el sabor.
          </p>
        </div>

        <p className={styles.valuesTitle}>Lo que nos define</p>
        <div className={styles.values}>
          {[
            { t: "Origen directo", d: "Trabajamos con productores que conocemos personalmente." },
            { t: "Tueste artesanal", d: "Pequeños lotes con perfiles de tueste desarrollados a medida." },
            { t: "Frescura garantizada", d: "Enviamos en menos de 48h desde el tueste." },
          ].map((v) => (
            <div key={v.t} className={styles.value}>
              <h3>{v.t}</h3>
              <p>{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
