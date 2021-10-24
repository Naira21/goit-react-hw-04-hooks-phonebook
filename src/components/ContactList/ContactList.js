import ContactElement from "./ContactElement";
import PropTypes from "prop-types";
import s from "./Contact.module.css";

const ContactList = ({ contacts, onDeleteContact }) => (
  <ol className={s.list}>
    {contacts.map((contact) => (
      <ContactElement
        contact={contact}
        onDeleteContact={onDeleteContact}
        key={contact.id}
      />
    ))}
  </ol>
);

export default ContactList;

ContactList.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      number: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  onDeleteContact: PropTypes.func,
};
