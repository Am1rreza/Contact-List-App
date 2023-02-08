import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../AddContact/addContact.module.css";
import getOneContactService from "../../services/getOneContactService";
import editContactService from "../../services/editContactService";

const EditContact = ({ history, match }) => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
  });
  const contactId = match.params.id;

  useEffect(() => {
    const getOneContact = async (id) => {
      const { data } = await getOneContactService(id);
      setContact({ name: data.name, email: data.email });
    };
    try {
      getOneContact(contactId);
    } catch (error) {}
  }, []);

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
      await editContactService(contactId, contact);
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
            Update Contact
          </button>
          <Link to={"/"}>Back to Contacts list?</Link>
        </div>
      </form>
    </>
  );
};

export default EditContact;
