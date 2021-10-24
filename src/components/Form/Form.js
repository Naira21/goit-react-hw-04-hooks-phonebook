import { Component } from "react";
import s from "./Form.module.css";
import { v4 as uuidv4 } from "uuid";

class Form extends Component {
  state = {
    name: "",
    number: "",
  };

  contactIdName = uuidv4();
  contactIdNumber = uuidv4();

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, number } = this.state;
    const obj = {
      //составляющая контакта - имя и идентификатор
      name,
      number,
      id: uuidv4(),
    };
    this.props.onSubmit(obj);

    this.resetForm();
  };
  resetForm = () => {
    this.setState({ name: "", number: "" });
  };

  handleChange = (e) => {
    const { value, name, number } = e.target;
    this.setState({
      [name]: value,
      [number]: value,
    });
  };

  render() {
    const { name, number } = this.state;
    const { handleSubmit, handleChange, contactIdName, contactIdNumber } = this;
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
}

export default Form;
