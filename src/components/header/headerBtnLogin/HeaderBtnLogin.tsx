import React, {useEffect,createRef} from "react";
import { addShowModal } from "src/features/modalSlice";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import styles from "./HeaderBtnLogin.module.less";

function HeaderBtnLogin() {
  const dispatch = useAppDispatch();
  const { showModalState } = useAppSelector((state) => state.modal);
  const imgRef = createRef<HTMLImageElement>();

  useEffect(() => {
    imgRef.current!.classList.toggle(styles["btn_icons_close"]);
  });

  return (
    <>
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
    </>
  );
}

export default HeaderBtnLogin;
