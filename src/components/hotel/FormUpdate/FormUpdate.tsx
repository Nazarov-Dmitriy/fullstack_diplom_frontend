import React from "react";
import styles from "./FormUpdate.module.less";
import {
  dragStartEnd,
  dragStartHandle,
  dragStartOver,
  dropHandler,
} from "src/utils/DragAndDrop";
import { onChange, removeFile } from "src/utils/hotelFuntion";

import uuid from "react-uuid";

function FormUpdate({
  data,
  setDescription,
  imageModal,
  setImageModal,
  images,
  setImages,
  setImageFiles,
  imageFiles,
  modalImage,
  isLoading,
  onSubmit,
  url,
  components,
  setTitle,
}: {
  data: any;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  imageModal: string | null;
  setImageModal: React.Dispatch<React.SetStateAction<string | null>>;
  images: any[];
  setImages: React.Dispatch<React.SetStateAction<any[]>>;
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imageFiles: File[];
  modalImage: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  isLoading: boolean;
  onSubmit: () => Promise<void>;
  url: string;
  components?: string;
  setTitle?: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <form className={styles.form}>
      {components === " hotel" && (
        <label className={styles.form_label}>
          Название
          <input
            className={styles.form_input}
            type="text"
            placeholder="Название отеля"
            defaultValue={data?.title || ""}
            onChange={(e) => setTitle && setTitle(e.target.value)}
            maxLength={25}
          />
        </label>
      )}
      <label className={`${styles.form_label} ${styles.form_textarea}`}>
        Описание
        <textarea
          className={`${styles.form_textarea} ${styles.form_input}`}
          defaultValue={data?.description || ""}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      {imageModal && (
        <div className={styles.image_wraper_modal} id="modal-img">
          <img
            src={imageModal}
            className={styles.image_modal}
            alt="modal-img"
          />
          <div className={styles.image_btn_wrap}>
            <button
              onClick={() => setImageModal("")}
              className={styles.image_btn}
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}

      <div className={styles.photo_preview}>
        <div className={styles.images_list}>
          {images &&
            images.map((image, idx) => {
              return (
                <div
                  key={uuid()}
                  className={styles.image_wraper}
                  id={image.name && image.name ? image.name : image}
                  draggable="true"
                  onDragStart={(e) => dragStartHandle(e, idx)}
                  onDragLeave={(e) => dragStartEnd(e)}
                  onDragEnd={(e) => dragStartEnd(e)}
                  onDragOver={(e) => dragStartOver(e)}
                  onDrop={(e) =>
                    dropHandler(
                      e,
                      idx,
                      images,
                      setImages,
                      setImageFiles,
                      imageFiles
                    )
                  }
                >
                  {idx === 0 && (
                    <p className={styles.title_img}>Главное фото</p>
                  )}
                  <img
                    src={image.url ? image.url : url + image}
                    className={styles.image_item}
                    alt={image.name ? image.name : image}
                    onClick={(e) => modalImage(e)}
                  />
                  <div className={styles.image_btn_wrap}>
                    <button
                      type="button"
                      onClick={() =>
                        removeFile(
                          image.name ? image.name : image,
                          setImages,
                          setImageFiles
                        )
                      }
                      id={image.name ? image.name : image}
                      className={styles.image_btn}
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <label className={styles.input_file}>
        <input
          type="file"
          multiple
          onChange={(e) => onChange(e, imageFiles, images, setImageFiles)}
          disabled={images.length >= 10 ? true : false}
          accept=".png, .jpg, .jpeg, .webp"
        />
        <span className={styles.input_file_btn}>Выберите файл</span>
        <span className={styles.input_file_text}>Максимум 10мб</span>
        {imageFiles.length <= 10 ? (
          <span className={styles.input_file_text}>
            Максимум 10 файлов {images.length}
          </span>
        ) : (
          <span className={styles.input_file_text} style={{ color: "red" }}>
            Максимум 10 файлов, количество файлов {images.length}
          </span>
        )}
      </label>

      <button
        className={styles.form_btn}
        disabled={isLoading}
        type="button"
        onClick={onSubmit}
      >
        Редактировать номер
      </button>
    </form>
  );
}

export default FormUpdate;
