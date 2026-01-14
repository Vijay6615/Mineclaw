'use client';
import { useState } from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Articles from '@/components/Articles';
import AuthModal from "@/components/AuthModel";
import ProtectedLink from '@/components/ProtectedLink';
import styles from "@/styles/page.module.css";

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/');

  const handleAuthRequired = (path) => {
    setRedirectPath(path);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <main className={styles.main}>
      <Hero onAuthRequired={handleAuthRequired} />
      <Features />
      
      {/* Quick Action Section */}
      <section className={styles.quickAction}>
        <div className={styles.actionContainer}>
          <h2>Need Immediate Help?</h2>
          <p>If you or someone you know is in crisis, reach out now</p>
          <div className={styles.actionButtons}>
            <a href="tel:1-800-662-4357" className={styles.callBtn}>
              📞 Call Crisis Line
            </a>
            <ProtectedLink 
              href="/resources" 
              className={styles.resourceBtn}
              onAuthRequired={handleAuthRequired}
            >
              🗺️ Find Resources Near You
            </ProtectedLink>
          </div>
        </div>
      </section>

      {/* Warning Signs Section */}
      <section className={styles.warningSigns}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Recognizing the Signs</h2>
          <p className={styles.sectionSubtitle}>
            Early detection can save lives. Watch for these warning signs:
          </p>
          
          <div className={styles.signsGrid}>
            <div className={styles.signCard}>
              <h3>🧠 Behavioral Changes</h3>
              <ul>
                <li>Sudden mood swings or personality changes</li>
                <li>Loss of interest in activities</li>
                <li>Changes in sleep patterns</li>
                <li>Secretive or suspicious behavior</li>
              </ul>
            </div>
            
            <div className={styles.signCard}>
              <h3>💼 Social & Work Impact</h3>
              <ul>
                <li>Declining performance at work/school</li>
                <li>Withdrawal from family and friends</li>
                <li>Financial problems</li>
                <li>Neglecting responsibilities</li>
              </ul>
            </div>
            
            <div className={styles.signCard}>
              <h3>⚕️ Physical Symptoms</h3>
              <ul>
                <li>Bloodshot eyes or dilated pupils</li>
                <li>Weight loss or gain</li>
                <li>Poor hygiene</li>
                <li>Unusual smells on breath or clothes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Preview */}
      <Articles onAuthRequired={handleAuthRequired} />

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Join the Movement</h2>
          <p>Help us create drug-free communities. Get involved today.</p>
          <div className={styles.ctaButtons}>
            <ProtectedLink 
              href="/about" 
              className={styles.learnMoreBtn}
              onAuthRequired={handleAuthRequired}
            >
              Learn About Our Mission
            </ProtectedLink>
            <ProtectedLink 
              href="/contact" 
              className={styles.contactBtn}
              onAuthRequired={handleAuthRequired}
            >
              Contact Us
            </ProtectedLink>
          </div>
        </div>
      </section>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={closeAuthModal}
        redirectPath={redirectPath}
      />
    </main>
  );
}