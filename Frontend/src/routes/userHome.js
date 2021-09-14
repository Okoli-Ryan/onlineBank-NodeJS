import React, { useState } from "react";
import styles from "../styles/home.module.css";
import Option from "../components/option";
import Modal from "../components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function UserHome() {
  const [id, setId] = useState({ code: 10, message: null });
  const history = useHistory();
  const user = useSelector((state) => state.authReducer);

  if (!user) {
    history.replace("/login");
  }
  return (
    <div>
      <h2 className={styles.heading_text}>Choose an option</h2>
      <div className={styles.container}>
        <Option label="Withdraw Cash" onClick={() => setId(1)} />
        <Option label="Deposit Cash" onClick={() => setId(2)} />
        <Option label="Check Balance" />
        <Option label="Transfer Funds" onClick={() => setId(4)} />
        <Option label="View Transactions" />
      </div>
      <Modal id={id} display={true} setId={setId} />
    </div>
  );
}
