import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import * as entryService from "../../services/entryService";
import { UserContext } from "../../contexts/UserContext";
import Modal from "./Modal"; 
import "./EntryDetails.css";

const EntryDetails = (props) => {
  const { entryId } = useParams();
  const { user } = useContext(UserContext);
  const [entry, setEntry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [emailStatus, setEmailStatus] = useState(""); 
  const [recipient, setRecipient] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);

  const backendUrl = import.meta.env.VITE_BACK_END_SERVER_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const entryData = await entryService.show(entryId);
        setEntry(entryData);
      } catch (error) {
        console.error("Failed to fetch entry:", error);
        setEntry(null);
      }
    };
    fetchEntry();
  }, [entryId]);

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    props.handleDeleteEntry(entryId);
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const openEmailModal = () => {
    setShowEmailModal(true);
    setEmailStatus(""); 
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
    setRecipient(""); 
  };

  const sendEmail = async () => {
    try {
      if (!recipient) {
        setEmailStatus("Please enter a recipient email.");
        return;
      }

      console.log("Sending email to:", recipient);
      console.log("Entry data being sent:", entry);

      setEmailStatus("Sending...");
      const response = await fetch(`${backendUrl}/email/send-review-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient, entry }),
      });

      const result = await response.json();
      console.log("Response from server:", result);
      
      if (response.ok) {
        setEmailStatus("Email sent successfully!");
      } else {
        setEmailStatus(result.message || "Failed to send email.");
      }

      setShowEmailModal(false); 
    } catch (error) {
      console.error("Error sending email:", error);
      setEmailStatus("An error occurred while sending the email.");
    }
  };

  if (!entry) return <main>Loading...</main>;

  return (
    <main>
      <section className="entry-container">
        <header>
          <h3>{entry.title}</h3>
          <p>{`posted on ${new Date(entry.createdAt).toLocaleDateString()}`}</p>
        </header>
        <p>{entry.text}</p>
        {entry.author && user && entry.author._id === user._id && (
          <>
            <button className="delete-btn custom-btn" onClick={handleDelete}>X</button>
            <Link className="edit-btn entry-btn" to={`/entries/${entryId}/edit`}>Edit</Link>
            <button className="email-btn entry-btn" onClick={openEmailModal}>Send Email</button>
            <Link className="back-btn entry-btn" to={`/entries`}>Back</Link>

            {emailStatus && <p className="email-status">{emailStatus}</p>}
          </>
        )}
      </section>

      {showModal && (
        <Modal
          message="Are you sure you want to delete this entry?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      {showEmailModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Enter Recipient's Email</h3>
            <input
              type="email"
              placeholder="Recipient's email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="email-input"
            />
            <button className="modal-btn" onClick={sendEmail}>Send Email</button>
            <button className="modal-btn" onClick={closeEmailModal}>Cancel</button>
            {emailStatus && <p className="email-status">{emailStatus}</p>}
          </div>
        </div>
      )}
    </main>
  );
};

export default EntryDetails;
