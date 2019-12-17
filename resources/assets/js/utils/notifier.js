import React from "react";
import libnotifier from "simple-react-notifications";

import Notification from "../ui/Notification";

libnotifier.configure({
  autoClose: 3500,
  single: true,
  onlyLast: true,
  animation: {
    in: "notificationSlideDown",
    out: "notificationSlideUp",
    duration: 400,
    timingFunction: "ease-in-out"
  },
  delay: 0,
  width: "100%"
});

export default function notifier(message) {
  libnotifier({
    render: ({ id, onClose }) => (
      <Notification key={id} onClosePanel={onClose} message={message} />
    )
  });
}
