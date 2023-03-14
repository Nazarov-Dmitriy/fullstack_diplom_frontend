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
        <li
          className={styles.list_item}
          onClick={() => {
            navigate("/hotel-rooms-search");
          }}
        >
          <span>
            <img
              className={styles.list_img}
              src="../../assets/icons/shevron.png"
              alt="shevron"
            />
          </span>
          Поиск Номера
        </li>

        {authenticated && user.role === "client" ? (
          <li
            className={styles.list_item}
            onClick={() => {
              navigate("/client-support/");
            }}
          >
            <span>
              <img
                className={styles.list_img}
                src="../../assets/icons/shevron.png"
                alt="shevron"
              />
            </span>
            Техподжержка
          </li>
        ) : null}

        {authenticated && user.role === "manager" ? (
        <li
          className={styles.list_item}
          onClick={() => {
            navigate("/manager-client-support/");
          }}
        >
          <span>
            <img
              className={styles.list_img}
              src="../../assets/icons/shevron.png"
              alt="shevron"
            />
          </span>
          Обращения клиентов
        </li>
        ) : null}

        {authenticated && user.role === "client" ? (
          <li
            className={styles.list_item}
            onClick={() => {
              navigate("/user-reservations/");
            }}
          >
            <span>
              <img
                className={styles.list_img}
                src="../../assets/icons/shevron.png"
                alt="shevron"
              />
            </span>
            Мои брони
          </li>
        ) : null}

        {authenticated && user.role === "manager" ? (
          <li
            className={styles.list_item}
            onClick={() => {
              navigate("/сlient-reservations/");
            }}
          >
            <span>
              <img
                className={styles.list_img}
                src="../../assets/icons/shevron.png"
                alt="shevron"
              />
            </span>
            Брони клиентов
          </li>
        ) : null}

        {authenticated && user.role === "admin" ? (
          <li
            className={styles.list_item}
            onClick={() => {
              navigate("/hotel");
            }}
          >
            <span>
              <img
                className={styles.list_img}
                src="../../assets/icons/shevron.png"
                alt="shevron"
              />
            </span>
            Все гостиницы
          </li>
        ) : null}

        {authenticated && user.role === "admin" ? (
          <li
            className={styles.list_item}
            onClick={() => {
              navigate("/hotel-rooms/search-admin/");
            }}
          >
            <span>
              <img
                className={styles.list_img}
                src="../../assets/icons/shevron.png"
                alt="shevron"
              />
            </span>
            Все номера
          </li>
        ) : null}

        {authenticated && user.role === "admin" ? (
          <li
            className={styles.list_item}
            onClick={() => {
              navigate("/add-hotel/");
            }}
          >
            <span>
              <img
                className={styles.list_img}
                src="../../assets/icons/shevron.png"
                alt="shevron"
              />
            </span>
            Добавить гостиницу
          </li>
        ) : null}

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
