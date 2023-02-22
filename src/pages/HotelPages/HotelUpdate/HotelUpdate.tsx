import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import uuid from "react-uuid";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import Loader from "src/components/Loader/Loader";
import Sidebar from "src/components/sidebar/Sidebar";
import { addShowModalImage } from "src/features/hotelSlice";
import {
  useGetHotelAdminQuery,
  useUpdateHotelMutation,
} from "src/servises/API/hotelApi";
import styles from "./HotelUpdate.module.less";
import { dataUrlImage, onChange, removeFile } from "src/utils/hotelFuntion";
import {
  dragStartEnd,
  dragStartHandle,
  dragStartOver,
  dropHandler,
} from "src/utils/DragAndDrop";
import { validationSchema } from "src/utils/validateShemeHotel";

function HotelUpdate() {
  let { id } = useParams();
  const { user, authenticated } = useAppSelector((state) => state.user);
  const { showModalImageState } = useAppSelector((state) => state.hotel);
  const dispatch = useAppDispatch();
  const { isLoading, data, error, refetch } = useGetHotelAdminQuery(id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState<string>();
  const [validationForm, setValidationForm] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [imageModal, setImageModal] = useState<string | null>("");
  const [flag, setFlagl] = useState(true);
  const [updateHotel, { isSuccess }] = useUpdateHotelMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  //Обрабока ошибок с сервера
  useEffect(() => {
    flag && setFlagl(!flag);
    if (error) {
      let err: any = error;
      setFormErrors(err.data?.message);
    } else {
      setFormErrors("");
    }
  }, [error, flag]);

  //Сохранение данных с сервера
  useEffect(() => {
    data && setTitle(data.title);
    data && setDescription(data.description);
    data && data.images[0] !== "" && setImages(data.images);
  }, [data]);

  //Получение data url для превью
  useEffect(() => {
    dataUrlImage(imageFiles, images, setImages, setFormErrors);
  }, [imageFiles, images]);

  //useEffect работы с модальным окном
  useEffect(() => {
    showModalImageState === false && setImageModal("");
    imageModal === "" && dispatch(addShowModalImage(false));
  }, [dispatch, imageModal, showModalImageState]);

  //Добавление data url для фотографии модального окна
  function modalImage(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    const target = e.target as HTMLImageElement;
    setImageModal(target.getAttribute("src"));
    dispatch(addShowModalImage(true));
  }

  //Отправка и валидация формы
  async function onSubmit() {
    setValidationForm(true);
    await validationSchema
      .validate(
        { title, description, imageFiles, images },
        { abortEarly: false }
      )
      .then(async () => {
        try {
          setValidationForm(false);
          setFormErrors("");
          await updateHotel({
            id: id ? id : "",
            body: {
              title,
              description,
              imageFiles,
              imagesSrc: images.map((item): any => {
                return typeof item === "string" ? item : item.name;
              }),
            },
          }).unwrap();
          refetch();
        } catch (err: any) {
          setValidationForm(false);
          setFormErrors("");
          setFormErrors(err?.data?.error);
        }
      })
      .catch((e) => {
        setFormErrors(e.errors);
        setValidationForm(false);
      });
  }

  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.hotel}>
          <h2 className={styles.title}>Редактировать отель</h2>
          {authenticated && user.role === "admin" ? (
            isLoading ? (
              <Loader />
            ) : (
              <form className={styles.form}>
                <label className={styles.form_label}>
                  Название
                  <input
                    className={styles.form_input}
                    type="text"
                    placeholder="Название отеля"
                    defaultValue={data?.title || ""}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={25}
                  />
                </label>

                <label
                  className={`${styles.form_label} ${styles.form_textarea}`}
                >
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
                              dropHandler(e, idx, images, setImages)
                            }
                          >
                            {idx === 0 && (
                              <p className={styles.title_img}>Главное фото</p>
                            )}
                            <img
                              src={
                                image.url
                                  ? image.url
                                  : process.env.REACT_APP_URL_STATIC +
                                    `hotel/${id}/` +
                                    image
                              }
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
                    onChange={(e) =>
                      onChange(e, imageFiles, images, setImageFiles)
                    }
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
                    <span
                      className={styles.input_file_text}
                      style={{ color: "red" }}
                    >
                      Максимум 10 файлов, количество файлов {images.length}
                    </span>
                  )}
                </label>

                <button
                  className={styles.form_btn}
                  disabled={validationForm}
                  type="button"
                  onClick={onSubmit}
                >
                  Редактировать
                </button>
              </form>
            )
          ) : (
            <h3>Для продолжения работы требуеться авторизация </h3>
          )}
          <div className={styles.error}>
            {formErrors && Array.isArray(formErrors) ? (
              formErrors.map((item) => (
                <p key={uuid()} className={styles.text_error}>
                  {item}
                </p>
              ))
            ) : (
              <p className={styles.text_error}>{formErrors}</p>
            )}
          </div>
          <div>{isSuccess && <p>Данные успешно обновлены</p>}</div>
        </div>
      </div>
    </>
  );
}

export default HotelUpdate;
