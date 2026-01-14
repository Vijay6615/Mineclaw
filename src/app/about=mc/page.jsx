import styles from '@/styles/about.module.css';

export default function AboutPage() {
  const team = [
    {
      name: 'Vijay Shukla',
      role: 'Medical Director',
      image: '👩‍⚕️',
      bio: 'Board-certified addiction specialist with 15+ years experience'
    },
    {
      name: 'Gaurav Kumar',
      role: 'Community Outreach',
      image: '👨‍💼',
      bio: 'Dedicated to building partnerships and spreading awareness'
    },
    {
      name: 'Qaem Khan',
      role: 'Prevention Specialist',
      image: '👩‍🏫',
      bio: 'Expert in youth education and prevention programs'
    },
    {
      name: 'Nakul Jaiswal',
      role: 'Recovery Coach',
      image: '👨‍🦰',
      bio: '10 years in recovery, helping others find their path to healing'
    }
  ];

  const values = [
    {
      icon: '❤️',
      title: 'Compassion',
      description: 'We approach every individual with empathy and understanding, free from judgment'
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'Building strong, supportive networks that foster healing and prevention'
    },
    {
      icon: '📚',
      title: 'Education',
      description: 'Empowering people with knowledge to make informed decisions'
    },
    {
      icon: '🎯',
      title: 'Evidence-Based',
      description: 'Using proven methods and scientific research to guide our approach'
    },
    {
      icon: '🌟',
      title: 'Hope',
      description: 'Believing in recovery and the potential for positive change'
    },
    {
      icon: '🔒',
      title: 'Confidentiality',
      description: 'Protecting privacy and providing safe spaces for healing'
    }
  ];

  const milestones = [
    { year: '2018', event: 'Mineclaw founded with mission to combat drug abuse' },
    { year: '2019', event: 'Launched first community awareness programs' },
    { year: '2020', event: 'Expanded to 50+ community partnerships' },
    { year: '2021', event: 'Reached 10,000+ individuals with prevention education' },
    { year: '2022', event: 'Introduced 24/7 crisis support hotline' },
    { year: '2023', event: 'Partnered with 100+ treatment facilities nationwide' },
    { year: '2024', event: 'Launched digital resource platform' },
    { year: '2025', event: 'Serving communities across the nation' }
  ];

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>About Mineclaw</h1>
          <p className={styles.tagline}>
            Building drug-free communities through education, support, and hope
          </p>
        </div>
      </section>

      <div className={styles.container}>
        {/* Mission Section */}
        <section className={styles.mission}>
          <div className={styles.missionContent}>
            <div className={styles.missionText}>
              <h2>Our Mission</h2>
              <p>
                Mineclaw is dedicated to preventing drug abuse and helping those affected by addiction 
                through comprehensive education, community support, and accessible resources. We believe 
                that with the right knowledge, support, and tools, communities can overcome the devastating 
                impact of substance abuse.
              </p>
              <p>
                Every day, we work tirelessly to break down barriers to treatment, reduce stigma, and 
                create pathways to recovery. Our holistic approach combines prevention education, crisis 
                intervention, and long-term support to address substance abuse at every stage.
              </p>
            </div>
            <div className={styles.missionStats}>
              <div className={styles.statBox}>
                <h3>50,000+</h3>
                <p>Lives Impacted</p>
              </div>
              <div className={styles.statBox}>
                <h3>100+</h3>
                <p>Partner Organizations</p>
              </div>
              <div className={styles.statBox}>
                <h3>24/7</h3>
                <p>Crisis Support</p>
              </div>
              <div className={styles.statBox}>
                <h3>500+</h3>
                <p>Community Events</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className={styles.values}>
          <h2 className={styles.sectionTitle}>Our Core Values</h2>
          <p className={styles.sectionSubtitle}>
            These principles guide everything we do
          </p>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className={styles.story}>
          <h2 className={styles.sectionTitle}>Our Story</h2>
          <div className={styles.storyContent}>
            <p>
              Mineclaw was born from a community's determination to fight back against the rising tide 
              of drug abuse. Founded in 2018 by concerned citizens, healthcare professionals, and 
              recovered individuals, we started with a simple vision: create a comprehensive support 
              system that addresses prevention, intervention, and recovery.
            </p>
            <p>
              What began as small community meetings has grown into a movement spanning multiple 
              communities. We've witnessed the devastating impact of addiction on families, but also 
              the incredible power of recovery and hope. These experiences fuel our commitment to 
              making help accessible to everyone who needs it.
            </p>
            <p>
              Today, Mineclaw stands as a beacon of hope, offering evidence-based resources, 
              compassionate support, and a judgment-free space for anyone affected by substance abuse. 
              We continue to evolve, always listening to our community and adapting our approach to 
              meet emerging needs.
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className={styles.timeline}>
          <h2 className={styles.sectionTitle}>Our Journey</h2>
          <div className={styles.timelineContainer}>
            {milestones.map((milestone, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineYear}>{milestone.year}</div>
                <div className={styles.timelineEvent}>{milestone.event}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className={styles.team}>
          <h2 className={styles.sectionTitle}>Meet Our Team</h2>
          <p className={styles.sectionSubtitle}>
            Dedicated professionals committed to making a difference
          </p>
          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.teamImage}>{member.image}</div>
                <h3>{member.name}</h3>
                <p className={styles.teamRole}>{member.role}</p>
                <p className={styles.teamBio}>{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Section */}
        <section className={styles.impact}>
          <h2 className={styles.sectionTitle}>Our Impact</h2>
          <div className={styles.impactGrid}>
            <div className={styles.impactCard}>
              <div className={styles.impactIcon}>🎓</div>
              <h3>Prevention Education</h3>
              <p>
                Delivered prevention programs to 200+ schools and community centers, 
                reaching over 30,000 students and families
              </p>
            </div>
            <div className={styles.impactCard}>
              <div className={styles.impactIcon}>🆘</div>
              <h3>Crisis Intervention</h3>
              <p>
                Provided immediate support through our 24/7 hotline, 
                connecting 5,000+ individuals with life-saving resources
              </p>
            </div>
            <div className={styles.impactCard}>
              <div className={styles.impactIcon}>🏥</div>
              <h3>Treatment Access</h3>
              <p>
                Facilitated access to treatment for 2,000+ individuals 
                through partnerships with certified facilities
              </p>
            </div>
            <div className={styles.impactCard}>
              <div className={styles.impactIcon}>👨‍👩‍👧‍👦</div>
              <h3>Family Support</h3>
              <p>
                Supported 1,500+ families through counseling, 
                education, and peer support groups
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <h2>Join Us in Making a Difference</h2>
          <p>Together, we can create drug-free communities and save lives</p>
          <div className={styles.ctaButtons}>
            <a href="/contact" className={styles.primaryBtn}>Get Involved</a>
            <a href="/resources" className={styles.secondaryBtn}>Find Resources</a>
          </div>
        </section>
      </div>
    </main>
  );
}