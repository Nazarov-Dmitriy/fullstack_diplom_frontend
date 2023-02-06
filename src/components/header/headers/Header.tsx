import styles from "./Headers.module.less";
import { Link } from "react-router-dom";
import React from "react";
import ModalSiginIn from "../modalSiginIn/ModalSiginIn";
import {  useAppSelector } from "src/app/hooks";
import HeaderBtnLogin from "../headerBtnLogin/HeaderBtnLogin";
import HeadersProfile from "../headersProfile/HeadersProfile";


function Header() {
  const { showModalState } = useAppSelector((state) => state.modal);
  const { authenticated } = useAppSelector((state) => state.user);

  return (
    <>
      <div className={styles.header}>
        <Link to="/" className={styles.logo}>
          <img
            className={styles.logo_img}
            src="../../assets/icons/logo.png"
            alt="Test"
          />
          <h3 className={styles.title}> Твой Отель</h3>
        </Link>
        <div className={styles.header_btn}>
          {authenticated ? <HeadersProfile /> : <HeaderBtnLogin />}
        </div>

        {showModalState && <ModalSiginIn />}
      </div>
    </>
  );
}

export default Header;
