import "./App.css";
import React, { useEffect, useState } from "react";
import AddContact from "./components/AddContact/AddContact";
import ContactList from "./components/ContactList/ContactList";
import { Route, Switch } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import deleteContactService from "./services/deleteContactService";
import getContactsService from "./services/getContactsService";
import addContactService from "./services/addContactService";

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // IIFE
    async function fetchContacts() {
      const { data } = await getContactsService();
      setContacts(data);
    }

    try {
      fetchContacts();
    } catch (error) {}
  }, []);

  // Handlers
  const addContactHandler = async (contact) => {
    try {
      setContacts([...contacts, { id: new Date().getTime(), ...contact }]);
      await addContactService(contact);
    } catch (error) {}
  };

  const deleteContactHandler = async (id) => {
    try {
      const filteredContacts = contacts.filter((contact) => contact.id !== id);
      setContacts(filteredContacts);
      await deleteContactService(id);
    } catch (error) {}
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
