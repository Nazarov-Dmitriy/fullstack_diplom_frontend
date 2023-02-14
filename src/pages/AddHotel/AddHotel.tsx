import React, { useState, KeyboardEvent } from "react";
import Sidebar from "src/components/sidebar/Sidebar";
import styles from "./AddHotel.module.less";
import * as yup from "yup";
import uuid from "react-uuid";
import { usePostAddHotelMutation } from "src/servises/API/hotelApi";

interface IHotel {
  id: string;
  title: string;
  description: string;
}

const hotelSchema = yup.object({
  title: yup
    .string()
    .required("Название должно быть заполненно")
    .min(5, "Пароль должен быть больше 6 символов"),
  description: yup
    .string()
    .required("Описание должно быть заполненно")
    .min(6, "Пароль должен быть больше 6 символов"),
});

function AddHotel() {
  const [title, setTitlel] = useState("");
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState<string[]>();
  const [hotel, setHotel] = useState<IHotel>();
  const [postAddHotel, { isLoading }] = usePostAddHotelMutation();


  const keyPressSubmit = (e: KeyboardEvent) =>
    e.key === "Enter" && setTimeout(onSubmit, 0);

  async function onSubmit() {
    await hotelSchema
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
      <Sidebar/>
      <div className={styles.wraper}>
        <h3 className={styles.title}>Создать отель</h3>
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
        <div className={styles.error}>
          {formErrors! &&
            formErrors!.map((err: string) => (
              <p className={styles.text_error} key={uuid()}>
                {err}
              </p>
            ))}
        </div>
        <div className={styles.hotel}>
          {hotel && (
            <>
              <p className={styles.text_hotel}>
                Отель {hotel.title} успешно зарегистирован
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddHotel;
