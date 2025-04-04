import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ type, message, onConfirm, onCancel, onEmailSubmit }) => {
  const [recipient, setRecipient] = useState("");

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (recipient) {
      onEmailSubmit(recipient);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {type === "email" ? (
          <>
            <h3>Enter Recipient's Email</h3>
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter recipient email"
            />
            <div className="modal-buttons">
              <button className="modal-btn" onClick={handleSubmitEmail}>
                Send
              </button>
              <button className="modal-btn" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p>{message}</p>
            <button className="modal-btn" onClick={onConfirm}>
              Yes, delete
            </button>
            <button className="modal-btn" onClick={onCancel}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
