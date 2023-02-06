import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { removeUser, isAuthenticated } from "src/features/userSlice";
import { usePostLogoutMutation } from "src/servises/API/usersApi";
import styles from "./HeadersProfile.module.less";

function HeadersProfile() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [postLogout] = usePostLogoutMutation();
  const navigate = useNavigate();

   async function logout() {
    const logout = postLogout("");       
    dispatch(isAuthenticated(false));
    dispatch(removeUser());
    navigate("/");
  }

  return (
    <>
      <img
        className={styles.icons}
        src="../../assets/icons/user.png"
        alt="avatar"
      />
      <p className={styles.text}>{user.name} </p>
      <button className={styles.btn}>
        <Link to="/profile" className={styles.link}>
          Профиль
        </Link>
      </button>
      <div className={styles.btn_logout} onClick={() => logout()}>
        <img
          className={styles.icons}
          src="../../assets/icons/logout.png"
          alt="logout"
        />
      </div>
    </>
  );
}

export default HeadersProfile;
