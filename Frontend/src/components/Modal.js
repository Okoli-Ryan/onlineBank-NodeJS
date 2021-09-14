import React, { useState, useCallback, useRef } from "react";
import styles from "../styles/modal.module.css";
import LoadingIcon from "../assets/loading.svg";
import axios from "axios";
import Dropdown from "react-dropdown";
import { useSelector } from "react-redux";
import { bankPoints, banks } from "../constants";
axios.defaults.withCredentials = true;

const OneInput = ({ label, type, onChange }) => {
  return (
    <section style={{ width: "100%", margin: "2rem auto" }}>
      <label htmlFor="input" className="label">
        {label}
      </label>
      <input
        type={type}
        onChange={onChange}
        name="amount"
        style={{ width: "100%", display: "block" }}
      />
    </section>
  );
};

//!id = 1 : Withdraw modal
//id = 2 : Deposit modal
//id = 4 : Transfer funds modal
//id = 0 : Transaction complete modal
//id = 10 : hide modal
//id = 100 : Loading Modal
//id = 999: error modal

const DisplayComponent = ({ id, setId }) => {
  const [value, setValue] = useState({});
  const user = useSelector((state) => state.authReducer);
  const timer = useRef(null);

  const withdraw = useCallback(() => {
    axios(
      {
        method: "post",
        url: bankPoints(`/accounts/witBalance/${user.id}`),
        responseType: "json",
        data: value,
      },
      { withCredentials: true, credentials: "include" }
    )
      .then(() => setId({ code: 0, message: null }))
      .catch((e) => setId({ code: 999, message: e.data.message }));
  }, []);

  const transfer = useCallback(() => {
    axios(
      {
        method: "post",
        url: bankPoints(`/accounts/transfer/${user.id}`),
        responseType: "json",
        data: value,
      },
      { withCredentials: true, credentials: "include" }
    )
      .then(() => setId({ code: 0, message: null }))
      .catch((e) => setId({ code: 999, message: e.data.message }));
  }, []);

  const deposit = useCallback(() => {
    axios(
      {
        method: "post",
        url: bankPoints(`/accounts/depBalance/${user.id}`),
        responseType: "json",
        data: value,
      },
      { withCredentials: true, credentials: "include" }
    )
      .then(() => setId({ code: 0, message: null }))
      .catch((e) => setId({ code: 999, message: e.data.message }));
  }, []);

  const changeFunc = (lab, e) => {
    setValue((prev) => {
      return { ...prev, [`${lab}`]: e };
    });
  };

  if (id.code === 1)
    return (
      <>
        <OneInput
          label="Input amount to withdraw"
          type="number"
          onChange={(e) => changeFunc("amount", e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => setId({ code: 10, message: null })}
            style={{ backgroundColor: "red" }}>
            Close
          </button>
          <button onClick={withdraw}>Submit</button>
        </div>
      </>
    );
  else if (id.code === 2)
    return (
      <>
        <OneInput
          label="Input amount to deposit"
          type="number"
          onChange={(e) => changeFunc("amount", e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => setId({ code: 10, message: null })}
            style={{ backgroundColor: "red" }}>
            Close
          </button>
          <button onClick={deposit}>Submit</button>
        </div>
      </>
    );
  else if (id.code === 4)
    return (
      <>
        <OneInput
          label="Input receipient's account number"
          type="text"
          onChange={(e) => changeFunc("accountNumber", e.target.value)}
        />
        <Dropdown
          options={banks}
          value={banks[0]}
          placeholder="Select a bank"
          menuClassName="font"
          placeholderClassName="font"
          onChange={(e) => {
            changeFunc("bank", e.value);
            // console.log(e.value)
          }}
        />
        <OneInput
          label="Input amount to transfer"
          type="number"
          onChange={(e) => changeFunc("amount", e)}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => setId({ code: 10, message: null })}
            style={{ backgroundColor: "red" }}>
            Close
          </button>
          <button onClick={transfer}>Submit</button>
        </div>
      </>
    );
  else if (id.code === 0) {
    timer.current = setTimeout(() => setId({ code: 10, message: null }), 2000);
    return (
      <>
        <h3 className="label" style={{ textAlign: "center" }}>
          Success
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* <button onClick={() => setId(10)} style={{ backgroundColor: "red" }}>
            Close
          </button> */}
        </div>
      </>
    );
  } else if (id.code === 999)
    return (
      <>
        <h3 className="label" style={{ textAlign: "center" }}>
          <span style={{ color: "red" }}>{id.message}</span>
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => setId({ code: 10, message: null })}
            style={{ backgroundColor: "red" }}>
            Close
          </button>
        </div>
      </>
    );
  else if (id.code === 100)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={LoadingIcon} alt="" className={styles.rotating} />
      </div>
    );
};

export default function Modal({ id, setId }) {
  return (
    <>
      {id.code !== 10 && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <DisplayComponent id={id} setId={setId} />
          </div>
        </div>
      )}
    </>
  );
}
