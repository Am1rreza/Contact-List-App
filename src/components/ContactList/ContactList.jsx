import styles from "./contactList.module.css";

const ContactList = ({ contacts, onDelete }) => {
  return (
    <section>
      {contacts.map((contact) => {
        const { name, email, id } = contact;

        return (
          <div key={id}>
            <p>
              <span>Name:</span> {name}
            </p>
            <p>
              <span>Email:</span> {email}
            </p>
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
