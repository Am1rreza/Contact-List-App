import "./App.css";
import React, { useState } from "react";
import AddContact from "./components/AddContact/AddContact";
import ContactList from "./components/ContactList/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);

  // Handlers
  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: new Date().getTime(), ...contact }]);
  };

  const deleteContactHandler = (id) => {
  };

  return (
    <React.StrictMode>
      <main className="App">
        <header>
          <h1 className="app-title">Add Contact</h1>
        </header>
        <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} onDelete={deleteContactHandler} />
      </main>
    </React.StrictMode>
  );
}

export default App;
