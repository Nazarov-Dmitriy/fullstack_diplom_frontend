import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import { useAppSelector } from "src/app/hooks";
import Error from "src/components/Error/Error";
import Loader from "src/components/Loader/Loader";
import Sidebar from "src/components/sidebar/Sidebar";
import {
  useDeleteReservationMutation,
  useGetReservationClientQuery,
} from "src/servises/API/reservationApi";
import styles from "./UserReservations.module.less";
import format from "date-fns/format";


function UserReservations() {
  const { user, authenticated } = useAppSelector((state) => state.user);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const { isSuccess, data, error, isLoading, refetch } =
    useGetReservationClientQuery(user.id);
  const [deleteReservation] = useDeleteReservationMutation();

  function remove(id: string) {
    deleteReservation(id);
    refetch();
  }

  useEffect(()=>{
    refetch()
  },[refetch])

  useEffect(() => {
    if (error) {
      let err: any = error;
      error && setFormErrors([err.data?.message || err.error]);
    } else {
      setFormErrors([]);
    }
  }, [error]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.wpaperr}>
        <h2 className={styles.title}>Мои брони</h2>
        {authenticated && user.role === "client" ? (
          isLoading ? (
            <Loader />
          ) : isSuccess ? (
            <div className={styles.reservations}>
              <div className={styles.reservations_header}>
                <div className={styles.text_hotel}>Отель </div>
                <div className={styles.text_data_start}>Дата заезда </div>
                <div className={styles.text_data_end}>Дата Выезда </div>
                <div className={styles.text_remove}>Удалить </div>
                <button></button>
              </div>
              {data.length > 0 ? (
                data.map((item: any) => {
                  return (
                    <div key={uuid()} className={styles.reservations_item}>
                      <div className={styles.text_hotel}>
                        {item.hotel.title}
                      </div>
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
          ) : (
            <>
              <Error error={formErrors} />
            </>
          )
        ) : (
          <h3>Для продолжения работы требуеться авторизация </h3>
        )}
      </div>
    </div>
  );
}

export default UserReservations;
