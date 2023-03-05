import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Error from "src/components/Error/Error";
import Loader from "src/components/Loader/Loader";
import Sidebar from "src/components/sidebar/Sidebar";
import SliderComponent from "src/components/Slider/SliderComponent";
import { useGetHotelQuery } from "src/servises/API/hotelApi";
import styles from "./Hotel.module.less";

function Hotel() {
  const [formErrors, setFormErrors] = useState<string[]>([]);
  let { id } = useParams();
  const { isLoading, data, error } = useGetHotelQuery(id);

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
      <div className={styles.hotel}>
        {isLoading ? (
          <Loader />
        ) : data ? (
          <>
            <h2 className={styles.title}>Отель {data.title}</h2>
            <p className={styles.text}>О отеле: {data.description} </p>
            <SliderComponent
              images={data.images}
              url={process.env.REACT_APP_URL_STATIC + `hotel/${id}/`}
            />
          </>
        ) : (
          <>
            <h2 className={styles.title}>Jтель </h2>
            <Error error={formErrors} />
          </>
        )}
      </div>
    </div>
  );
}

export default Hotel;
