import React, { useState, useEffect } from "react";
import Notification from "../ui/notification";
import classes from "./contact-form.module.css";

const sendContactData = async (contactData) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
};

const ContactForm = () => {
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (!requestStatus || requestStatus === "pending") return;

    const timer = setTimeout(() => {
      setRequestStatus(null);
      setRequestError(null);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [requestStatus]);

  const sendMessageHandler = async (event) => {
    event.preventDefault();

    setRequestStatus("pending");

    try {
      await sendContactData({
        email: emailValue,
        name: nameValue,
        message: messageValue,
      });
      setRequestStatus("success");
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
      setEmailValue("");
      setNameValue("");
      setMessageValue("");
    }
  };

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: requestStatus,
      title: "Sending message...",
      message: "Your message sending!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: requestStatus,
      title: "Success!",
      message: "Your message sended!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: requestStatus,
      title: "Error :(",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>Ho can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={emailValue}
              onChange={(event) => setEmailValue(event.target.value)}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={nameValue}
              onChange={(event) => setNameValue(event.target.value)}
              required
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            value={messageValue}
            onChange={(event) => setMessageValue(event.target.value)}
            required
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
