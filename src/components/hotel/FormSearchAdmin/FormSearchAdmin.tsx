import React from "react";
import styles from "./FormSearchAdmin.module.less";

function FormSearchAdmin({
  setId,
  setOffset,
  setLimit,
  keyPressSubmit,
  onSubmit,
  isLoading,
  components,
  setTitle,
}: {
  setId?: React.Dispatch<React.SetStateAction<string>>;
  setOffset: React.Dispatch<React.SetStateAction<string>>;
  setLimit: React.Dispatch<React.SetStateAction<string>>;
  keyPressSubmit: any;
  onSubmit: any;
  isLoading: boolean;
  components?: string;
  setTitle?: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <form className={styles.form}>
      {components === "hotel" ? (
        <label className={`${styles.form_label} ${styles.form_label_title} `}>
          <p className={styles.label_text}>Название</p>
          <input
            className={styles.form_input}
            type="text"
            placeholder="Поиск..."
            onChange={(e) => setTitle && setTitle(e.target.value.trim())}
            onKeyDown={keyPressSubmit}
          />
        </label>
      ) : (
        <label className={`${styles.form_label} ${styles.form_label_title} `}>
          <p className={styles.label_text}>Id Отеля</p>
          <input
            className={styles.form_input}
            type="text"
            placeholder="Поиск..."
            onChange={(e) =>setId && setId(e.target.value)}
            onKeyDown={keyPressSubmit}
          />
        </label>
      )}

      <label className={`${styles.form_label} `}>
        <p className={styles.label_text}>Поиск с</p>
        <input
          className={`${styles.form_input} ${styles.offset}`}
          type="text"
          onChange={(e) => setOffset(e.target.value)}
          onKeyDown={keyPressSubmit}
        />
      </label>

      <label className={styles.form_label}>
        Количество
        <input
          className={`${styles.form_input} ${styles.limit}`}
          type="text"
          onChange={(e) => setLimit(e.target.value)}
          onKeyDown={keyPressSubmit}
        />
      </label>

      <button
        className={styles.form_btn}
        disabled={isLoading}
        type="button"
        onClick={(e) => onSubmit(e)}
      >
        Поиск
      </button>
    </form>
  );
}

export default FormSearchAdmin;
