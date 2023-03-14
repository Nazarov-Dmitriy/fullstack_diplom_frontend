import React, { useState ,useEffect } from "react";
import { useAppSelector } from "src/app/hooks";
import styles from "./ChatMessages.module.less";
import format from "date-fns/format";
import uuid from "react-uuid";

interface Message {
  _id: string;
  author: {
    _id: string;
    name: string;
  };
  sentAt: Date;
  text: string;
  readAt?: Date;
}

function ChatMessages({
  items,
  isSuccess,
}: {
  items: Message[];
  isSuccess: boolean;
}) {
  const { user } = useAppSelector((state) => state.user);
  const { supportReq } = useAppSelector((state) => state.supportRequst);
  const [messageArr, setMessageArr] = useState(items);

  useEffect(()=>{
    setMessageArr(items)
  },[items])
  
  useEffect(() => {
    if (isSuccess) {
      setMessageArr((prev: any) =>
        prev.map((item: any) => {
          return { ...item, readAt: new Date() };
        })
      );
    }
  }, [isSuccess]);

  function messageStyle(item: Message) {
    let messageClass;

    if (user.role === "client" && user.id === item.author._id) {
      messageClass = styles.message_left;
    } else if (user.role === "client" && user.id !== item.author._id) {
      if (item.readAt) {
        messageClass = styles.message_right;
      } else {
        messageClass = styles.message_right_noread;
      }
    }
    if (user.role === "manager" && supportReq.client?.id !== item.author._id) {
      messageClass = styles.message_left;
    } else if (
      user.role === "manager" &&
      supportReq.client?.id === item.author._id
    ) {
      if (item.readAt) {
        messageClass = styles.message_right;
      } else {
        messageClass = styles.message_right_noread;
      }
    }
    return messageClass;
  }

  return (
    <>
      {messageArr.map((item) => {
        return (
          <div className={messageStyle(item)} key={uuid()}>
            <div className={styles.message_header}>
              <p className={styles.message_user}>Автор:{item.author.name}</p>
              <p className={styles.message_date}>
                Дата:{format(new Date(item.sentAt), "dd-MM-yyyy:HH:MM")}
              </p>
            </div>
            <p className={styles.message_text}>{item.text}</p>
          </div>
        );
      })}
    </>
  );
}

export default ChatMessages;