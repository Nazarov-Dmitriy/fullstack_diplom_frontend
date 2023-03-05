import React, { useState } from "react";
import Sidebar from "src/components/sidebar/Sidebar";
import CreateSupportClient from "src/components/support/CreateSupportClient/CreateSupportClient";
import styles from "./ClientSupport.module.less";
import useWebSocket from "react-use-websocket";

function ClientSupport() {
  const socketUrl = "wss://localhost:3004";

  const [showComponent, setShowComponent] = useState("create-support");

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log("opened"),
    shouldReconnect: (closeEvent) => true,
  });

  function showCreateSupport() {
    setShowComponent("create-support");
  }

  function showMySupportRequest() {
    setShowComponent("my-support");
  }
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.wraper}>
        <>
          <div className={styles.menu}>
            <div className={styles.create_support} onClick={showCreateSupport}>
              <button className={styles.btn}>
                Создать обращение
                <img
                  src="../../assets/icons/add.png"
                  alt="create support"
                  className={styles.icons_btn}
                />
              </button>
            </div>
            <div
              className={styles.search_support}
              onClick={showMySupportRequest}
            >
              <button className={styles.btn}>
                Мои обращения
                <img
                  src="../../assets/icons/seacrh.png"
                  alt="add user"
                  className={styles.icons_btn}
                />
              </button>
            </div>
          </div>

          {showComponent === "create-support" && <CreateSupportClient />}
          {/* {dataSearch.length > 0 && <ListDataSearch />} */}
          {/* {!flagSearch && user.role === "admin" && <FormRegisterAdmin />} */}
        </>
      </div>
    </div>
  );
}

export default ClientSupport;
