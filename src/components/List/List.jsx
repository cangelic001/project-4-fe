import { Link } from 'react-router-dom';
import './List.css'
;
const List = (props) => {
    return (
      <>
        <h1 className="mentai-text">Entries</h1>
        <h4 className="salmon-text">Your days in hindsight...</h4>
        <main className="entry-list-container">
          {props.entries.map((entry) => (
            <div className="entry-list-wrapper mentai-text">
              <article>
                <header>
                  <h2 className="title">{entry.title || "Loading title..."}</h2>
                  <p className="salmon-text">
                    {`Posted on
                    ${new Date(entry.createdAt).toLocaleDateString()}`}
                  </p>
                  <Link key={entry._id} to={`/entries/${entry._id}`} className='viewdetails-btn'>View Details</Link>
                </header>
                <p>{entry.text || "Loading entry..."}</p>
              </article>
            </div>
          ))}
        </main>
      </>
      );
};
export default List;
