import React, { useState, useEffect } from "react";
import styles from "../styles/modal.module.css";
import Tick from "../assets/icons8-checked.gif";

export default function CompleteModal() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img src={Tick} alt="" style={{ width: "5rem", height: "5rem" }} />
    </div>
  );
}
