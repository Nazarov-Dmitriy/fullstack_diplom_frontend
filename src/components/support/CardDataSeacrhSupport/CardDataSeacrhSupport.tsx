import { format } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/app/hooks";
import { addSupportRequst } from "src/features/supportRequstSlice";
import IDataSupportRequest from "src/models/IDataSupportRequest";
import styles from "./CardDataSeacrhSupport.module.less";

function CardDataSeacrhSupport({ item }: { item: IDataSupportRequest }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createdAt = format(new Date(item.createdAt), "dd-MM-yyyy:HH:MM");

  return (
    <div className={styles.wraper}>
      <div className={styles.card} id={item.id}>
        <div className={styles.card_body}>
          <p className={styles.card_body_description}>Тема: {item.theme}</p>
          <p className={styles.card_body_description}>Создано: {createdAt}</p>
          <div className={styles.content}>
            {item.hasNewMessages && <span className={styles.countMe}>1</span>}
            <img
              className={styles.card_body_img}
              src="../../../assets/icons/message.png"
              alt="icon message"
            />
          </div>
        </div>
        <div className={styles.card_btns}>
          <button
            className={styles.card_btn}
            onClick={() => {
              dispatch(addSupportRequst(item));
              navigate(`/support-chat/${item.id}`);
            }}
          >
            Подробнее
          </button>
        </div>
      </div>
      {item.client && (
        <div className={styles.user_info}>
          <div className={styles.user_desciption}>
            Id клиента: {item.client?.id}
          </div>
          <div className={styles.user_desciption}>
            Имя клиента: {item.client?.name}
          </div>
          <div className={styles.user_desciption}>
            Email клиента: {item.client?.email}
          </div>
          <div className={styles.user_desciption}>
            Контактный телефон клиента: {item.client?.contactPhone}
          </div>
        </div>
      )}
    </div>
  );
}

export default CardDataSeacrhSupport;
