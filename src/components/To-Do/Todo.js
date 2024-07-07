import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "./Modal";

const obj = {
  id: "",
  text: "",
  time: "",
  textLength: "",
};

function Todo() {
  const Currenttime = new Date().toLocaleString();
  const [value, setValue] = useState([]);
  const [modal, setModal] = useState(false);
  const [updatetext, setupdatetext] = useState("");
  const [currentID, setcurrentID] = useState(null);
  const addModal = (id) => {
    setModal(!modal);
    if (!modal) {
      const text = value.filter((item) => {
        return item.id === id;
      });
      setcurrentID(id);
      setupdatetext(text[0].text);
    }
  };
  const handleTextchange = (e) => {
    setupdatetext(e.target.value);
  };

  useEffect(() => {
    const savetodos = localStorage.getItem("todos");
    if (savetodos) {
      setValue(JSON.parse(savetodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(value));
  }, [value]);

  const saveEdit = () => {
    const updateValue = value.map((item) => {
      return item.id === currentID
        ? {
            ...item,
            text: updatetext,
            textLength: updatetext.length,
            time: Currenttime,
          }
        : item;
    });
    setValue(updateValue);
    setModal(false);
  };

  const inputvalue = useRef();
  const onHandler = (e) => {
    e.preventDefault();
    let text = inputvalue.current.value;
    if (text.length > 0) {
      setValue([
        ...value,
        {
          ...obj,
          text: text,
          time: Currenttime,
          textLength: text.length,
          id: uuidv4(),
        },
      ]);
    } else return;
    inputvalue.current.value = "";
  };

  const deleteItem = (id) => {
    const filtered = value.filter((item) => {
      return item.id !== id;
    });
    setValue(filtered);
  };

  return (
    <div className="w-full my-3 ">
      <div className="max-w-max mx-auto border-2 p-6  rounded-lg">
        <label
          htmlFor="price"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          To-Do List
        </label>
        <form className="flex mt-2 rounded-md shadow-sm">
          <input
            ref={inputvalue}
            type="text"
            name="price"
            id="price"
            className="block text-lg font-mono  w-full rounded-md border-0 py-1.5 px-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6"
            placeholder={"you can write something here...."}
          />
          <button
            onClick={(e) => onHandler(e)}
            type="submit"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Add
          </button>
        </form>
        <div className="max-w-screen-md mt-3 ">
          {modal ? (
            <Modal
              addModal={addModal}
              updatetext={updatetext}
              saveEdit={saveEdit}
              handleTextchange={handleTextchange}
            />
          ) : (
            ""
          )}
          {value.length > 0 ? (
            <h1 className="mb-3 text-xl font-mono">
              {" "}
              There is : {value.length} item
            </h1>
          ) : (
            ""
          )}
          {value.length > 0 ? (
            <table className="table-auto">
              <thead>
                <tr>
                  <th>Numbers</th>
                  <th>Text</th>
                  <th>Text Length</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {value.map((item, index) => (
                <tbody className="" key={index}>
                  <tr className="">
                    <td>{index + 1}</td>
                    <td>{item.text}</td>
                    <td>{item.textLength}</td>
                    <td className="ml-2">{item.time}</td>
                    <td className="flex ml-2  gap-3">
                      <button
                        onClick={() => deleteItem(item.id)}
                        type="button"
                        className="active:text-slate-500 border rounded-md bg-red-600 text-white  py-1 px-2"
                      >
                        delete
                      </button>
                      <button
                        onClick={() => addModal(item.id)}
                        className="active:text-slate-500 border rounded-md bg-blue-600 text-white  py-1 px-2"
                      >
                        edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          ) : (
            <h1 className="text-center font-mono text-xl">
              There is nothing yet (
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
