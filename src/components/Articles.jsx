import styles from "@/styles/articles.module.css";

const articles = [
  {
    id: 1,
    category: "AWARENESS",
    title: "Building Resilience Against Peer Pressure",
    description:
      "Peer pressure is one of the leading causes of substance experimentation among youth. Learning how to say no...",
    date: "Jan 13, 2026",
    time: "5 min",
    image: "/articles/peer-pressure.jpg",
  },
  {
    id: 2,
    category: "PREVENTION",
    title: "Signs of Drug Abuse in Teens",
    description:
      "Recognizing the early signs of drug abuse is crucial for prevention. Common indicators include sudden...",
    date: "Jan 13, 2026",
    time: "5 min",
    image: "/articles/teen-drug-abuse.jpg",
  },
  {
    id: 3,
    category: "EDUCATIONAL",
    title: "Understanding Addiction: The Science Behind It",
    description:
      "Addiction is a complex disease of the brain and body that involves compulsive use of substances...",
    date: "Jan 13, 2026",
    time: "5 min",
    image: "/articles/addiction-science.jpg",
  },
];

export default function Articles() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2>Latest Insights</h2>
          <p>Stay updated with the latest research and stories.</p>
        </div>
        <span className={styles.viewAll}>View all articles →</span>
      </div>

      <div className={styles.grid}>
        {articles.map((article) => (
          <article key={article.id} className={styles.card}>
            <img src={article.image} alt={article.title} />

            <div className={styles.content}>
              <span className={styles.category}>{article.category}</span>

              <div className={styles.meta}>
                <span>{article.date}</span>
                <span>•</span>
                <span>Reading time: {article.time}</span>
              </div>

              <h3>{article.title}</h3>
              <p>{article.description}</p>

              <span className={styles.readMore}>
                Read Full Article →
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
