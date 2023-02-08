import "./App.css";
import React, { useEffect, useState } from "react";
import AddContact from "./components/AddContact/AddContact";
import ContactList from "./components/ContactList/ContactList";
import { Route, Switch } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import deleteContactService from "./services/deleteContactService";
import getContactsService from "./services/getContactsService";
import addContactService from "./services/addContactService";
import EditContact from "./components/EditContact/EditContact";

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
      const { data } = await addContactService(contact);
      setContacts([...contacts, data]);
    } catch (error) {}
  };

  const deleteContactHandler = async (id) => {
    try {
      await deleteContactService(id);
      const filteredContacts = contacts.filter((contact) => contact.id !== id);
      setContacts(filteredContacts);
    } catch (error) {}
  };

  return (
    <React.StrictMode>
      <main className="App">
        <header>
          <h1 className="app-title">Contact App</h1>
        </header>
        <Switch>
          <Route path={"/edit/:id"} component={EditContact} />
          <Route path={"/contact/:id"} component={ContactPage} />
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
