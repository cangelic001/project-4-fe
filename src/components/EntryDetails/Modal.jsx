import React from "react";
import "./Modal.css";

const Modal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button className="modal-btn" onClick={onConfirm}>Yes, delete</button>
        <button className="modal-btn" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
