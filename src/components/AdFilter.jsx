import { useState } from "react";
import styles from "../styles/AdFilter.module.css";

export default function AdFilter({ onSearch, onCategoryChange, onSortChange }) {
  const [localSearch, setLocalSearch] = useState(""); 

  return (
    <div className={styles.filterContainer}>
      <div className={styles.searchBox}>
        <input 
          className={styles.searchInput}
          type="text" 
          placeholder="Жарыяларды издөө..." 
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
        <button className={styles.searchBtn} onClick={() => onSearch(localSearch)}>🔍</button>
      </div>

      <div className={styles.selectGroup}>
        <select className={styles.filterSelect} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="Баары">Баардык</option>
          <option value="Электроника">Электроника</option>
          <option value="Авто">Авто</option>
          <option value="Кийим">Кийим</option>
        </select>

        <select className={styles.filterSelect} onChange={(e) => onSortChange(e.target.value)}>
          <option value="newest">Жаңылар</option>
          <option value="cheap">Арзандар</option>
          <option value="expensive">Кымбаттар</option>
        </select>
      </div>
    </div>
  );
}