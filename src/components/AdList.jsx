import { useEffect, useState } from "react";
import { db } from "../firebase/firebase"; 
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import AdCard from "./AdCard";
import styles from "../styles/AdList.module.css";

export default function AdList({ search, category, sort }) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "ads"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAds(data);
    } catch (error) {
      console.error("Ката кетти:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Чын эле өчүрөсүзбү?")) {
      try {
        await deleteDoc(doc(db, "ads", id));
        setAds(ads.filter((ad) => ad.id !== id)); 
      } catch (err) {
        alert("Өчүрүүдө ката кетти");
      }
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  let displayAds = ads.filter((ad) => {
    const matchesSearch = ad.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "Баары" || ad.category === category;
    
    return matchesSearch && matchesCategory;
  });

  if (sort === "cheap") {
    displayAds.sort((a, b) => a.price - b.price);
  } else if (sort === "expensive") {
    displayAds.sort((a, b) => b.price - a.price);
  }

  if (loading) return <h2 className={styles.loader}>Жүктөлүүдө...</h2>;

  return (
    <div className={styles.listWrapper}>
      {displayAds.length === 0 ? (
        <p className={styles.empty}>Эч нерсе табылган жок</p>
      ) : (
        <div className={styles.grid}>
          {displayAds.map((ad) => (
            <AdCard key={ad.id} ad={ad} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}