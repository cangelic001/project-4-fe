
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as entryService from "../../services/entryService";
import "./EntryForm.css";

const performancePrompts = [
  "Improvement in subject or skill",
  "Demonstration of curiosity",
  "Consistency in completing assignments",
  "Confidence in answering questions",
  "Approach to challenging problems",
  "Time management and revision habits",
  "Contribution to group activities",
  "Use of revision techniques",
  "Application of creativity in problem-solving"
]

const recommendationPrompts = [
  "Building confidence through consistent practice",
  "Encouraging deeper engagement in class discussions",
  "Developing stronger review habits for assignments",
  "Strengthening time management strategies",
  "Seeking additional support for challenging topics",
  "Enhancing teamwork and collaboration skills",
  "Applying creativity effectively while maintaining accuracy"
];


const EntryForm = (props) => {
  const { entryId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    text: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchEntry = async () => {
      const entryData = await entryService.show(entryId);
      console.log("fetched entry data:", entryData); 
      setFormData(entryData);
    };
    if (entryId) fetchEntry();
    return () => setFormData({ title: '', text: '', createdAt: '' }); 
  }, [entryId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (entryId) {
        props.handleUpdateEntry(entryId, formData);
      } else {
        props.handleAddEntry(formData);
      }
  };

  return (
    <main className="entry-form-container">
      <div className="entry-form-wrapper">

        <div className="prompts">
          <h5>Performance Review</h5>
          <ul>
            {performancePrompts.map((prompt, index) => (
              <li key={index}>{prompt}</li>
            ))}
          </ul>
        </div>

        <div className="prompts">
          <h5>Recommendation</h5>
          <ul>
            {recommendationPrompts.map((prompt, index) => (
              <li key={index}>{prompt}</li>
            ))}
          </ul>
        </div>
      
        <div className="entry-form">
            <h1>{entryId ? "Edit Entry" : "New Entry"}</h1>
            
            {formData.createdAt ? (
              <p>
                {`Posted on ${new Date(formData.createdAt).toLocaleDateString()}`}
              </p>
            ) : (
              <p>Date: Loading...</p> 
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title-input">Student Name</label>
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
                    <label htmlFor="text-input">Comments and Recommendation</label>
                    <textarea
                        required
                        name="text"
                        id="text-input"
                        value={formData.text}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn-submit fw-bold">Submit</button>
            </form>
        </div>


      </div>
    </main>
  );
};

export default EntryForm;
