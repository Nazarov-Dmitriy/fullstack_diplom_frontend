import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import Sidebar from "src/components/sidebar/Sidebar";
import FormRegisterAdmin from "src/components/users/formRegisterAdmin/FormRegisterAdmin";
import FormSearch from "src/components/users/formSearch/FormSearch";
import ListDataSearch from "src/components/users/ListDataSearch/ListDataSearch";
import { clearDataSearch } from "src/features/userSlice";
import styles from "./Users.module.less";

function Users() {
  const dispatch = useAppDispatch();
  const { dataSearch, user, authenticated } = useAppSelector(
    (state) => state.user
  );
  const [flagSearch, setFlagSerch] = useState(true);

  function showAddUser() {
    dispatch(clearDataSearch());
    setFlagSerch(false);
  }

  function showSearch() {
    dispatch(clearDataSearch());
    setFlagSerch(true);
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.user_container}>
        <h2 className={styles.title}>Пользователи</h2>
        {authenticated && (user.role === "admin" || user.role === "manager") ? (
          <>
            <div className={styles.menu}>
              <div className={styles.search} onClick={showSearch}>
                <button className={styles.btn}>
                  Поиск
                  <img
                    src="../../assets/icons/seacrh.png"
                    alt="seacrh"
                    className={styles.icons_btn}
                  />
                </button>
              </div>
              {user.role === "admin" && (
                <div className={styles.create_user} onClick={showAddUser}>
                  <button className={styles.btn}>
                    Создать
                    <img
                      src="../../assets/icons/add.png"
                      alt="add user"
                      className={styles.icons_btn}
                    />
                  </button>
                </div>
              )}
            </div>

            {flagSearch && <FormSearch />}
            {dataSearch.length > 0 && <ListDataSearch />}
            {!flagSearch && user.role === "admin" && <FormRegisterAdmin />}
          </>
        ) : (
          <h3>Для продолжения работы требуеться авторизация </h3>
        )}
      </div>
    </div>
  );
}

export default Users;
