import React, { KeyboardEvent, useState } from "react";
import styles from "./FormRegisterAdmin.module.less";
import * as yup from "yup";
import uuid from "react-uuid";
import { usePostRegisterAdminUsersMutation } from "src/servises/API/usersApi";

interface IUserRegisterAdmin {
  id: string;
  email: string;
  name: string;
  contactPhone: string;
  role: string;
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
  role: yup.string().required("Роль должна быть выбрана"),
});

function FormRegisterAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [role, setRole] = useState("client");
  const [formErrors, setFormErrors] = useState<string[]>();
  const [postRegisterAdminUsers, { isLoading }] =
    usePostRegisterAdminUsersMutation();
  const [user, setUser] = useState<IUserRegisterAdmin>();

  const keyPressSubmit = (e: KeyboardEvent) =>
    e.key === "Enter" && setTimeout(onSubmit, 0);

  async function onSubmit() {
    await registerSchema
      .validate(
        { email, password, name, contactPhone, role },
        { abortEarly: false }
      )
      .then(async () => {
        try {
          let res = await postRegisterAdminUsers({
            email,
            password,
            name,
            contactPhone,
            role,
          }).unwrap();
          setUser(res);
        } catch (err: any) {
          setFormErrors([]);
          setFormErrors([err.data.error]);
        }
      })
      .catch((e) => setFormErrors(e.errors));
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Создать пользователя</h3>
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

        <label className={styles.form_label}>
          Роль:
          <select onChange={(e) => setRole(e.target.value)} defaultValue={role} className={`${styles.form_input} ${styles.form_select}`}>
            <option value="admin">Администратор</option>
            <option value="manager">Менеджер</option>
            <option value="client">Клиент</option>
          </select>
        </label>

        <button
          className={styles.form_btn}
          disabled={isLoading}
          type="button"
          onClick={onSubmit}
        >
          Зарегистрировать пользователя
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
              Пользователь {user.name} email:{user.email} role:{user.role} успешно зарегистирован
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default FormRegisterAdmin;
