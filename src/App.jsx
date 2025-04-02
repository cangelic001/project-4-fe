import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import EntryList from "./components/List/List";
import EntryDetails from "./components/EntryDetails/EntryDetails";
import EntryForm from "./components/EntryForm/EntryForm";

import { UserContext } from "./contexts/UserContext";
import * as entryService from "./services/entryService";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

const App = () => {
  const { user } = useContext(UserContext);
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  console.log("Entries in App.jsx:", entries);

  useEffect(() => {
    const fetchUserEntries = async () => {
      const EntriesData = await entryService.index();
      setEntries(EntriesData);
    };
    if (user) fetchUserEntries();
  }, [user]);

  const handleAddEntry = async (entryFormData) => {
    const newEntry = await entryService.create(entryFormData);
    setEntries([newEntry, ...entries]);
    setTimeout(() => navigate("/entries"), 1000);
  };

  const handleDeleteEntry = async (entryId) => {
    const deletedEntry = await entryService.deleteEntry(entryId);
    setEntries(entries.filter((entry) => entry._id !== deletedEntry._id));
    navigate("/entries");
  };

  const handleUpdateEntry = async (entryId, entryFormData) => {
    const updatedEntry = await entryService.update(entryId, entryFormData);
    setEntries(entries.map((entry) => (entryId === entry._id ? updatedEntry : entry)));
    navigate(`/entries/${entryId}`);
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard entries={entries} /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes*/}
            <Route path="/entries" element={<EntryList entries={entries} />} />
            <Route
              path="/entries/:entryId"
              element={<EntryDetails handleDeleteEntry={handleDeleteEntry} entries={entries}/>}
            />
            <Route
              path="/entries/new"
              element={<EntryForm handleAddEntry={handleAddEntry} entries={entries} />}
            />
            <Route
              path="/entries/:entryId/edit"
              element={<EntryForm handleUpdateEntry={handleUpdateEntry} entries={entries} />}
            />
          </>
        ) : (
          <>
            {/* Non-user routes*/}
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
