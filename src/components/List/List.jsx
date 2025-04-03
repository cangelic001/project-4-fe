import { useState } from "react";
import { Link } from "react-router-dom";
import "./List.css";

const List = (props) => {
  const [selectedStudents, setSelectedStudents] = useState([]);

  const studentNames = [...new Set(props.entries.map((entry) => entry.title))].sort();

  const handleCheckboxChange = (student) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(student)
        ? prevSelected.filter((name) => name !== student)
        : [...prevSelected, student]
    );
  };

  const filteredEntries =
    selectedStudents.length === 0
      ? props.entries
      : props.entries.filter((entry) => selectedStudents.includes(entry.title));

  return (
    <>
      <h1 className="mt-5">Entries</h1>
      <div className="list-container">
        <aside className="left-box">
          <h5 className="m-2">Filter by Student</h5>
          {studentNames.length === 0 ? (
            <p>No students available</p>
          ) : (
            <ul className="student-filter-list">
              {studentNames.map((student) => (
                <li key={student}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student)}
                      onChange={() => handleCheckboxChange(student)}
                    />
                    {student}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <main className="right-box">
          <div className="entry-list-container">
            {filteredEntries.length === 0 ? (
              <p className="no-entries-message">No entries available</p>
            ) : (
              filteredEntries.map((entry) => (
                <div key={entry._id} className="entry-list-wrapper">
                  <article>
                    <header>
                      <h2 className="title">{entry.title || "Loading title..."}</h2>
                      <p>{`Posted on ${new Date(entry.createdAt).toLocaleDateString()}`}</p>
                      <Link to={`/entries/${entry._id}`} className="viewdetails-btn">
                        View Details
                      </Link>
                    </header>
                    <p>{entry.text || "Loading entry..."}</p>
                  </article>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default List;
