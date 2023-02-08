import { useState } from "react";
import { Link } from "react-router-dom";
import addContactService from "../../services/addContactService";
import styles from "./addContact.module.css";

const AddContact = ({ history }) => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
  });

  // Handlers
  const changeHandler = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!contact.name || !contact.email) {
      alert("Please fill the inputs !");
      return;
    }

    // fetch to db
    try {
      await addContactService(contact);
      history.push("/");
    } catch (error) {}
  };

  return (
    <>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className={styles.formWrapper}>
          <div className={styles.formControl}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={contact.name}
              onChange={changeHandler}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={contact.email}
              onChange={changeHandler}
            />
          </div>
          <button type="submit" className="btn primary">
            Add Contact
          </button>
          <Link to={"/"}>Go to Contacts list</Link>
        </div>
      </form>
    </>
  );
};

export default AddContact;
