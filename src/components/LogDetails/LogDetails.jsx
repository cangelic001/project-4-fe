import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import * as logService from "../../services/logService";
import { UserContext } from "../../contexts/UserContext";
import "./LogDetails.css"

const LogDetails = (props) => {
  const { logId } = useParams();
  const { user } = useContext(UserContext);
  const [log, setLog] = useState(null);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const logData = await logService.show(logId);
        setLog(logData);
      } catch (error) {
        console.error("Failed to fetch log:", error);
        setLog(null); 
      }
    };
    fetchLog();
  }, [logId]);

  if (!log) return <main>Loading...</main>;

  return (
    <main>
      <section>
        <header>
          <h3>{log.title}</h3>
          <p>
            {`posted on
                ${new Date(log.createdAt).toLocaleDateString()}`}
          </p>
        </header>
        <p>{log.text}</p>
        {log.author && user && log.author._id === user._id && (
          <>
            <Link className="edit-btn" to={`/logs/${logId}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteLog(logId)}>
              Delete
            </button>
            <Link className="back-btn" to={`/logs`}>Back</Link>
          </>
        )}
      </section>
    </main>
  );
};

export default LogDetails;
