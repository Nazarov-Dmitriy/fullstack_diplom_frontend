import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "src/components/Loader/Loader";
import Sidebar from "src/components/sidebar/Sidebar";
import SliderComponent from "src/components/Slider/SliderComponent";
import { useGetHotelRoomQuery } from "src/servises/API/hotelRoomApi";
import styles from "./HotelRoom.module.less";
import { useNavigate } from "react-router-dom";
import Error from "src/components/Error/Error";
import CalendarComponent from "src/components/Calendar/Calendar";
import {
  useGetReservationHotelRoomQuery,
  usePostAddReservationMutation,
} from "src/servises/API/reservationApi";
import { useAppSelector } from "src/app/hooks";
import format from "date-fns/format";

function HotelRoom() {
  const navigate = useNavigate();
  let { id } = useParams();
  const { user, authenticated } = useAppSelector((state) => state.user);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const { isLoading, data, error } = useGetHotelRoomQuery(id);
  const {
    isSuccess: isSuccessReservation,
    data: dataReservation,
    error: errorReservation,
    refetch, 
    isFetching,
  } = useGetReservationHotelRoomQuery(id);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [
    postAddReservation,
    { isSuccess: isSuccessAddReservation, error: errorPost, data: dataPost },
  ] = usePostAddReservationMutation();

  useEffect(() => {
    if (error) {
      let err: any = error;
      error && setFormErrors([err.data?.message || err.error]);
    } else if (errorPost) {
      let errPost: any = errorPost;
      setFormErrors([errPost.data?.message]);
      setStartDate(null);
      setEndDate(null);
    } else if (errorReservation) {
      let errReservation: any = errorReservation;
      setFormErrors([errReservation.data?.message]);
      setStartDate(null);
      setEndDate(null);
    } else {
      setFormErrors([]);
    }
  }, [error, errorPost, errorReservation]);

  useEffect(() => {
    setStartDate(null);
    setEndDate(null);
    refetch();
  }, [isSuccessAddReservation, refetch]);

  async function onSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setFormErrors([]);
    if (startDate && endDate && user.role === "client" && authenticated) {
      await postAddReservation({
        userId: user.id,
        hotel: data.hotel.id,
        roomId: data._id,
        dateStart: startDate,
        dateEnd: endDate,
      });
    } else {
      setFormErrors(["Укажите дату заезда и выезда"]);
    }
  }
 
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.hotel_room}>
        {isLoading ? (
          <Loader />
        ) : data ? (
          <>
            <h2 className={styles.title}>Комнати отеля {data.hotel.title}</h2>
            <p className={styles.text}>О отеле: {data.hotel.description} </p>
            <p className={styles.text}>Описание номера: {data.description} </p>
            <SliderComponent
              images={data.images}
              url={
                process.env.REACT_APP_URL_STATIC +
                `hotel-room/${data.hotel.id}/`
              }
            />
            <div>
              {isSuccessReservation && !isFetching && (
                <CalendarComponent
                  setStartDate={setStartDate}
                  startDate={startDate}
                  setEndDate={setEndDate}
                  endDate={endDate}
                  reservations={dataReservation}
                />
              )}
            </div>
            <div className={styles.celender_error}>
              <Error error={formErrors} />
            </div>
            <div className={styles.card_btns}>
              <button
                className={styles.card_btn}
                onClick={() => navigate(`/hotel/${data.hotel.id}`)}
              >
                Подробнее о отеле
              </button>
              <button
                className={styles.card_btn}
                onClick={(e) => onSubmit(e)}
                disabled={user.role !== "client" || !authenticated}
              >
                Забранировать
              </button>
            </div>
            <div>
              {dataPost && (
                <p>
                  {`
                    ${user.name} вы успешно забранировали в отеле ${
                    dataPost.hotel.title
                  } комнату с 
                    ${format(new Date(dataPost.dateStart), "dd-MM-yyyy")} по
                    ${format(new Date(dataPost.dateEnd), "dd-MM-yyyy")}
                    `}
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className={styles.title}>Комнати отеля </h2>
            <Error error={formErrors} />
          </>
        )}
      </div>
    </div>
  );
}

export default HotelRoom;
