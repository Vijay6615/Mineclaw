import Link from 'next/link';
import styles from '@/styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* About Section */}
          <div className={styles.section}>
            <h3 className={styles.logo}>
              <span>🛡️</span> Mineclaw
            </h3>
            <p className={styles.description}>
              Empowering communities to prevent drug abuse through education, awareness, and support.
            </p>
            <div className={styles.social}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">📘</a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">🐦</a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">📷</a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">💼</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h4 className={styles.heading}>Quick Links</h4>
            <ul className={styles.links}>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/articles">Articles</Link></li>
              <li><Link href="/resources">Resources</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className={styles.section}>
            <h4 className={styles.heading}>Get Help</h4>
            <ul className={styles.links}>
              <li><a href="tel:1-800-662-4357">Crisis Hotline</a></li>
              <li><Link href="/resources">Find Treatment</Link></li>
              <li><Link href="/resources">Support Groups</Link></li>
              <li><Link href="/resources">Community Resources</Link></li>
            </ul>
          </div>

          {/* Emergency */}
          <div className={styles.section}>
            <h4 className={styles.heading}>Emergency</h4>
            <div className={styles.emergency}>
              <p className={styles.emergencyText}>24/7 Crisis Support</p>
              <a href="tel:1-800-662-4357" className={styles.emergencyNumber}>
                1-800-662-HELP
              </a>
              <p className={styles.emergencySubtext}>
                Free and confidential support available anytime
              </p>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Mineclaw. All rights reserved.
          </p>
          <div className={styles.legal}>
            <Link href="/privacy">Privacy Policy</Link>
            <span className={styles.separator}>•</span>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}