import React, { useState } from "react";
import { useAppSelector } from "src/app/hooks";
import { usePostSupportClientMutation } from "src/servises/API/supportApi";
import styles from "./CreateSupportClient.module.less";

function CreateSupportClient() {
  const [text, setText] = useState("");
  const [theme, setTheme] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [postSupportClient, { isSuccess }] = usePostSupportClientMutation();
  const { user } = useAppSelector((state) => state.user);
  function onSubmit() {
    setFormErrors("");
    if (text.length > 0 && theme.length > 0) {
      postSupportClient({ user: user.id, text, theme });
    } else {
      setFormErrors("Сообщенние не должно быть пустым ");
    }
  }

  return (
    <div className={styles.wraper}>
      <div>
        <h3>Тема обращения</h3>
        <input
          className={styles.textarea}
          onChange={(e) => setTheme(e.target.value.trim())}
        />
      </div>
      <div>
        <h3>Текст обращения</h3>
        <textarea
          className={styles.textarea}
          onChange={(e) => setText(e.target.value.trim())}
        />
      </div>
      <div>
        <button className={styles.btn} type="button" onClick={onSubmit}>
          Создать обращение в техподдержку
        </button>
      </div>
      <div className={styles.error}>
        {formErrors && <p className={styles.text_error}>{formErrors}</p>}
      </div>
      {isSuccess && <p>Обращение успешно зарегистрированно</p>}
    </div>
  );
}

export default CreateSupportClient;
