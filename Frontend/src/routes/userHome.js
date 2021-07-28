import React, { useState } from "react";
import styles from "../styles/home.module.css";
import Option from "../components/option";
import Modal from "../components/Modal";

export default function UserHome() {
  const [id, setId] = useState(10);
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
