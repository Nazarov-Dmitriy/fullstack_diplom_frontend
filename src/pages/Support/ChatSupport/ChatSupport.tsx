import React, {
  useState,
  KeyboardEvent,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "src/app/hooks";
import Sidebar from "src/components/sidebar/Sidebar";
import {
  useCloseMessageRequestMutation,
  useGetHistoryMessageSupportRequesQuery,
  useSendMessagePostMutation,
  useSendMessageReadMutation,
} from "src/servises/API/supportApi";
import styles from "./ChatSupport.module.less";
import ChatMessages from "../ChatMessages/ChatMessages";
import Error from "src/components/Error/Error";

function ChatSupport({ socket }: { socket: any }) {
  let { id } = useParams();
  const { data, error, refetch } = useGetHistoryMessageSupportRequesQuery(id);
  const { supportReq } = useAppSelector((state) => state.supportRequst);
  const { user, authenticated } = useAppSelector((state) => state.user);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [sendMessagePost] =
    useSendMessagePostMutation();
  const [sendMessageRead, { isSuccess }] = useSendMessageReadMutation();
  const [closeMessageRequest] = useCloseMessageRequestMutation();
  const [text, setText] = useState("");
  const [messageArr, setMessageArr] = useState(data);
  const [submit, setSubmit] = useState(true);
  const [supportDisabled, setSupportDisabled] = useState(false);
  const messagesEndRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    if (error) {
      let err: any = error;
      setFormErrors([err.data?.message || err.error]);
    } else {
      setFormErrors([]);
    }
  }, [error]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    setMessageArr(data);
  }, [data]);

  useEffect(() => {
    socket.once("connection", () => {
      socket.emit("roomId", id);
    });
  }, [id, socket]);

  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messageArr]);

  useEffect(() => {
    if (messageArr) {
      socket.on("addmessage", (data: any) => {
        setMessageArr([
          ...messageArr,
          {
            _id: data._id,
            author: { name: data.author.name, _id: data.author._id },
            sentAt: new Date(),
            text: data.text,
          },
        ]);
      });
    }
  }, [messageArr, socket]);

  const onFocus = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    let fillter = messageArr?.some((item: any) =>
      user.role === "client"
        ? item.author._id !== user.id && !item.readAt
        : item.author._id === supportReq.client?.id && !item.readAt
    );

    fillter && sendMessageRead({ id: id ? id : "", createdBefore: new Date() });
  };

  const keyPressSubmit = (e: KeyboardEvent) => e.key === "Enter" && onSubmit(e);

  async function onSubmit(
    e:
      | React.KeyboardEvent<Element>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setText("");
    await sendMessagePost({
      id: id ? id : "",
      text,
    }).unwrap();
    setSubmit(!submit);
  }

  async function onSubmitClose() {
    closeMessageRequest(id ? id : "");
    setSupportDisabled(true);
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.wraper}>
        {authenticated &&
        (user.role === "manager" || user.role === "client") ? (
          <div>
            <div className={styles.header_support}>
              <div>
                <h3 className={styles.title}>Обращение №: {supportReq.id}</h3>
                <h4 className={styles.title}>Тема: {supportReq.theme}</h4>
                <h4 className={styles.title}>
                  Статус:
                  {!supportDisabled && supportReq.isActive
                    ? "В работе"
                    : "Закрыто"}
                </h4>
              </div>
              <div>
                {user && user.role === "manager" && (
                  <button
                    onClick={onSubmitClose}
                    className={styles.chat_input_btn}
                  >
                    Закрыть запрос
                  </button>
                )}
              </div>
            </div>
            {user && user.role === "manager" && (
              <div>
                <h4 className={styles.title}>Клиент</h4>
                <p className={styles.text}> Id : {supportReq.client?.id}</p>
                <p className={styles.text}> Имя : {supportReq.client?.name}</p>
                <p className={styles.text}>
                  Email :{supportReq.client?.email}
                </p>
                <p className={styles.text}>
                  Телефон : {supportReq.client?.contactPhone}
                </p>
              </div>
            )}
            <div>
              <h4 className={styles.title_chat}>Чат</h4>
              <div className={styles.chat}>
                {messageArr && (
                  <ChatMessages items={messageArr} isSuccess={isSuccess} />
                )}
                <span ref={messagesEndRef}></span>
              </div>
            </div>
            <div className={styles.chat_input}>
              <h4 className={styles.title_chat}>Сообщение</h4>
              <textarea
                className={styles.chat_input_textarea}
                value={text}
                placeholder="Введите текст..."
                onChange={(e) => setText(e.target.value)}
                onKeyDown={keyPressSubmit}
                onFocus={(e) => onFocus(e)}
              ></textarea>
              <button
                onClick={(e) => onSubmit(e)}
                className={styles.chat_input_btn}
                disabled={supportDisabled}
              >
                Отправить
              </button>
            </div>
          </div>
        ) : (
          <h3>Для продолжения работы требуеться авторизация </h3>
        )}
      </div>
      <div>{formErrors && <Error error={formErrors} />}</div>
    </div>
  );
}

export default ChatSupport;
