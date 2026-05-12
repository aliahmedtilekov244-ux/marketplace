// src/components/CartModal.jsx
// ЗАМЕНИ ВЕСЬ ФАЙЛ НА ЭТОТ КОД

import styles from "../styles/CartModal.module.css";
import { FaTimes, FaTrash } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";

function CartModal({
  cart,
  setOpenCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* HEADER */}
        <div className={styles.header}>
          <div>
            {/* Без emoji в тексте — иконка добавляется через CSS */}
            <h1>Корзина</h1>
            <p>
              {cart.length} {cart.length === 1 ? "товар" : "товаров"}
            </p>
          </div>

          <button
            className={styles.closeBtn}
            onClick={() => setOpenCart(false)}
            aria-label="Закрыть корзину"
          >
            <FaTimes />
          </button>
        </div>

        {/* EMPTY */}
        {cart.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <FiShoppingBag />
            </div>

            <h2>Корзина пуста</h2>
            <p>Добавьте цветы в корзину</p>
          </div>
        ) : (
          <>
            {/* ITEMS */}
            <div className={styles.items}>
              {cart.map((item) => (
                <div className={styles.item} key={item.id}>
                  <img src={item.image} alt={item.title} />

                  <div className={styles.info}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>

                    <div className={styles.controls}>
                      <button
                        onClick={() => decreaseQty(item.id)}
                        aria-label="Уменьшить количество"
                      >
                        −
                      </button>

                      <span>{item.qty}</span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        aria-label="Увеличить количество"
                      >
                        +
                      </button>

                      <button
                        className={styles.deleteBtn}
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Удалить товар"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div className={styles.price}>
                    <h2>{item.price * item.qty}</h2>
                    <span>сом</span>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className={styles.totalBox}>
              <h2 className={styles.total}>Итого:</h2>
              <h2 className={styles.total}>{total} сом</h2>
            </div>

            {/* CHECKOUT */}
            <button className={styles.checkoutBtn}>Оформить заказ</button>
          </>
        )}
      </div>
    </div>
  );
}

export default CartModal;
