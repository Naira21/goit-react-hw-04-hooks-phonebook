import { useState, useRef } from "react";
import s from "./Form.module.css";
import { v4 as uuidv4 } from "uuid";

export default function Form({ onSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const contactIdName = useRef(() => {
    uuidv4();
  });
  const contactIdNumber = useRef(() => {
    uuidv4();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name,
      number,
      id: uuidv4(),
    };

    onSubmit(obj);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setNumber("");
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={contactIdName} className={s.labelText}>
        Name
      </label>
      <input
        id={contactIdName}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required
        onChange={handleChange}
        value={name}
      />

      <label htmlFor={contactIdNumber} className={s.labelText}>
        Number
      </label>
      <input
        id={contactIdNumber}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
        required
        onChange={handleChange}
        value={number}
      />
      <button type="submit" className={s.addBtn}>
        Add contact
      </button>
    </form>
  );
}
