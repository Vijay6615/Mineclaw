'use client';
import { useState } from 'react';
import styles from "@/styles/emergency.module.css";

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources = [
    {
      id: 1,
      name: 'SAMHSA National Helpline',
      phone: '1-800-662-4357',
      description: 'Free, confidential, 24/7 treatment referral and information service',
      category: 'hotline',
      available: '24/7'
    },
    {
      id: 2,
      name: 'Narcotics Anonymous',
      phone: '1-818-773-9999',
      website: 'na.org',
      description: 'Community-based peer support for recovery from drug addiction',
      category: 'support',
      available: 'Various meeting times'
    },
    {
      id: 3,
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      description: 'Free 24/7 crisis support via text message',
      category: 'hotline',
      available: '24/7'
    },
    {
      id: 4,
      name: 'Substance Abuse Treatment Locator',
      website: 'findtreatment.gov',
      description: 'Find licensed treatment facilities for substance use disorders',
      category: 'treatment',
      available: 'Online resource'
    },
    {
      id: 5,
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      description: 'Free and confidential support for people in distress',
      category: 'hotline',
      available: '24/7'
    },
    {
      id: 6,
      name: 'Al-Anon Family Groups',
      phone: '1-888-425-2666',
      website: 'al-anon.org',
      description: 'Support for families and friends of alcoholics',
      category: 'support',
      available: 'Various meeting times'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Resources', icon: '📋' },
    { id: 'hotline', name: 'Crisis Hotlines', icon: '📞' },
    { id: 'treatment', name: 'Treatment Centers', icon: '🏥' },
    { id: 'support', name: 'Support Groups', icon: '👥' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Find Help & Resources</h1>
          <p>Confidential support and treatment resources available 24/7</p>
        </div>
      </section>

      {/* Emergency Banner */}
      <div className={styles.emergencyBanner}>
        <span className={styles.emergencyIcon}>🚨</span>
        <div className={styles.emergencyContent}>
          <h3>In Crisis? Get Immediate Help</h3>
          <div className={styles.emergencyNumbers}>
            <a href="tel:1-800-662-4357" className={styles.emergencyLink}>
              📞 1-800-662-HELP (4357)
            </a>
            <a href="tel:988" className={styles.emergencyLink}>
              📞 988 (Suicide Prevention)
            </a>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {/* Search and Filter */}
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          
          <div className={styles.categories}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`${styles.categoryBtn} ${selectedCategory === category.id ? styles.active : ''}`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className={styles.resourcesGrid}>
          {filteredResources.map(resource => (
            <div key={resource.id} className={styles.resourceCard}>
              <div className={styles.resourceHeader}>
                <h3>{resource.name}</h3>
                <span className={styles.availability}>{resource.available}</span>
              </div>
              
              <p className={styles.description}>{resource.description}</p>
              
              <div className={styles.resourceActions}>
                {resource.phone && (
                  <a href={`tel:${resource.phone.replace(/[^0-9]/g, '')}`} className={styles.actionBtn}>
                    📞 {resource.phone}
                  </a>
                )}
                {resource.website && (
                  <a href={`https://${resource.website}`} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                    🌐 Visit Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className={styles.noResults}>
            <p>No resources found matching your search.</p>
          </div>
        )}

        {/* Additional Info */}
        <section className={styles.infoSection}>
          <h2>What to Expect When You Call</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3>🔒 Confidential</h3>
              <p>All calls and information are completely confidential</p>
            </div>
            <div className={styles.infoCard}>
              <h3>💰 Free Service</h3>
              <p>Services are provided at no cost to you</p>
            </div>
            <div className={styles.infoCard}>
              <h3>👨‍⚕️ Professional Help</h3>
              <p>Trained counselors available to assist you</p>
            </div>
            <div className={styles.infoCard}>
              <h3>🌍 Multiple Languages</h3>
              <p>Services available in multiple languages</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}