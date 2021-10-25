import s from "./App.module.css";
import { useState, useEffect } from "react";
import contactsData from "./contacts.json";

import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
import Form from "./components/Form";

function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem("contacts")) ?? contactsData
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (newContact) => {
    const duplicateContact = contacts.find(
      (contact) => contact.name === newContact.name
    );
    if (duplicateContact) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    setContacts([...contacts, newContact]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={s.wrapper}>
      <h1 className={s.pageTitle}>Phonebook</h1>
      <Form onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter onChange={changeFilter} value={filter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

export default App;
