import React, { useState, KeyboardEvent, useEffect } from "react";
import Sidebar from "src/components/sidebar/Sidebar";
import styles from "./AddHotel.module.less";
import { usePostAddHotelMutation } from "src/servises/API/hotelApi";
import { hotelAddSchema } from "src/utils/validateShemeHotel";
import { useAppSelector } from "src/app/hooks";
import Error from "src/components/Error/Error";

interface IHotel {
  id: string;
  title: string;
  description: string;
}

function AddHotel() {
  const { user, authenticated } = useAppSelector((state) => state.user);
  const [title, setTitlel] = useState("");
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [hotel, setHotel] = useState<IHotel>();
  const [postAddHotel, { isLoading, error, isSuccess }] =
    usePostAddHotelMutation();

  useEffect(() => {
    if (error) {
      let err: any = error;
      setFormErrors([err.data?.message || err.error]);
    } else {
      setFormErrors([]);
    }
  }, [error]);

  const keyPressSubmit = (e: KeyboardEvent) =>
    e.key === "Enter" && setTimeout(onSubmit, 0);

  async function onSubmit() {
    await hotelAddSchema
      .validate({ title, description }, { abortEarly: false })
      .then(async () => {
        try {
          let res = await postAddHotel({
            title,
            description,
          }).unwrap();
          setHotel(res);
        } catch (err: any) {
          setFormErrors([]);
          setFormErrors([err.data.error]);
        }
      })
      .catch((e) => setFormErrors(e.errors));
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.wraper}>
        <h3 className={styles.title}>Создать отель</h3>
        {authenticated && user.role === "admin" ? (
          <form className={styles.form}>
            <label className={styles.form_label}>
              Название
              <input
                className={styles.form_input}
                type="text"
                placeholder="Название отеля"
                onChange={(e) => setTitlel(e.target.value)}
                onKeyDown={keyPressSubmit}
                maxLength={25}
              />
            </label>

            <label className={styles.form_label}>
              Описание
              <input
                className={styles.form_input}
                type="text"
                placeholder="Описание отель"
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={keyPressSubmit}
              />
            </label>

            <button
              className={styles.form_btn}
              disabled={isLoading}
              type="button"
              onClick={onSubmit}
            >
              Создать отель
            </button>
          </form>
        ) : (
          <h3>Для продолжения работы требуеться авторизация </h3>
        )}
        <div className={styles.error}>
          {formErrors && <Error error={formErrors} />}
        </div>
        <div className={styles.hotel}>
          {isSuccess && hotel && (
            <p className={styles.text_hotel}>
              Отель {hotel.title} успешно зарегистирован
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddHotel;
