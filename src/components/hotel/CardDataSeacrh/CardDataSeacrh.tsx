import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "src/app/hooks";
import IDataHotelRooms from "src/models/IDataHotelRooms";
import styles from "./CardDataSeacrh.module.less";

function CardDataSeacrh({ item }: { item: IDataHotelRooms }) {
  const navigate = useNavigate();
  const { user, authenticated } = useAppSelector((state) => state.user);

  return (
    <div className={styles.card} id={item.id}>
      <div className={styles.card_body}>
        <img
          className={styles.card_img}
          src={
            process.env.REACT_APP_URL_STATIC +
            `hotel-room/${item.hotel.id}/` +
            item.images[0]
          }
          alt="item.images[0]"
        />
        <div className={styles.card_body_wrapper}>
          <h3 className={styles.card_body_title}>Отель: {item.hotel.title}</h3>
          <p className={styles.card_body_description}>
            Описание: {item.description}
          </p>
          <div className={styles.card_btns}>
            <button
              className={styles.card_btn}
              onClick={() => navigate(`/hotel-room/${item.id}`)}
            >
              Подробнее
            </button>
            {authenticated && user.role === "admin" && (
              <button
                className={styles.card_btn}
                onClick={() => navigate(`/hotel-room/update/${item.id}`)}
              >
                Редактировать
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDataSeacrh;
