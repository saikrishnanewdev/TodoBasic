import React, { useState } from "react";

const App = () => {
  const [list, setList] = useState([]);
  const [massage, setMassage] = useState({
    text: "",
    id: "",
  });
  const [edititem, setEdititem] = useState({
    id: "",
    isEditing: false,
  });

  const chnagehandler = (e) => {
    setMassage({
      ...massage,
      text: e.target.value,
    });
  };
  const submithandler = (e) => {
    e.preventDefault();
    let newTodo = {
      text: massage.text,
      id: new Date().getTime().toString(),
    };
    if (massage.text.length === 0) {
      alert("enter text");
    } else {
      setList([...list, newTodo]);
      setMassage({
        text: "",
        id: "",
      });
    }
  };
  const handledelete = (id) => {
    let newTodos = list.filter((eachitem) => {
      return eachitem.id !== id;
    });
    setList(newTodos);
  };
  const handleedit = (id) => {
    setEdititem({
      id: id,
      isEditing: true,
    });
    let editingitem = list.find((eachitem) => eachitem.id === id);
    setMassage({
      ...massage,
      text: editingitem.text,
      id: editingitem.id,
    });
  };

  const handleedititem = (e) => {
    e.preventDefault();
    let newTodoss = list.map((eachitem) => {
      if (eachitem.id === edititem.id) {
        return {
          text: massage.text,
          id: edititem.id,
        };
      } else {
        return eachitem;
      }
    });
    setList(newTodoss);
    setMassage({
      text: "",
      id: "",
    });
    setEdititem({
      id: "",
      isEditing: false,
    });
  };
  return (
    <>
      <div className="container">
        <form>
          <input
            key={massage.id}
            type="text"
            name="massage"
            id="massage"
            value={massage.text}
            onChange={chnagehandler}
          />
          {edititem.isEditing ? (
            <button onClick={handleedititem} type="submit">
              Edit
            </button>
          ) : (
            <button onClick={submithandler} type="submit">
              Add
            </button>
          )}
        </form>
      </div>
      <hr />
      <center>{list.length === 0 && <h4>No items in the list</h4>}</center>

      <ul className="list-items">
        {list.map((eachobj) => {
          const { text, id } = eachobj;
          return (
            <li key={id}>
              <span>{text}</span>
              <button onClick={() => handleedit(id)}>Edit</button>
              <button onClick={() => handledelete(id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default App;
