import styles from "../styles/AdCard.module.css";

export default function AdCard({ ad, onDelete }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img 
          className={styles.image} 
          src={ad.image || "https://via.placeholder.com/400x250?text=No+Image"} 
          alt={ad.title} 
        />
        <span className={styles.categoryBadge}>{ad.category}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{ad.title}</h3>
        <p className={styles.description}>{ad.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>{ad.price} сом</span>
          <button className={styles.deleteBtn} onClick={() => onDelete(ad.id)}>Өчүрүү</button>
        </div>
      </div>
    </div>
  );
}