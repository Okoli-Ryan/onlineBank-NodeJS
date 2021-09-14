import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { authPoints } from "../constants";
import { useDispatch } from "react-redux";
import { authAction } from "../store/actions/authAction";

export default function Verification() {
  const [id, setId] = useState({ code: 100, message: null });
  const { vId, vSecret } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: "get",
      url: authPoints(`/userAuths/confirm/${vId}/${vSecret}`),
      responseType: "json",
    })
      .then((res) => {
        console.log(res.data);
        dispatch(
          authAction({
            id: res.data.user._id,
          })
        );
      })
      .then(() => history.replace("/setupPin"))
      .catch((e) => {
        console.log("error: " + e);
        setId({ code: 999, message: e });
      });
  }, []);

  return <Modal id={id} setId={setId} />;
}
