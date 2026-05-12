// src/App.jsx

import { useState } from "react";

import styles from "./styles/App.module.css";

import Header from "./components/Header";
import Categories from "./components/Categories";
import ProductCard from "./components/ProductCard";
import CartModal from "./components/CartModal";

import productsData from "./data/products";

function App() {

  const [products, setProducts] =
    useState(productsData);

  const [cart, setCart] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [openCart, setOpenCart] =
    useState(false);

  const [activeCategory, setActiveCategory] =
    useState("all");

  // ЛАЙК
  const toggleLike = (id) => {
    setProducts(
      products.map((item) =>
        item.id === id
          ? {
              ...item,
              liked: !item.liked,
            }
          : item
      )
    );
  };

  // ДОБАВИТЬ В КОРЗИНУ
  const addToCart = (product) => {

    setProducts(
      products.map((item) =>
        item.id === product.id
          ? {
              ...item,
              added: true,
            }
          : item
      )
    );

    const exist =
      cart.find(
        (item) =>
          item.id === product.id
      );

    if (exist) {

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty:
                  item.qty + 1,
              }
            : item
        )
      );

    } else {

      setCart([
        ...cart,

        {
          ...product,
          qty: 1,
        },
      ]);
    }
  };

  // УДАЛИТЬ
  const removeFromCart = (id) => {

    setCart(
      cart.filter(
        (item) =>
          item.id !== id
      )
    );

    setProducts(
      products.map((item) =>
        item.id === id
          ? {
              ...item,
              added: false,
            }
          : item
      )
    );
  };

  // УВЕЛИЧИТЬ
  const increaseQty = (id) => {

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty:
                item.qty + 1,
            }
          : item
      )
    );
  };

  // УМЕНЬШИТЬ
  const decreaseQty = (id) => {

    const product =
      cart.find(
        (item) =>
          item.id === id
      );

    if (
      product.qty === 1
    ) {

      removeFromCart(id);

      return;
    }

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty:
                item.qty - 1,
            }
          : item
      )
    );
  };

  // ФИЛЬТР
  const filteredProducts =
    products.filter((item) => {

      const matchSearch =
        item.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      let matchCategory = true;

      // ИЗБРАННОЕ
      if (
        activeCategory ===
        "favorites"
      ) {

        matchCategory =
          item.liked;
      }

      // ДРУГИЕ КАТЕГОРИИ
      else if (
        activeCategory !==
        "all"
      ) {

        matchCategory =
          item.category ===
          activeCategory;
      }

      return (
        matchSearch &&
        matchCategory
      );
    });

  return (
    <div className={styles.app}>

      <Header
        cart={cart}
        search={search}
        setSearch={setSearch}
        setOpenCart={setOpenCart}
      />

      <Categories
        activeCategory={
          activeCategory
        }
        setActiveCategory={
          setActiveCategory
        }
        products={products}
      />

      <h2 className={styles.title}>
        Найдено{" "}
        {
          filteredProducts.length
        }{" "}
        товаров
      </h2>

      <div className={styles.products}>

        {filteredProducts.map(
          (item) => (
            <ProductCard
              key={item.id}
              item={item}
              toggleLike={
                toggleLike
              }
              addToCart={
                addToCart
              }
            />
          )
        )}

      </div>

      {openCart && (
        <CartModal
          cart={cart}
          setOpenCart={
            setOpenCart
          }
          removeFromCart={
            removeFromCart
          }
          increaseQty={
            increaseQty
          }
          decreaseQty={
            decreaseQty
          }
        />
      )}

    </div>
  );
}

export default App;