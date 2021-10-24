import s from "./App.module.css";
import { Component } from "react";
import contactsData from "./contacts.json";

import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
import Form from "./components/Form";

export class App extends Component {
  state = {
    contacts: contactsData,
    filter: "",
  };

  //методы жизненного цикла

  componentDidMount() {
    console.log("I am loaded!");
    const localContact = localStorage.getItem("contacts");
    const parseContact = JSON.parse(localContact);
    if (parseContact) {
      this.setState({ contacts: parseContact });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  //мои методы
  handleSubmit = (newContact) => {
    const { contacts } = this.state;

    const duplicateContact = contacts.find(
      (contact) => contact.name === newContact.name
    );
    if (duplicateContact) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    this.setState(({ contacts }) => {
      return {
        contacts: [...contacts, newContact], //добавление в массив введенного значения
      };
    });
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { contacts, filter } = this.state;
    const { handleSubmit, changeFilter, deleteContact } = this;

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
}

export default App;
