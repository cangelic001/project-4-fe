
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as logService from "../../services/logService";
import "./LogForm.css";

const journalPrompts = [
  "What are you grateful for today?",
  "What challenges are you currently facing?",
  "What are your goals for the next week?",
  "How did you make today meaningful?",
  "Describe a moment from today that made you smile.",
  "What is something you've learned recently?",
  "How do you cope with stress, and is it working for you?",
  "What are your biggest fears, and how can you overcome them?",
  "If you could change one thing about your life right now, what would it be?",
  "What do you value most in your friendships?",
  "How do you define success, and are you on the path to it?",
  "What is something you've been putting off, and why?",
  "What are three things that made you happy this week?",
  "Describe your perfect day from start to finish.",
  "What is something you want to achieve in the next year?",
  "How do you express love and appreciation for others?",
  "What is something that makes you feel confident?",
  "If you could travel anywhere, where would you go and why?",
  "What does self-care look like for you, and how do you practice it?",
  "What are your favorite ways to relax and unwind?"
];

const LogForm = (props) => {
  const { logId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });

  useEffect(() => {
    const fetchLog = async () => {
      const logData = await logService.show(logId);
      setFormData(logData);
    };
    if (logId) fetchLog();
    return () => setFormData({ title: '', text: '' });
  }, [logId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (logId) {
        props.handleUpdateLog(logId, formData);
      } else {
        props.handleAddLog(formData);
      }
  };

  return (
    <main className="log-form-container">
      <div className="log-form-wrapper">

        <div className="journal-prompts">
          <h2 className="salmon-text">Journal Prompts</h2>
          <ul>
            {journalPrompts.map((prompt, index) => (
              <li key={index}>{prompt}</li>
            ))}
          </ul>
        </div>

        <div className="log-form">
            <h1 className="mentai-text">{logId ? "Edit Log" : "New Log"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title-input">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title-input"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="text-input">Text</label>
                    <textarea
                        required
                        name="text"
                        id="text-input"
                        value={formData.text}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn-submit fw-bold">Submit Log</button>
            </form>
        </div>

      </div>
    </main>
  );
};

export default LogForm;
