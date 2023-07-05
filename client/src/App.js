import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import axiosClient from "./api/axios";
function App() {
  const [listTitle, setListTitle] = useState();
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    axiosClient({
      method: "GET",
      url: "api/v1",
    }).then((data) => {
      setListTitle(data.data);
    });
  }, [isReload]);

  const handleDelete = (id) => {
    axiosClient({
      method: "DELETE",
      url: `api/v1/${id}`,
    }).then((dta) => {
      setIsReload(!isReload);
    });
  };

  const handleSubmit = (form) => {
    axiosClient({
      method: "POST",
      data: form,
      url: "api/v1",
    }).then(() => {
      setIsReload(!isReload);
    });
  };

  return (
    <div>
      <div className="container1 my-3">
        <Form handleSubmit={handleSubmit} />
        <div>
          {" "}
          <Table listTitle={listTitle} handleDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;
