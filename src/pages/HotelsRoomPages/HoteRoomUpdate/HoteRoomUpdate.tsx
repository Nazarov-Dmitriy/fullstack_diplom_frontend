import React, { useState, useEffect } from "react";
import Sidebar from "src/components/sidebar/Sidebar";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { useParams } from "react-router-dom";
import { dataUrlImage, onChange, removeFile } from "src/utils/hotelFuntion";
import { addShowModalImage } from "src/features/hotelSlice";
import {
  dragStartEnd,
  dragStartHandle,
  dragStartOver,
  dropHandler,
} from "src/utils/DragAndDrop";
import styles from "./HoteRoomUpdate.module.less";
import Loader from "src/components/Loader/Loader";
import uuid from "react-uuid";
import { hotelRoomAddSchema } from "src/utils/validateShemeHotel";
import {
  useGetHotelRoomQuery,
  useUpdateHotelRoomMutation,
} from "src/servises/API/hotelApi";
import FormUpdate from "src/components/hotel/FormUpdate/FormUpdate";
import Error from "src/components/Error/Error";

function HoteRoomUpdate() {
  let { id } = useParams();
  const { showModalImageState } = useAppSelector((state) => state.hotel);
  const { user, authenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [imageModal, setImageModal] = useState<string | null>("");
  const { isLoading, data, error, refetch } = useGetHotelRoomQuery(id);
  const [postUpdateHotelRoom, { isSuccess, isLoading: isLoading2 }] =
    useUpdateHotelRoomMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  //   Обрабока ошибок с сервера
  useEffect(() => {
    if (error) {
      let err: any = error;
      setFormErrors([err.data?.message]);
    } else {
      setFormErrors([]);
    }
  }, [error]);

  useEffect(() => {
    data && setDescription(data.description);
    data && data.images[0] !== "" && setImages(data.images);
  }, [data]);

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

  // Отпрака формы
  async function onSubmit() {
    await hotelRoomAddSchema
      .validate({ description, imageFiles, images }, { abortEarly: false })
      .then(async () => {
        try {
          setFormErrors([]);
          await postUpdateHotelRoom({
            id: id ? id : "",
            hotelId: data.hotel.id,
            description,
            imageFiles,
            images: images.map((item): any => {
              return typeof item === "string" ? item : item.name;
            }),
          }).unwrap();
        } catch (err: any) {
          setFormErrors([]);
          setFormErrors(err?.data?.error);
        }
      })
      .catch((e) => {
        setFormErrors([e.errors]);
      });
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.wraper}>
        <h3 className={styles.title}>Редактировать номер отеля</h3>
        {/* {authenticated && user.role === "admin" ? (
          isLoading ? (
            <Loader />
          ) : ( */}
        <FormUpdate
          data={data}
          setDescription={setDescription}
          imageModal={imageModal}
          setImageModal={setImageModal}
          images={images}
          setImages={setImages}
          setImageFiles={setImageFiles}
          imageFiles={imageFiles}
          modalImage={modalImage}
          isLoading={isLoading2}
          onSubmit={onSubmit}
        />
        {/* <form className={styles.form}>
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
                            src={
                              image.url
                                ? image.url
                                : process.env.REACT_APP_URL_STATIC +
                                  `hotel-room/${data.hotel.id}/` +
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
                Редактировать номер
              </button>
            </form> */}
        {/* )
        ) : (
          <h3>Для продолжения работы требуеться авторизация </h3>
        )} */}
        <div className={styles.error}>
          {formErrors && <Error error={formErrors} />}
        </div>
        <div>
          {isSuccess && formErrors.length === 0 && (
            <p>данные успешно изменены</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HoteRoomUpdate;
