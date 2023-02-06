import React from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import styles from "./Sidebar.module.less";
import { useNavigate } from "react-router-dom";
import { clearDataSearch } from "src/features/userSlice";

function Sidebar() {
  const dispatch = useAppDispatch();
  const { user, authenticated } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

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
        {authenticated && (user.role === "admin" || user.role === "manager") ? (
          <li
            className={styles.list_item}
            onClick={() => {
              dispatch(clearDataSearch());
              navigate("/users");
            }}
          >
            <span>
              <img
                className={styles.list_img}
                src="../../assets/icons/shevron.png"
                alt="shevron"
              />
            </span>
            Пользователи
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export default Sidebar;
