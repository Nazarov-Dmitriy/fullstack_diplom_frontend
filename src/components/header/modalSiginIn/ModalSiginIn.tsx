import React, { createRef, KeyboardEvent, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { usePostLoginMutation } from "src/servises/API/usersApi";
import uuid from "react-uuid";
import styles from "./ModalSiginIn.module.less";
import { useAppDispatch } from "src/app/hooks";
import { addShowModal } from "src/features/modalSlice";
import { isAuthenticated, addUser } from "src/features/userSlice";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Не корректный email")
    .required("Email должен быть заполнен"),
  password: yup
    .string()
    .required("Пароль должно быть заполнен")
    .min(5, "Пароль должен быть больше 5 символов"),
});

function ModalSiginIn() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<string[]>();
  const [showPassword, setShowPassword] = useState(false);
  const [postLogin] = usePostLoginMutation();
  const passInput = createRef<HTMLInputElement>();
  const passForm = createRef<HTMLDivElement>();

  const keyPressSubmit = (e: KeyboardEvent) =>
    e.key === "Enter" && setTimeout(onSubmit, 0);

  async function onSubmit() {
    await loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then(async () => {
        try {
          const result = await postLogin({
            email,
            password,
          }).unwrap();
          if (result.user) {
            dispatch(isAuthenticated(true));
            dispatch(addUser(result.user));
            dispatch(addShowModal(false));
          }
        } catch (error: any) {
          console.log(error);

          if (error.status === 401) {
            setFormErrors(["Не правальный логин или пароль"]);
          } else {
            setFormErrors([error.error]);
          }
        }
      })
      .catch((e) => {
        setFormErrors(e.errors);
      });
  }

  async function onShowPassword() {
    showPassword
      ? passInput.current!.setAttribute("type", "password")
      : passInput.current!.setAttribute("type", "text");
    setShowPassword(!showPassword);
  }

  return (
    <div className={styles.contaner_form} ref={passForm} id="modal_form">
      <div className={styles.modal_header}>
        <span>
          <a className={styles.modal_link} href="!#" onClick={onSubmit}>
            Войти
          </a>
        </span>
        <p className={styles.modal_text}>или</p>
        <span>
          <Link
            to="/register"
            className={styles.modal_link}
            onClick={() => dispatch(addShowModal(false))}
          >
            Зарегистрироваться
          </Link>
        </span>
      </div>
      <form className={styles.modal_form}>
        <input
          className={styles.modal_input}
          type="text"
          placeholder="Введити логин"
          name="login"
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={keyPressSubmit}
        />
        <label className={styles.modal_label}>
          <input
            className={styles.modal_input}
            type="password"
            placeholder="Введите пароль"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={keyPressSubmit}
            ref={passInput}
          />
          {showPassword ? (
            <img
              className={styles.modal_icon_pass}
              src="../../assets/icons/pass-hidden.png"
              alt="pass show"
              onClick={onShowPassword}
            />
          ) : (
            <img
              className={styles.modal_icon_pass}
              src="../../assets/icons/pass-show.png"
              alt="pass show"
              onClick={onShowPassword}
            />
          )}
        </label>
        <button className={styles.modal_btn} type="button" onClick={onSubmit}>
          Войти
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
    </div>
  );
}

export default ModalSiginIn;
