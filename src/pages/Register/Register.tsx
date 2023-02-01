import React from "react";
import FormRegister from "src/components/formFegister/FormRegister";
import Sidebar from "src/components/sidebar/Sidebar";
import styles from "./Register.module.less";

function Register() {
  return (
      <div className={styles.container}>
        <Sidebar />
        <FormRegister />
      </div>
  );
}

export default Register;
