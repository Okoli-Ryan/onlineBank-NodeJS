import React, { useState } from "react";
import styles from "../styles/modal.module.css";

const OneInput = ({ label, type }) => {
  return (
    <section style={{ width: "100%", margin: "2rem auto" }}>
      <label htmlFor="input" className="label">
        {label}
      </label>
      <input
        type={type}
        name="amount"
        style={{ width: "100%", display: "block" }}
      />
    </section>
  );
};

const TwoInput = ({ label1, label2 }) => {
  return (
    <>
      <OneInput label={label1} type="text" />
      <OneInput label={label2} type="number" />
    </>
  );
};

const DisplayComponent = ({ id }) => {
  if (id === 1)
    return <OneInput label="Input amount to withdraw" type="number" />;
  else if (id === 2)
    return <OneInput label="Input amount to deposit" type="number" />;
  else if (id === 4)
    return (
      <TwoInput
        label1="Input email account to deposit to"
        label2="Input amount to transfer"
      />
    );
  else if (id === 0)
    return (
      <h3 className="label" style={{ textAlign: "center" }}>
        Transaction completed
      </h3>
    );
  else if (id === 999)
    return (
      <h3 className="label" style={{ textAlign: "center" }}>
        Transaction <span style={{ color: "red" }}>failed</span>
      </h3>
    );
};

export default function Modal({ id, setId }) {
  return (
    <>
      {id !== 10 && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <DisplayComponent id={id} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => setId(10)}
                style={{ backgroundColor: "red" }}>
                Close
              </button>
              {id !== 0 && id !== 999 && (
                <button onClick={() => setId(0)}>Submit</button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
