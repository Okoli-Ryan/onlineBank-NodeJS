import React from "react";
import { Link } from "react-router-dom";
import UserIcon from "../assets/user.svg";
import PasswordIcon from "../assets/padlock.svg";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import styles from "../styles/auth.module.css";
import useForm from "../customhooks/useForm";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const banks = ["Apex", "GTB", "Stanbic", "Star"];

export default function Login() {
  const { data, setFormData: setData } = useForm();

  const user = useSelector((state) => state.authReducer);
  const history = useHistory();

  if (user) {
    history.replace("/");
  }

  return (
    <>
      <h2 className={styles.welcome_text}>
        Welcome to the Online Banking Platform. <span>Log in to continue</span>
      </h2>
      <div className={styles.form_container}>
        <h2>Log in</h2>
        <form>
          <section>
            <p className="label">Account Number</p>
            <div>
              <img src={UserIcon} alt="" />
              <input
                type="text"
                onChange={(e) => {
                  setData(e.target.value, "accNo");
                }}
              />
            </div>
          </section>
          <section>
            <p className="label">Pin</p>
            <div>
              <img src={PasswordIcon} alt="" />
              <input
                type="password"
                onChange={(e) => {
                  setData(e.target.value, "pin");
                }}
              />
            </div>
          </section>
          <section>
            <p className="label">Bank</p>
            <Dropdown
              options={banks}
              value={banks[0]}
              placeholder="Select a bank"
              menuClassName={styles.font}
              placeholderClassName={styles.font}
              onChange={(e) => {
                setData(e.value, "bank");
              }}
            />
          </section>
        </form>
        <button className="button">Log in</button>
        <Link to="/signup">
          Switch to <span>Sign up</span>
        </Link>
      </div>
    </>
  );
}
