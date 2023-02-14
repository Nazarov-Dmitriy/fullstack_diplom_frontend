import React, { createRef, SyntheticEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { addShowModalImage } from "src/features/hotelSlice";
import { addShowModal } from "src/features/modalSlice";
import styles from "./Page.module.less";

type PageProps = {
  children: React.ReactNode;
};

const Page = (props: PageProps) => {
  const { showModalState } = useAppSelector((state) => state.modal);
  const { showModalImageState } = useAppSelector((state) => state.hotel);
  const divPage = createRef<HTMLDivElement>();
  const dispatch = useAppDispatch();

  const onModalClose = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest("#modal_form") === null && showModalState) {
      dispatch(addShowModal(false));
    }

    if (target.closest("#modal-img") === null && showModalImageState) {
      dispatch(addShowModalImage(false));
    }
  };

  useEffect(() => {
    showModalImageState
      ? divPage.current?.classList.add(styles["page_mask"])
      : divPage.current?.classList.remove(styles["page_mask"]);
  }, [divPage, showModalImageState]);

  return (
    <div className={styles.page} onClick={(e) => onModalClose(e)}>
      <div ref={divPage}></div>
      {props.children}
    </div>
  );
};

export default Page;
