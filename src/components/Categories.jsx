// src/components/Categories.jsx

import styles from "../styles/Categories.module.css";

import {
  FaBorderAll,
  FaLeaf,
  FaGift,
  FaHeart,
} from "react-icons/fa";

import { GiRose } from "react-icons/gi";

function Categories({
  activeCategory,
  setActiveCategory,
  products,
}) {

  const favoritesCount =
    products.filter(
      (item) => item.liked
    ).length;

  const categories = [
    {
      name: "Все",
      value: "all",
      icon: <FaBorderAll />,
    },

    {
      name: "Розы",
      value: "roses",
      icon: <GiRose />,
    },

    {
      name: "Букеты",
      value: "bouquets",
      icon: <FaLeaf />,
    },

    {
      name: "Подарки",
      value: "gifts",
      icon: <FaGift />,
    },

    {
      name: "Свадебные",
      value: "wedding",
      icon: <FaHeart />,
    },

    {
      name: "Комнатные",
      value: "indoor",
      icon: <FaLeaf />,
    },

    {
      name: "Избранное",
      value: "favorites",
      icon: <FaHeart />,
      count: favoritesCount,
    },
  ];

  return (
    <div className={styles.categories}>

      {categories.map((item) => (
        <button
          key={item.value}
          onClick={() =>
            setActiveCategory(item.value)
          }
          className={
            activeCategory === item.value
              ? styles.active
              : ""
          }
        >

          <span className={styles.icon}>
            {item.icon}
          </span>

          {item.name}

          {item.value ===
            "favorites" &&
            item.count > 0 && (
              <span className={styles.badge}>
                {item.count}
              </span>
            )}

        </button>
      ))}

    </div>
  );
}

export default Categories;