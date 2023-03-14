import React from "react";
import Error from "src/components/Error/Error";
import styles from "./FormSearchClient.module.less";

function FormSearchClient({
  setCheked,
  setOffset,
  setLimit,
  keyPressSubmit,
  onSubmit,
  checked,
  formErrors,
  isLoading
}: {
  setCheked: React.Dispatch<React.SetStateAction<boolean>>;
  setOffset: React.Dispatch<React.SetStateAction<string>>;
  setLimit: React.Dispatch<React.SetStateAction<string>>;
  keyPressSubmit: any;
  onSubmit: any;
  checked: boolean;
  formErrors:string[];
  isLoading:boolean;
}) {
  return (
    <>
      <form className={styles.form}>
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

        <label className={styles.form_label}>
          Активные
          <input
            className={`${styles.form_input} ${styles.limit}`}
            type="checkbox"
            checked={checked}
            onChange={(e) => setCheked(!checked)}
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
      <div className={styles.error}>
        {formErrors && <Error error={formErrors} />}
      </div>
    </>
  );
}

export default FormSearchClient;
