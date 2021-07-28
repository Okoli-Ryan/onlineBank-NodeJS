import React from "react";
import styles from "../styles/home.module.css";

export default function Option({ label, onClick }) {
  return (
    <button className={styles.option} onClick={onClick}>
      <h3
        style={{
          color: "rgb(110, 196, 167)",
          display: "flex",
          alignSelf: "center",
        }}>
        {label}
      </h3>
    </button>
  );
}
