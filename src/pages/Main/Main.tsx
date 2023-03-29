import React from "react";
import styles from "./Main.module.less";
import Sidebar from "src/components/sidebar/Sidebar";
function Main() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <h2 className={styles.title}>Твой Отель</h2>
        <h3 className={styles.text}>
          Cайт-агрегатор просмотра и бронирования гостиниц
        </h3>
        <p className={styles.text}>Клиентам:</p>
        <ul className={styles.list}>
          <li className={styles.list_item}>-Большой выбор номеров</li>
          <li className={styles.list_item}>-Удобное бронирование</li>
        </ul>
        <p className={styles.text}>Бизнесу:</p>
        <ul className={styles.list}>
          <li className={styles.list_item}>-Большой выбор номеров</li>
          <li className={styles.list_item}>-Удобное бронирование</li>
        </ul>
      </div>
    </div>
  );
}

export default Main;
