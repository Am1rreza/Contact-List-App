const ContactPage = ({ location }) => {
  const contact = location.state.contact;

  return (
    <section className="contactPageSection">
      <div>
        <p>
          <span>Name:</span> {contact.name}
        </p>
        <p>
          <span>Email:</span> {contact.email}
        </p>
      </div>
    </section>
  );
};

export default ContactPage;
