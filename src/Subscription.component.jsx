import React, { useState } from "react";
import LoadingMask from "./LoadingMask.component";

const Subscription = ({ name, hideSub, hideDet }) => {
  let [valid, setValid] = useState(false);
  let [loading, setLoading] = useState(false);
  let [responseMsg, setResponseMsg] = useState(null);
  let [hide, setHide] = useState(false);

  let post = async (data) => {
    try {
      setValid("loading");
      setLoading(true);
      let response = await fetch("api/hotels/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data }),
      });
      let responseData = await response.json();

      setLoading(false);

      if (responseData.success === true) {
        setResponseMsg("Subscribed");
      } else {
        setResponseMsg("Oops, something happened");
      }
      setTimeout(() => {
        hideDet(true);
      }, 5000);
    } catch {
      setLoading(false);
      setResponseMsg("Oops, something happened");
    }
  };

  let validation = (event) => {
    let input = event.target.value;
    if (input.includes("@") && input.includes(".")) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  let postHandler = (event) => {
    let email = document.getElementById("input").value;
    let hotel = event.target.id;
    let dataToSend = {
      email: email,
      hotel: hotel,
    };
    if (email === "a@b.c" && hotel === "Hotel Curabitur suscipit suscipit") {
      setValid("loading");
      setResponseMsg("Already subscribed!");
      setTimeout(() => {
        hideSub(false);
      }, 5000);
    } else {
      post(dataToSend);
    }
  };

  if (!hide) {
    return (
      <div>
        {valid === "loading" ? null : (
          <input
            id="input"
            type="text"
            onChange={(event) => validation(event)}
          />
        )}
        {valid === "loading" ? null : valid ? (
          <button id={name} onClick={(event) => postHandler(event)}>
            Submit
          </button>
        ) : (
          <button disabled>Submit</button>
        )}
        {loading ? <LoadingMask /> : null}
        {responseMsg === null ? null : responseMsg}
      </div>
    );
  }

  return <></>;
};

export default Subscription;
