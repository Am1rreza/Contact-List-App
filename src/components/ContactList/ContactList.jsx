import styles from "./contactList.module.css";
import userImage from "../../assets/images/user-icon.png";
import { Link } from "react-router-dom";

const ContactList = ({ contacts, onDelete }) => {
  if (contacts.length === 0)
    return <h2 style={{ marginTop: "1rem" }}>Add some contact !</h2>;

  return (
    <section className={styles.contactList}>
      <h2>Contacts</h2>
      <Link to={"/add"}>
        <button className="btn primary">Add</button>
      </Link>
      {contacts.map((contact) => {
        const { name, email, id } = contact;

        return (
          <div key={id} className={styles.contact}>
            <div>
              <img src={userImage} alt="user-icon" />
              <div>
                <p>
                  <span>Name:</span> {name}
                </p>
                <p>
                  <span>Email:</span> {email}
                </p>
              </div>
            </div>
            <button className="btn secondary" onClick={() => onDelete(id)}>
              Delete
            </button>
          </div>
        );
      })}
    </section>
  );
};

export default ContactList;
