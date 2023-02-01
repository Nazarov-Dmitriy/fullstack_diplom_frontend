import styles from "./Headers.module.less";
import { Link } from "react-router-dom";
import React, { useEffect, createRef, useState } from "react";
import ModalSiginIn from "../modalSiginIn/ModalSiginIn";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { addShowModal } from "src/features/modalSlice";
import { useGetSssQuery } from "src/servises/API/usersApi";

function Header() {
  const dispatch = useAppDispatch();
  const { showModalState } = useAppSelector((state) => state.modal);
  const imgRef = createRef<HTMLImageElement>();
  //
  const [ss, setSs] = useState('')
  const { data } = useGetSssQuery(ss);
  console.log(data);
  

  useEffect(() => {
    imgRef.current!.classList.toggle(styles["btn_icons_close"]);
  });

  async function onSubmit(e:React.SyntheticEvent) {
    e.preventDefault()
  } 

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
        <button
            className={styles.btn}
            onClick={() => setSs('sss')}
          >
            Проверка
          </button>
        <div className={styles.header_btn}>
         
          <a href="http://localhost:80/api/sss" onSubmit={e=> onSubmit(e)}>sssssssss</a>
          <button
            className={styles.btn}
            onClick={() => dispatch(addShowModal(true))}
          >
            Войти
          </button>
          <span>
            <img
              ref={imgRef}
              className={styles.btn_icons}
              src="../../assets/icons/shevron.png"
              alt="Test"
              onClick={() =>
                !showModalState
                  ? dispatch(addShowModal(true))
                  : dispatch(addShowModal(false))
              }
            />
          </span>
        </div>
        {showModalState && <ModalSiginIn />}
      </div>
    </>
  );
}

export default Header;
