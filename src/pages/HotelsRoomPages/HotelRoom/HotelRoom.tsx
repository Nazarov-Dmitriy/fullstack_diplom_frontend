import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "src/components/Loader/Loader";
import Sidebar from "src/components/sidebar/Sidebar";
import SliderComponent from "src/components/Slider/SliderComponent";
import { useGetHotelRoomQuery } from "src/servises/API/hotelRoomApi";
import styles from "./HotelRoom.module.less";
import { useNavigate } from "react-router-dom";
import Error from "src/components/Error/Error";

function HotelRoom() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const { isLoading, data, error } = useGetHotelRoomQuery(id);

  useEffect(() => {
    if (error) {
      let err: any = error;
      setFormErrors([err.data?.message || err.error]);
    } else {
      setFormErrors([]);
    }
  }, [error]);

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
            <div className={styles.card_btns}>
              <button
                className={styles.card_btn}
                onClick={() => navigate(`/hotel/${data.hotel.id}`)}
              >
                Подробнее о отеле
              </button>
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
