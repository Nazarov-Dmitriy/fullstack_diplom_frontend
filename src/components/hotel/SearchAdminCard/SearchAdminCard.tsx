import React from "react";
import { useNavigate } from "react-router-dom";
import ISearchAdmin from "src/models/ISearchAdmin";
import styles from "./SearchAdminCard.module.less";

function SearchAdminCard({ id, title, description, search }: ISearchAdmin) {
  const navigate = useNavigate();

  const onRidirectUpdate = (id: string) => {
    navigate(`/hotel/update/${id}`);
  };

  const onRidirectAddRoom = (id: string) => {
    navigate(`/add-hotel-room/${id}`);
  };

  const onRidirectUpdateRoom = (id: string) => {
    navigate(`/hotel-room/update/${id}`);
  };

  return (
    <div className={styles.card} id={id}>
      {!search ? (
        <p className={styles.title}> Отель: {title}</p>
      ) : (
        <p className={` ${styles.title_id}`}> Id комнаты: {id}</p>
      )}
      <p className={styles.description}>
        Описание:
        {description.length < 30
          ? description
          : description.slice(0, 30) + "..."}
      </p>
      {!search ? (
        <>
          <div>
            <button className={styles.btn} onClick={() => onRidirectUpdate(id)}>
              Редактировать
            </button>
          </div>

          <div>
            <button
              className={styles.btn}
              onClick={() => onRidirectAddRoom(id)}
            >
              Добавить номер
            </button>
          </div>
        </>
      ) : (
        <div>
          <button className={styles.btn} onClick={() => onRidirectUpdateRoom(id)}>
            Редактировать
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchAdminCard;
