import "./App.css";
import React from "react";
import AddContact from "./components/AddContact/AddContact";
import ContactList from "./components/ContactList/ContactList";
import { Route, Switch } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import EditContact from "./components/EditContact/EditContact";

function App() {
  return (
    <React.StrictMode>
      <main className="App">
        <header>
          <h1 className="app-title">Contact App</h1>
        </header>
        <Switch>
          <Route path={"/edit/:id"} component={EditContact} />
          <Route path={"/contact/:id"} component={ContactPage} />
          <Route path={"/add"} component={AddContact} />
          <Route path={"/"} component={ContactList} />
        </Switch>
      </main>
    </React.StrictMode>
  );
}

export default App;
