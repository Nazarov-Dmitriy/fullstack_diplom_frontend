import React from "react";
import { useAppSelector } from "src/app/hooks";
import Sidebar from "src/components/sidebar/Sidebar";
import styles from "./Profile.module.less";

function Profile() {
  const { user } = useAppSelector((state) => state.user);
  let role: string = "";

  function roleProfile() {
    if (user.role === "client") role = "Пользователь";
    if (user.role === "admin") role = "Администратор";
    if (user.role === "manager") role = "Менеджер";
  }

  roleProfile();

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.profile}>
        <h2 className={styles.title}>Профиль</h2>
        <div>
          <p className={styles.text}>Id: {user.id}</p>
          <p className={styles.text}>Имя: {user.name}</p>
          <p className={styles.text}>Email: {user.email}</p>
          <p className={styles.text}>Телефон: {user.contactPhone}</p>
          <p className={styles.text}>Статус: {role}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
