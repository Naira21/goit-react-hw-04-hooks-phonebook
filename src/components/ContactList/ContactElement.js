import s from "./Contact.module.css";

const ContactElement = ({ contact, onDeleteContact }) => (
  <li key={contact.id}>
    {contact.name}: {contact.number}
    <button
      className={s.deleteBtn}
      type="button"
      onClick={() => onDeleteContact(contact.id)}
    >
      Delete
    </button>
  </li>
);

export default ContactElement;
