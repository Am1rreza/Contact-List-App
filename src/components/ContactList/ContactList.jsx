import styles from "./contactList.module.css";
import userImage from "../../assets/images/user-icon.png";

const ContactList = ({ contacts, onDelete }) => {
  if (contacts.length === 0)
    return <h2 style={{ marginTop: "1rem" }}>Add some contact !</h2>;

  return (
    <section className={styles.contactList}>
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
