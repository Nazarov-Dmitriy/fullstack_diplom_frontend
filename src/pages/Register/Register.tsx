import React from "react";
import Sidebar from "src/components/sidebar/Sidebar";
import FormRegister from "src/components/users/formFegister/FormRegister";
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
