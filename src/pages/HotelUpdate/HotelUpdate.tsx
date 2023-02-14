import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import uuid from "react-uuid";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import Loader from "src/components/Loader/Loader";
import Sidebar from "src/components/sidebar/Sidebar";
import { addShowModalImage } from "src/features/hotelSlice";
import {
  useGetHotelQuery,
  useUpdateHotelMutation,
} from "src/servises/API/hotelApi";
import styles from "./HotelUpdate.module.less";
import * as yup from "yup";
import { validateSize, validateType } from "src/utils/validateShema";

const validationSchema = yup.object({
  title: yup
    .string()
    .required("Название должно быть заполнено")
    .min(5, "Название отель минимум 5 симолов"),

  description: yup
    .string()
    .required("Описание должно быть заполнено")
    .min(100, "Описание отель минимум 100 симолов"),

  imageFiles: yup
    .mixed()
    .test(
      "Проверка типа изображения",
      "Не правильный формат изображения ,  разрещенный формат jpg/ jpeg/webp/png",
      validateType
    )
    .test(
      "Проверка размера изображения",
      "Максимальный размер изображений 10мб, удалите лишние картинки",
      validateSize
    ),
});

function HotelUpdate() {
  let { id } = useParams();
  const { showModalImageState } = useAppSelector((state) => state.hotel);
  const dispatch = useAppDispatch();
  const { isLoading, data, error } = useGetHotelQuery(id);
  const [title, setTitlel] = useState("");
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState<string>();
  const [validationForm, setValidationForm] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [imageModal, setImageModal] = useState<string | null>("");
  const [flag, setFlagl] = useState(true);
  const [updateHotel, { isSuccess }] = useUpdateHotelMutation();

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

  //Обрабока ошибок с сервера
  useEffect(() => {
    data && setTitlel(data.title);
    data && setDescription(data.description);
    data && setImages(data.images);
  }, [data]);

  //Обработка файлов при добавлении
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;
    if (files && files.length > 0) {
      for (let i = 0; i < files?.length; i++) {
        let file: any = files[i];
        if (imageFiles.length > 0) {
          let elem = imageFiles.find((item) => item.name === file?.name);
          let elenData = images.find((item) => item === file?.name);

          if (elem === undefined && elenData === undefined) {
            if (file !== undefined) {
              setImageFiles((prev) => [...prev, file]);
            }
          }
        } else {
          setImageFiles((prev) => [...prev, file]);
        }
      }
    }
  }

  //Получение data url для превью
  useEffect(() => {
    const fileReaders: any = [];
    let isCancel = false;
    if (imageFiles.length) {
      const promises = imageFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReaders.push(fileReader);
          fileReader.onload = (e) => {
            const result = e.target?.result;
            if (result) {
              resolve({
                url: result,
                name: file.name,
                id: file.name.slice(4, -4),
              });
            }
          };
          fileReader.onabort = () => {
            reject(new Error("Загрузка файла прекращена"));
          };
          fileReader.onerror = () => {
            reject(new Error("Ошибка при чтение файла"));
          };
          fileReader.readAsDataURL(file);
        });
      });
      Promise.all(promises)
        .then((image) => {
          if (!isCancel) {
            image.forEach((itemImg: any) => {
              let dataImg = images.find((item) => item.name === itemImg?.name);
              let dataSrc = images.find((item) => item === itemImg?.name);
              if (dataImg === undefined && dataSrc === undefined) {
                setImages((prev) => [...prev, itemImg]);
              }
            });
          }
        })
        .catch((reason) => {
          setFormErrors(reason);
        });
    }
    return () => {
      isCancel = true;
      fileReaders.forEach(
        (fileReader: { readyState: number; abort: () => void }) => {
          if (fileReader.readyState === 1) {
            fileReader.abort();
          }
        }
      );
    };
  }, [imageFiles]);

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

  //Удаление файла
  function removeFile(name: string, flag?: string) {
    if (flag) {
      setImages((prev) => prev.filter((file) => file !== name));
    } else {
      setImageFiles((prev) => prev.filter((file) => file.name !== name));
      setImages((prev) => prev.filter((file) => file.name !== name));
    }
  }

  //Отправка и валидация формы
  async function onSubmit() {
    setValidationForm(true);

    await validationSchema
      .validate({ title, description, imageFiles }, { abortEarly: false })
      .then(async () => {
        try {
          setValidationForm(false);
          setFormErrors("");
          await updateHotel({
            id: id,
            body: {
              title,
              description,
              imageFiles,
              imagesSrc: images.filter((item): any => typeof item === "string"),
            },
          }).unwrap();
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
  //Drag and Drop
  function dragStartHandle(e: React.DragEvent<HTMLDivElement>, idx: number) {
    e.dataTransfer.setData("index", `${idx}`);
  }

  //Drag and Drop
  function dragStartEnd(e: React.DragEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    target.style.opacity = "1";
  }

  //Drag and Drop
  function dragStartOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    target.style.opacity = "0.6";
  }

  //Drag and Drop
  function dropHandler(e: React.DragEvent<HTMLDivElement>, idx: number) {
    e.preventDefault();
    const idxCurrent = e.dataTransfer.getData("index");
    const items: any = images;
    const [reorderedItem] = items.splice(idxCurrent, 1);
    items.splice(idx, 0, reorderedItem);
    setImages(items);

    const itemsFile: any = imageFiles;
    const [reorderedItemFile] = itemsFile.splice(idxCurrent, 1);
    itemsFile.splice(idx, 0, reorderedItemFile);
    setImageFiles(itemsFile);
    setFlagl(!flag);
  }

  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.hotel}>
          <h2 className={styles.title}>Редактировать отель</h2>
          {isLoading ? (
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
                  onChange={(e) => setTitlel(e.target.value)}
                  maxLength={25}
                />
              </label>

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
                          onDrop={(e) => dropHandler(e, idx)}
                        >
                          {idx === 0 && (
                            <p className={styles.title_img}>Главное фото</p>
                          )}
                          <img
                            src={
                              image.url
                                ? image.url
                                : process.env.REACT_APP_URL_STATIC +
                                  `${id}/` +
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
                                  image.name ? "" : "flag"
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
                  onChange={(e) => onChange(e)}
                  disabled={
                    imageFiles.length + images.length >= 10 ? true : false
                  }
                  accept=".png, .jpg, .jpeg, .webp"
                />
                <span className={styles.input_file_btn}>Выберите файл</span>
                <span className={styles.input_file_text}>Максимум 10мб</span>
                {imageFiles.length <= 10 ? (
                  <span className={styles.input_file_text}>
                    Максимум 10 файлов {imageFiles.length + images.length}
                  </span>
                ) : (
                  <span
                    className={styles.input_file_text}
                    style={{ color: "red" }}
                  >
                    Максимум 10 файлов, количество файлов{" "}
                    {imageFiles.length + images.length}
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
          <div>{isSuccess && <p>Данные успешно обновлены</p> }</div>
        </div>
      </div>
    </>
  );
}

export default HotelUpdate;
