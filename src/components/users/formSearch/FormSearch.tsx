import React, { KeyboardEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { addDataSearch } from "src/features/userSlice";
import {
  usePostSearchAdminMutation,
  usePostSearchAManagerMutation,
} from "src/servises/API/usersApi";
import styles from "./FormSearch.module.less";

function FormSearch() {
  const dispatch = useAppDispatch();
  const { user, authenticated } = useAppSelector((state) => state.user);
  const [postSearchAdmin, { isLoading }] = usePostSearchAdminMutation();
  const [postSearchAManager, { isLoading: isLoading2 }] =
    usePostSearchAManagerMutation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [offset, setOffset] = useState("");
  const [limit, setLimit] = useState("");
  const [formErrors, setFormErrors] = useState("");

  const keyPressSubmit = (e: KeyboardEvent) =>
    e.key === "Enter" && setTimeout(onSubmit, 0);

  function validateInput(value: string, setFunction: Function) {
    value.trim() === "" ? setFormErrors("") : setFormErrors("");
    let regexp = /^[0-9]+$/;
    if (regexp.test(value)) {
      setFunction(Number(value));
    } else if (value.trim() !== "") {
      setFormErrors("Введите число");
    } else {
      setFunction("");
    }
  }

  async function onSubmit() {
    setFormErrors("");
    try {
      if (authenticated && user.role === "admin") {
        
        let res = await postSearchAdmin({
          email,
          name,
          contactPhone,
          offset,
          limit,
        }).unwrap();

        dispatch(addDataSearch(res));
      }
      if (authenticated && user.role === "manager") {
        let res = await postSearchAManager({
          email,
          name,
          contactPhone,
          offset,
          limit,
        }).unwrap();
        dispatch(addDataSearch(res));
      }
    } catch (err: any) {
      setFormErrors(err);
    }
  }

  return (
    <div>
      <form className={styles.form}>
        <label className={`${styles.form_label} `}>
          <p className={styles.label_text}>Email</p>
          <input
            className={`${styles.form_input} ${styles.search}`}
            type="text"
            placeholder="Поиск..."
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={keyPressSubmit}
            maxLength={25}
          />
        </label>

        <label className={styles.form_label}>
          <p className={styles.label_text}>Имя</p>
          <input
            className={`${styles.form_input} ${styles.search}`}
            type="text"
            placeholder="Поиск..."
            name="name"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={keyPressSubmit}
            maxLength={25}
          />
        </label>

        <label className={styles.form_label}>
          <p className={styles.label_text}>Телефон</p>
          <input
            className={`${styles.form_input} ${styles.search}`}
            type="text"
            placeholder="Поиск..."
            name="contactPhone"
            onChange={(e) => setContactPhone(e.target.value)}
            onKeyDown={keyPressSubmit}
            maxLength={25}
          />
        </label>

        <label className={`${styles.form_label} `}>
          С
          <input
            className={`${styles.form_input} ${styles.offset}`}
            type="text"
            name="offset"
            onChange={(e) => validateInput(e.target.value, setOffset)}
            onKeyDown={keyPressSubmit}
            maxLength={25}
          />
        </label>
        <label className={styles.form_label}>
          Количество
          <input
            className={`${styles.form_input} ${styles.limit}`}
            type="text"
            name="limit"
            onChange={(e) => validateInput(e.target.value, setLimit)}
            onKeyDown={keyPressSubmit}
            maxLength={25}
          />
        </label>
        <button
          className={styles.form_btn}
          disabled={isLoading || isLoading2}
          type="button"
          onClick={onSubmit}
        >
          Поиск
        </button>
      </form>
      <div className={styles.error}>
        {formErrors && <p className={styles.text_error}>{formErrors}</p>}
      </div>
    </div>
  );
}

export default FormSearch;
