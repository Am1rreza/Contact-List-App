import "./App.css";
import React, { useEffect, useState } from "react";
import AddContact from "./components/AddContact/AddContact";
import ContactList from "./components/ContactList/ContactList";
import { Route, Switch } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import axios from "axios";

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // IIFE
    (async function () {
      const { data } = await axios.get("http://localhost:3001/contacts");
      setContacts(data);
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // Handlers
  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: new Date().getTime(), ...contact }]);
  };

  const deleteContactHandler = (id) => {
    const filteredContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(filteredContacts);
  };

  return (
    <React.StrictMode>
      <main className="App">
        <header>
          <h1 className="app-title">Contact App</h1>
        </header>
        <Switch>
          <Route
            path={"/contact/:id"}
            component={(props) => <ContactPage {...props} />}
          />
          <Route
            path={"/add"}
            render={(props) => (
              <AddContact addContactHandler={addContactHandler} {...props} />
            )}
          />
          <Route
            path={"/"}
            render={(props) => (
              <ContactList
                contacts={contacts}
                onDelete={deleteContactHandler}
                {...props}
              />
            )}
          />
        </Switch>
        {/* <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} onDelete={deleteContactHandler} /> */}
      </main>
    </React.StrictMode>
  );
}

export default App;
