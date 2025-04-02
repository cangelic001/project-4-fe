import { Link } from 'react-router-dom';
import './LogList.css'
;
const LogList = (props) => {
    return (
      <>
      
        <h1 className="mentai-text">Logs</h1>
        <h4 className="salmon-text">Your days in hindsight...</h4>
        <main className="log-list-container">
          {props.logs.map((log) => (
            <div className="log-list-wrapper mentai-text">
              <article>
                <header>
                  <h2 className="title">{log.title || "Loading title..."}</h2>
                  <p className="salmon-text">
                    {`Posted on
                    ${new Date(log.createdAt).toLocaleDateString()}`}
                  </p>
                  <Link key={log._id} to={`/logs/${log._id}`} className='viewdetails-btn'>View Details</Link>
                </header>
                <p>{log.text || "Loading log..."}</p>
              </article>
            </div>
          ))}
        </main>
      </>
      );
};
export default LogList;
