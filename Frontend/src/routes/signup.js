import React from "react";
import { Link } from "react-router-dom";
import UserIcon from "../assets/user.svg";
import EmailIcon from "../assets/email.svg";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import styles from "../styles/auth.module.css";
import useForm from "../customhooks/useForm";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bankPoints } from "../constants";
import axios from "axios";
import { banks } from "../constants";

export default function Signup() {
  const { data, setFormData: setData } = useForm({
    name: "",
    email: "",
    bank: banks[0],
  });
  const user = useSelector((state) => state.authReducer);
  const history = useHistory();

  const signUpFunc = () => {
    console.log(data);
    // axios
    //   .post(bankPoints("/users/test", {data: data}))

    axios({
      method: "post",
      data: data,
      url: bankPoints("/users/"),
      responseType: "json",
    })
      .then((res) => console.log(res))
      .catch(() => console.log("bros e no work o"));
  };

  if (user) {
    history.replace("/");
  }
  return (
    <>
      <h2 className={styles.welcome_text}>
        Welcome to the Online Banking Platform
      </h2>
      <div className={styles.form_container}>
        <h2>Sign Up</h2>
        <form>
          <section>
            <p className="label">Name</p>
            <div>
              <img src={UserIcon} alt="" />
              <input
                type="text"
                onChange={(e) => {
                  setData(e.target.value, "name");
                }}
              />
            </div>
          </section>
          <section>
            <p className="label">Email</p>
            <div>
              <img src={EmailIcon} alt="" />
              <input
                type="email"
                onChange={(e) => {
                  setData(e.target.value, "email");
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
                // console.log(e.value)
              }}
            />
          </section>
        </form>
        <button className="button" onClick={signUpFunc}>
          Sign up
        </button>
        <Link to="/login">
          Switch to <span>Log in</span>
        </Link>
      </div>
    </>
  );
}
