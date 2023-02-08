import styles from "./contactList.module.css";
import userImage from "../../assets/images/user-icon.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getContactsService from "../../services/getContactsService";
import deleteContactService from "../../services/deleteContactService";

const ContactList = () => {
  const [contacts, setContacts] = useState(null);

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
  const deleteContactHandler = async (id) => {
    try {
      await deleteContactService(id);
      const filteredContacts = contacts.filter((contact) => contact.id !== id);
      setContacts(filteredContacts);
    } catch (error) {}
  };

  // Conditional rendering
  if (!contacts) return <h2 style={{ marginTop: "1rem" }}>Loading...</h2>;

  if (contacts && contacts.length === 0)
    return (
      <>
        <h2 style={{ margin: "1rem 0" }}>Add some contact !</h2>
        <Link to={"/add"}>
          <button className="btn primary">Add</button>
        </Link>
      </>
    );

  return (
    <section className={styles.contactList}>
      <h2>Contacts</h2>

      {contacts.map((contact) => {
        return (
          <Contact
            key={contact.id}
            onDelete={deleteContactHandler}
            contact={contact}
          />
        );
      })}
      <Link to={"/add"}>
        <button className="btn primary">Add</button>
      </Link>
    </section>
  );
};

export default ContactList;

// contact component
const Contact = ({ contact, onDelete }) => {
  const { name, id, email } = contact;

  return (
    <div className={styles.contact}>
      <div className={styles.userDetail}>
        <img src={userImage} alt="user-icon" />
        <Link
          to={{ pathname: `/contact/${id}`, state: { contact: contact } }}
          className={styles.contactBox}
        >
          <div>
            <p>
              <span>Name:</span> {name}
            </p>
            <p>
              <span>Email:</span> {email}
            </p>
          </div>
        </Link>
      </div>
      <div className={styles.btnBox}>
        <Link to={`/edit/${id}`}>
          <button className="btn secondary">Edit</button>
        </Link>
        <button className="btn secondary" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};
