import { useState } from "react";
import AdForm from "./components/AdForm";
import AdFilter from "./components/AdFilter";
import AdList from "./components/AdList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles/App.module.css"; 

function App() {
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [category, setCategory] = useState("Баары");
  const [sort, setSort] = useState("newest");

  const handleSearchClick = () => {
    setActiveSearch(search);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoIcon}>
            <span role="img" aria-label="cart">🛍️</span>
          </div>
          <div>
            <h1 className={styles.title}>Marketplace</h1>
            <p className={styles.subtitle}>Жарыялар платформасы</p>
          </div>
        </div>
      </header>

      <AdFilter
        setSearch={setSearch}
        setCategory={setCategory}
        setSort={setSort}
        onSearchClick={handleSearchClick}
      />

      <AdForm />

      <div className={styles.listSection}>
        <div className={styles.listHeader}>
          <span>Жарыялар табылды</span>
        </div>
        <AdList search={activeSearch} category={category} sort={sort} />
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;