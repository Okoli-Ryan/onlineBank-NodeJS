import React, { useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authPoints } from "../constants";

export default function SetupPin() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer);
  const history = useHistory();
  const [id, setId] = useState({ code: 10, message: null });
  const [value, setValue] = useState(0);

  const setPin = () => {
    axios(
      {
        method: "post",
        url: authPoints(`/userAuths/setPin`),
        data: { id: user.id, pin: value },
        responseType: "json",
      },
      { withCredentials: true }
    )
      // .then((res) => console.log(res))
      .then(() => history.replace("/"))
      .catch((e) => {
        console.log("error: " + e);
        setId({ code: 999, message: e });
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "11rem",
      }}>
      <h2 style={{ textAlign: "center", color: "white" }}>
        Enter Pin to access your account.
      </h2>
      <input
        type="text"
        maxLength={6}
        autoFocus
        minLength={6}
        onChange={(e) => setValue(e.target.value)}
        style={{
          maxWidth: "10rem",
          padding: "8px 40px",
          margin: "0 auto 1rem auto",
          textAlign: "center",
        }}
      />
      <button className="button" style={{ fontWeight: "500" }} onClick={setPin}>
        Submit
      </button>
      <Modal id={id} setId={setId} />
    </div>
  );
}
