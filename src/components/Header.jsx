import styles from "../styles/Header.module.css";

import { FaShoppingCart, FaSearch } from "react-icons/fa";

function Header({ cart, search, setSearch, setOpenCart }) {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        🌸 Petals & Blooms
        <span>Luxury Flower Shop</span>
      </div>

      <div className={styles.searchBox}>
        <FaSearch />

        <input
          type="text"
          placeholder="Search flowers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button className={styles.cartBtn} onClick={() => setOpenCart(true)}>
        <FaShoppingCart />

        <span className={styles.count}>{cart.length}</span>
      </button>
    </div>
  );
}

export default Header;
