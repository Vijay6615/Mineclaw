import styles from "@/styles/hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* LEFT CONTENT */}
        <div className={styles.left}>
          <span className={styles.badge}>
            Prevention • Awareness • Support
          </span>

          <h1>
            Building a safer, <br />
            <span>drug-free</span> future.
          </h1>

          <p>
            Mineclaw provides educational resources, support networks, and
            community tools to fight substance abuse through knowledge and
            connection.
          </p>

          <div className={styles.actions}>
            <button className={styles.primary}>Explore Resources</button>
            <button className={styles.secondary}>Get Involved</button>
          </div>
        </div>

        {/* RIGHT IMAGE CARD */}
        <div className={styles.right}>
          <div className={styles.imageCard}>
            <img src="/family.jpg" alt="Community support" />
            <div className={styles.imageOverlay}>
              <h4>Community First</h4>
              <p>Together we are stronger.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
