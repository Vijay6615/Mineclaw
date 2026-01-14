import styles from "@/styles/features.module.css";

export default function Features() {
  return (
    <section className={styles.section}>
      <h2>Comprehensive Support System</h2>
      <p className={styles.subtitle}>
        Everything you need to stay informed, safe, and supported in one
        platform.
      </p>

      <div className={styles.grid}>
        {/* CARD 1 */}
        <div className={styles.card}>
          <div className={styles.icon}>📘</div>
          <h3>Educational Hub</h3>
          <p>
            Curated articles and guides about prevention, signs of abuse, and
            recovery strategies.
          </p>
          <span className={styles.link}>Learn more →</span>
        </div>

        {/* CARD 2 */}
        <div className={styles.card}>
          <div className={styles.icon}>🛡️</div>
          <h3>Emergency Access</h3>
          <p>
            Immediate access to helplines, emergency services, and crisis
            intervention centers.
          </p>
          <span className={styles.link}>Learn more →</span>
        </div>

        {/* CARD 3 */}
        <div className={styles.card}>
          <div className={styles.icon}>❤️</div>
          <h3>Community Stories</h3>
          <p>
            Real stories from real people who have overcome challenges and
            found recovery.
          </p>
          <span className={styles.link}>Learn more →</span>
        </div>
      </div>
    </section>
  );
}
