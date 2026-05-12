import styles from "../styles/ProductCard.module.css";

import { FaHeart, FaRegHeart, FaCheck } from "react-icons/fa";

function ProductCard({ item, toggleLike, addToCart }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageBlock}>
        <div className={styles.badge}>NEW</div>

        <img src={item.image} alt="" />

        <button className={styles.likeBtn} onClick={() => toggleLike(item.id)}>
          {item.liked ? <FaHeart color="#ff4fa2" /> : <FaRegHeart />}
        </button>

        {!item.stock && <div className={styles.stock}>Нет в наличии</div>}
      </div>

      <div className={styles.info}>
        <p className={styles.category}>{item.category}</p>

        <h3>{item.title}</h3>

        <p className={styles.desc}>{item.desc}</p>

        <div className={styles.bottom}>
          <h2>{item.price} сом</h2>

          <button
            disabled={!item.stock}
            onClick={() => addToCart(item)}
            className={item.added ? styles.addedBtn : styles.cartBtn}
          >
            {item.added ? (
              <>
                <FaCheck />
                Добавлено
              </>
            ) : (
              "+ В корзину"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
