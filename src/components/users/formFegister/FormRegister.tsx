import React, { KeyboardEvent, useState } from "react";
import styles from "./FormRegister.module.less";
import * as yup from "yup";
import uuid from "react-uuid";
import { usePostRegisterMutation } from "src/servises/API/usersApi";
import { Link } from "react-router-dom";

interface IUser {
  id: string;
  email: string;
  name: string;
}

const registerSchema = yup.object({
  email: yup
    .string()
    .email("Не корректный email")
    .required("Email должен быть заполнен"),
  password: yup
    .string()
    .required("Пароль должно быть заполнен")
    .min(5, "Пароль должен быть больше 5 символов"),
  name: yup
    .string()
    .min(2, "Имя должно быть больше 2 символов!")
    .max(50, "Имя должно быть меньше 50 символов!")
    .required("Имя должно быть заполнено"),
  contactPhone: yup
    .string()
    .required("Телефон должно быть заполнено")
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^([\+]?[7|8][\s-(]?[9][0-9]{2}[\s-)]?)?([\d]{3})[\s-]?([\d]{2})[\s-]?([\d]{2})$/g,
      "Не корректный номер телефона"
    ),
});

function FormRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [formErrors, setFormErrors] = useState<string[]>();
  const [postRegister, { isLoading }] = usePostRegisterMutation();
  const [user, setUser] = useState<IUser>();

  const keyPressSubmit = (e: KeyboardEvent) =>
    e.key === "Enter" && setTimeout(onSubmit, 0);

  async function onSubmit() {
    await registerSchema
      .validate({ email, password, name, contactPhone }, { abortEarly: false })
      .then(async () => {
        try {
          let res = await postRegister({
            email,
            password,
            name,
            contactPhone,
          }).unwrap();
          setUser(res);
        } catch (err:any) {
          setFormErrors([]);
          setFormErrors([err.data.error])
        }
      })
      .catch((e) => setFormErrors(e.errors));
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Регистрация</h3>
      <form className={styles.form}>
        <label className={styles.form_label}>
          Email
          <input
            className={styles.form_input}
            type="text"
            placeholder="Введите Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={keyPressSubmit}
            maxLength={25}
          />
        </label>

        <label className={styles.form_label}>
          Пароль
          <input
            className={styles.form_input}
            type="password"
            placeholder="Введите Пароль"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={keyPressSubmit}
            maxLength={25}
          />
        </label>

        <label className={styles.form_label}>
          Имя
          <input
            className={styles.form_input}
            type="text"
            placeholder="Введите Имя"
            name="name"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={keyPressSubmit}
            maxLength={25}
          />
        </label>

        <label className={styles.form_label}>
          Телефон
          <input
            className={styles.form_input}
            type="text"
            placeholder="Введите контактный телефон"
            name="contactPhone"
            onChange={(e) => setContactPhone(e.target.value)}
            onKeyDown={keyPressSubmit}
            maxLength={25}
          />
        </label>

        <button
          className={styles.form_btn}
          disabled={isLoading}
          type="button"
          onClick={onSubmit}
        >
          Зарегистрироваться
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
      <div className={styles.user}>
        {user && (
          <>
            <p className={styles.text_user}>
              Пользователь {user.name} email:{user.email} успешно зарегистирован
            </p>
            <p className={styles.text_user}>
              Перейти на{" "}
              <Link to="/" className={styles.link}>
                Главную страницу{" "}
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default FormRegister;
