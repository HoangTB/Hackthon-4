import { useState } from "react";
import "../App.css";
import axiosClient from "../api/axios";

function Form(props) {
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    e.preventDefault();
    const key = e.target.name;
    setForm({
      ...form,
      [key]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.content || !form.dueDate || !form.status || !form.userName) {
      alert("Please fill content");
      return;
    }
    props.handleSubmit(form, setForm);
  };

  return (
    <div className="form">
      <form>
        <div className="text-input">
          <span class="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            name="content"
            type="text"
            placeholder="Fill Learn"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="text-input">
          <span class="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            name="dueDate"
            type="date"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <select
          className="form-select"
          aria-label="Default select example"
          name="status"
          onChange={handleChange}
        >
          <option selected>Chooses</option>
          <option value="1">Pending</option>
          <option value="2">Fullfill</option>
          <option value="3">Reject</option>
        </select>
        <div className="text-input">
          <span class="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            name="userName"
            type="text"
            placeholder="Username"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
export default Form;
