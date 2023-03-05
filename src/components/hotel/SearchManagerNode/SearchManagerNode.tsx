import React from "react";
import uuid from "react-uuid";
import styles from "./SearchManagerNode.module.less";
import format from "date-fns/format";
import { useDeleteManagerReservationMutation } from "src/servises/API/reservationApi";

function SearchManagerNode({ data, refetch }: { data: any; refetch: any }) {
  const [deleteManagerReservation] = useDeleteManagerReservationMutation();

  function remove(id: string) {
    deleteManagerReservation(id);
    refetch()
  }
  return (
    <div className={styles.reservations}>
      <div className={styles.reservations_header}>
        <div className={styles.text_id}>Id пользователя </div>
        <div className={styles.text_hotel}>Отель </div>
        <div className={styles.text_data_start}>Дата заезда </div>
        <div className={styles.text_data_end}>Дата Выезда </div>
        <div className={styles.text_remove}>Удалить </div>
        <button></button>
      </div>
      {data && data.length ? (
        data.map((item: any) => {
          return (
            <div key={uuid()} className={styles.reservations_item}>
              <div className={styles.text_id}>{item.userId}</div>
              <div className={styles.text_hotel}>{item.hotel.title}</div>
              <div className={styles.text_data_start}>
                {format(new Date(item.dateStart), "dd-MM-yyyy")}
              </div>
              <div className={styles.text_data_end}>
                {format(new Date(item.dateEnd), "dd-MM-yyyy")}
              </div>
              <button
                type="button"
                className={styles.btn_close}
                onClick={() => remove(item._id)}
              >
                <span className={styles.icon_cross}></span>
                <span className={styles.visually_hidden}>Close</span>
              </button>
            </div>
          );
        })
      ) : (
        <h3 className={styles.text}>Забронированные номера отсутствуют</h3>
      )}
    </div>
  );
}

export default SearchManagerNode;
