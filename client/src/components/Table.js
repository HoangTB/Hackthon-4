import axiosClient from "../api/axios";
import { useEffect, useState } from "react";
function Table(props) {
  const [isShow, setIsShow] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const listTitle = props.listTitle;
  const [editData, setEditData] = useState(null);

  const formatDate = (data) => {
    return data.split("T")[0];
  };
  const handleDelete = (id) => {
    props.handleDelete(id);
  };

  const handleEdit = (id) => {
    setIsShow(!isShow);
    setReadOnly(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const key = e.target.name;
    setEditData({
      ...editData,
      [key]: e.target.value,
    });
  };

  const handleUpdate = (data) => {};
  return (
    <div className="table-1">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Content</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Assigned to</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listTitle &&
            listTitle.map((data, index) => {
              return (
                <tr key={index}>
                  <td style={{ paddingTop: "15px" }}>
                    <b>{index + 1}</b>
                  </td>
                  <td>
                    <input
                      value={data.content}
                      className="content-input"
                      readOnly={readOnly}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      value={formatDate(data.dueDate)}
                      className="content-input"
                      readOnly={readOnly}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      value={
                        data.status === 1
                          ? "Pending"
                          : data.status === 2
                          ? "Fullfill"
                          : data.status === 3
                          ? "Reject"
                          : ""
                      }
                      className="content-input"
                      readOnly={readOnly}
                      onChange={handleChange}
                    />{" "}
                  </td>
                  <td>
                    <input
                      value={data.userName}
                      className="content-input"
                      readOnly={readOnly}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    {!isShow ? (
                      <>
                        <button
                          type="button"
                          class="btn btn-success"
                          onClick={() => handleEdit(data.id)}
                        >
                          Update
                        </button>{" "}
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={() => handleDelete(data.id)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          class="btn btn-info"
                          onClick={handleUpdate(data.id)}
                        >
                          Comfirm
                        </button>{" "}
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={() => setIsShow(!isShow)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
