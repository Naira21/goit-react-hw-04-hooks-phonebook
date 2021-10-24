import React from "react";
import s from "./Filter.module.css";

const Filter = ({ id, value, onChange }) => (
  <label htmlFor={id} className={s.labelText}>
    Find contacts by name
    <input
      id={id}
      type="text"
      name="name"
      value={value}
      onChange={onChange}
      className={s.filterBtn}
    />
  </label>
);

export default Filter;
