import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import * as entryService from "../../services/entryService";
import { UserContext } from "../../contexts/UserContext";
import "./EntryDetails.css"

const EntryDetails = (props) => {
  const { entryId } = useParams();
  const { user } = useContext(UserContext);
  const [entry, setEntry] = useState(null);

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

  if (!entry) return <main>Loading...</main>;

  return (
    <main>
      <section>
        <header>
          <h3>{entry.title}</h3>
          <p>
            {`posted on
                ${new Date(entry.createdAt).toLocaleDateString()}`}
          </p>
        </header>
        <p>{entry.text}</p>
        {entry.author && user && entry.author._id === user._id && (
          <>
            <Link className="edit-btn" to={`/entries/${entryId}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteEntry(entryId)}>
              Delete
            </button>
            <Link className="back-btn" to={`/entries`}>Back</Link>
          </>
        )}
      </section>
    </main>
  );
};

export default EntryDetails;
