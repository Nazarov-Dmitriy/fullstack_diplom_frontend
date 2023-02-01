import React from "react";
import styles from "./Sidebar.module.less";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <span>
            <img
              className={styles.list_img}
              src="../../assets/icons/shevron.png"
              alt="shevron"
            />
          </span>
          Все гостиницы
        </li>
        <li className={styles.list_item}>
          <span>
            <img
              className={styles.list_img}
              src="../../assets/icons/shevron.png"
              alt="shevron"
            />
          </span>
          Поиск Номера
        </li>
        <li className={styles.list_item}>
          <span>
            <img
              className={styles.list_img}
              src="../../assets/icons/shevron.png"
              alt="shevron"
            />
          </span>
          Добавить гостиницу
        </li>
        <li className={styles.list_item}>
          <span>
            <img
              className={styles.list_img}
              src="../../assets/icons/shevron.png"
              alt="shevron"
            />
          </span>
          Пользователи
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
