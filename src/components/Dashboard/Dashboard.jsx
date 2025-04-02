import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as entryService from "../../services/entryService";
import LoadingSpinner from "./Spinner";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchUserEntries = async () => {
      if (!user?._id) return;

      try {
        const fetchedEntries = await entryService.index();
        setEntries(fetchedEntries);
      } catch (err) {
        console.error("Error fetching entries:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchUserEntries();
  }, [user]);

  // Group entries by student name (title)
  const groupedEntries = entries.reduce((acc, entry) => {
    if (!entry.title) return acc;
    acc[entry.title] = (acc[entry.title] || 0) + 1;
    return acc;
  }, {});
  // sort alphabetically
  const sortedEntries = Object.entries(groupedEntries).sort(([a], [b]) => a.localeCompare(b)); 

  // Stats
  // number of students
  const numberOfStudents = Object.keys(groupedEntries).length; 
  // number of entries written
  const numberOfEntries = Object.values(groupedEntries).reduce((acc, count) => acc + count, 0); 
  // average entries per student
  const averageEntriesPerStudent = numberOfStudents > 0 ? (numberOfEntries / numberOfStudents).toFixed(2) : 0;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard-container">
      {/* left side for text */}
      <div className="dashboard-text-box">
        <h1 className="dashboard-header">Hello, {user?.username || "User"}!</h1>
        <h4 className="dashboard-subheader">Here are your stats so far</h4>

        <p className="dashboard-stats">
          <strong>{numberOfStudents}</strong> Students
        </p>

        <p className="dashboard-stats">
          <strong>{numberOfEntries}</strong> Entries Written
        </p>

        <p className="dashboard-stats">
          <strong>{averageEntriesPerStudent}</strong> Average Entries per Student
        </p>

      </div>

      {/* right side for cards*/}
      <div className="dashboard-cards-box">
        {sortedEntries.length === 0 ? (
          <p className="dashboard-no-entries">No entries yet</p>
        ) : (
          <div className="dashboard-grid">
            {sortedEntries.map(([studentName, count]) => (
              <div key={studentName} className="dashboard-card">
                <h5 className="dashboard-card-title">{studentName}</h5>
                <p className="dashboard-card-count">{count} Entry(s)</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
