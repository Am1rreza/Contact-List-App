import { useState } from "react";
import styles from "./addContact.module.css";

const AddContact = ({ addContactHandler }) => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
  });

  // Handlers
  const changeHandler = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!contact.name || !contact.email) {
      alert("Please fill the inputs !");
      return;
    }

    addContactHandler(contact);

    // clear the inputs
    setContact({
      name: "",
      email: "",
    });
  };

  return (
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
      </div>
    </form>
  );
};

export default AddContact;